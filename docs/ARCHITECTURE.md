# Architecture — Feature-Driven Layered Design

This project is a Next.js (App Router) reference implementation of a **Feature-Driven**,
layered architecture (a pragmatic variant of Feature-Sliced Design adapted for React Server
Components). Everything under `src/` is organized so that **business capabilities**, not
technical file types, drive the folder structure.

The domain used throughout is a point-of-sale / pharmacy checkout terminal: it fiscalizes
receipts, prints them, talks to desktop hardware, and manages a workstation/branch context.

---

## 1. The big idea

Code is split into **horizontal layers**. Each layer answers a different question:

| Layer        | Question it answers                                | Knows about                   |
| ------------ | -------------------------------------------------- | ----------------------------- |
| `app/`       | How is the app wired into routes and rendered?     | everything below              |
| `processes/` | How do several features combine into one workflow? | features, entities, providers |
| `features/`  | What can a user _do_? (one action)                 | entities, providers           |
| `entities/`  | What are the business _nouns_ and their data/UI?   | providers                     |
| `providers/` | What infrastructure does everything sit on top of? | shared                        |
| `shared/`    | What generic, domain-free helpers exist?           | nothing                       |

**The one rule that makes it work:** a layer may only import from layers **below** it.
`features` may use `entities` and `providers`; `entities` must never import a `feature`;
nothing imports from `app`. Dependencies always point downward. This keeps high-level
business logic decoupled from low-level wiring and prevents circular dependencies.

```
app  ──►  processes  ──►  features  ──►  entities  ──►  providers  ──►  shared
                              (each arrow = "is allowed to import from")
```

---

## 2. The layers in detail

### `shared/` — domain-free toolbox

Generic, reusable code with **zero** business knowledge. If you could copy it into an
unrelated project unchanged, it belongs here.

- `src/shared/hooks/client/use-sync-setup.ts` — a hook that runs a setup function once and
  its cleanup on unmount. It knows nothing about sales, fiscalization, or anything else.

### `providers/` — the infrastructure layer

Everything the app _runs on_. Split into three families by responsibility:

```
providers/
  data/       context resolved on the server and handed to the client
  lib/        thin wiring around third-party libraries
  services/   long-lived, stateful singletons (hardware, network, auth, …)
```

**`providers/data/`** — server-resolved context (`workstation`, `branch`, `app-runtime`).
A server component performs a query and produces a **Promise**, which is passed into a
shared client context. The client reads it with React's `use()` under Suspense:

- `data/workstation/server/workstation.tsx` builds `workstationPromise` and renders
  `<WorkstationProvider value={workstationPromise}>`.
- `data/workstation/shared/provider.tsx` is the `'use client'` context that simply holds the
  promise.
- `data/workstation/client/hooks.ts` exposes `useWorkstationPromise()` and
  `useWorkstationSuspense()` (`use(promise)`).

This pattern streams server data into client code without prop-drilling and without a
client-side fetch waterfall.

**`providers/lib/`** — adapters over libraries so the rest of the app never imports them
directly. Swapping a library means touching one slice.

- `lib/react-query/` — the `<ReactQuery>` provider plus `createQuery` / `createMutation` /
  `createSuspenseQuery` factories.
- `lib/mantine/`, `lib/i18n/` — UI kit and i18n wiring (e.g. `i18n/client/i18n.tsx` wraps
  `NextIntlClientProvider`).

**`providers/services/`** — stateful singletons that model the outside world: `api-client`,
`fiscalization`, `printer`, `customer-screen`, `network-monitor`, `keyboard-manager`,
`license-manager`, `system-shift`, `users-manager`, `vitals-monitor`, etc. See
[§4 Service pattern](#4-the-service-pattern) for their internal shape.

### `entities/` — business nouns

A domain object with its **data access** and its **own UI**. Here the only entity is `sales`.

```
entities/sales/
  data/
    client/   React-Query hooks bound to the browser api-client
    server/   server actions + cached ('use cache') queries
    shared/   createSalesApi(client) factory + types  (isomorphic)
  components/
    checkout/      CheckoutDrawer
    marking-codes/ MarkingCodesModal
```

- `data/shared/api.ts` — `createSalesApi(client)` returns `{ fetchRecommendations, fetchAnalogs }`.
  It is **isomorphic**: it takes an axios instance and is reused on both sides.
- `data/client/api.ts` — `useSalesApi()` grabs the browser api-client and calls the shared factory.
- `data/client/queries.ts` — `useRecommendationsSuspenseQuery()` etc., wrapping the api in React-Query.
- `data/server/queries.ts` — the same fetches behind `'use cache'` + `cacheTag(...)` for RSC.

Entity components are **presentational**: `CheckoutDrawer` receives `{ isCheckingOut,
isCheckoutError, checkout }` as props and renders a button. It contains no orchestration.

### `features/` — one user action each

A feature is a single capability the user invokes, exposed as a hook that **orchestrates
providers** and returns a uniform shape.

- `features/sales/fiscalize-receipt/client/use-fiscalize-receipt.ts` — uses the
  `fiscalization`, `vitals-monitor` and `customer-screen` services, wraps the call in a
  React-Query mutation, reports progress to the customer screen, and returns
  `{ isFiscalizingReceipt, isFiscalizeReceiptError, fiscalizeReceipt }`.
- `features/sales/print-receipt/...` — same shape for printing.
- `features/sales/process-marking-code/...` — same shape for marking codes.

**Feature hook contract:** return `{ is<Verb>ing, is<Verb>Error, <verb> }` — a pending flag,
an error flag, and one async orchestration function. This uniformity is what lets processes
compose them mechanically.

### `processes/` — multi-feature workflows

A process stitches several features into one higher-level business flow.

- `processes/sales/checkout/client/use-checkout.ts` composes `useFiscalizeReceipt()` and
  `usePrintReceipt()`: `checkout()` fiscalizes, then prints, and reports any error to
  `vitals-monitor`. It re-exposes the same `{ isCheckingOut, isCheckoutError, checkout }`
  contract upward.

Use a **process** when an action spans more than one feature; keep it a **feature** when it
maps to a single capability.

### `app/` — routes and composition

The Next.js App Router layer. It owns routing, the two provider trees, and one-off side
effects. It contains almost no logic — it _wires_ the lower layers together.

```
app/
  layout.tsx                 root <html>; mounts global Providers + Effects
  _components/providers.tsx  global Data/Lib/Service providers
  _components/effects/        app-wide side effects (Effects component)
  (public)/auth/             unauthenticated routes
  (private)/                 authenticated routes…
    layout.tsx                mounts the private Providers + Effects
    _components/providers.tsx private-only data + service providers
    dashboard/page.tsx        a page: calls useCheckout(), renders <CheckoutDrawer/>
```

`dashboard/page.tsx` is the canonical end-to-end slice:

```tsx
const { isCheckingOut, isCheckoutError, checkout } = useCheckout(); // process
return <CheckoutDrawer .../>;                                        // entity component
```

The page (app) calls a process, which composes features, which orchestrate services, and
renders an entity component. Every layer is visible in three lines.

---

## 3. Segments: `client` / `server` / `shared`

**Every slice** (in any layer) is internally divided into up to three _segments_ by
**execution environment**, each with its own `index.ts` public barrel:

| Segment   | Contains                                                                         | Marker                                 |
| --------- | -------------------------------------------------------------------------------- | -------------------------------------- |
| `shared/` | isomorphic code: types, config, factory functions, service classes, interceptors | none                                   |
| `client/` | browser-only code: context providers, hooks, components                          | `'use client'`                         |
| `server/` | server-only code: server components, server actions, cached queries              | `import 'server-only'` / `'use cache'` |

This split is what makes the codebase RSC-native: it is always unambiguous where a file may
run. Shared code (e.g. `createSalesApi`, `ApiClientService`, axios interceptors) is written
once and consumed by both the `client` and `server` segments.

---

## 4. The service pattern

Services in `providers/services/` follow one consistent recipe (see `fiscalization/` for the
fullest example):

```
services/<name>/client/
  service.ts    class extends ObservableService  → the actual stateful logic
  types.ts      the public interface + adapter contracts
  provider.tsx  React context + <Provider> + use<Name>() accessor hook
  hooks.ts      reactive read hooks built on useSyncExternalStore
  index.ts      public barrel
  adapters/     pluggable backends (fiscalization: mobilkassa / multikassa / qpos)
```

Key mechanics:

1. **`ObservableService`** (`providers/services/observable.ts`) is a tiny base class with
   `subscribe(listener)` / `notify()`. Services extend it so React can subscribe to changes.

2. **Provider** (`fiscalization/client/provider.tsx`) creates the service once via
   `useState(() => new FiscalizationService())`, performs **delayed initialization** in an
   effect (await `workstationPromise`, pick an adapter, `service.init(adapter)`), and exposes
   it through context. `useFiscalization()` reads the context and throws if used outside the
   provider.

3. **Reactive hooks** (`fiscalization/client/hooks.ts`) bridge the imperative service to
   React with `useSyncExternalStore(service.subscribe, service.getIsReady, …)` — so
   components re-render when the service notifies.

4. **Adapters** implement a shared interface (`FiscalizationAdapter`) and are chosen at
   runtime by `resolveAdapter(workstation)` based on the workstation type. Swapping hardware
   backends is adding an adapter — no call-site changes.

The `api-client` service is the same pattern around axios: `ApiClientService` (in the
`shared` segment, isomorphic) wraps an axios instance, manages interceptors with eject-able
teardown, and is provided per-environment (`client/provider.tsx`, `server/api-client.ts`).

---

## 5. Provider composition & effects

Each provider tree groups providers by family, in nesting order, and aliases them on import
for a readable tree (`app/_components/providers.tsx`):

```tsx
<DataProviders>
  {" "}
  {/* AppRuntime, Workstation, Branch … */}
  <LibProviders>
    {" "}
    {/* I18n, Nuqs, NavigationGuard, ReactQuery, Mantine */}
    <ServiceProviders>
      {" "}
      {/* ApiClient, KeyboardManager, NetworkMonitor … */}
      {children}
    </ServiceProviders>
  </LibProviders>
</DataProviders>
```

There are **two** trees: the **root** (`app/_components/`) holds global libs/services; the
**`(private)`** tree (`app/(private)/_components/`) layers on authenticated-only data and
services (workstation, fiscalization, printer, license-manager, …). Public routes never pay
for them.

**Effects** are app-wide imperative side effects with no UI. `Effects` is a component that
returns `null` and just calls effect hooks (`useEnhanceApiClient`, `useCleanup`). For
example `useEnhanceApiClient` uses `useSyncSetup` to attach the auth interceptor to the
api-client for the app's lifetime. Mounting it next to `{children}` in a layout runs those
effects for the whole subtree.

---

## 6. Public API & import conventions

- **Always import a slice through its `index.ts` barrel**, never reach into internal files:
  `import { useFiscalization } from '@/providers/services/fiscalization/client'` — not
  `.../client/provider`.
- The barrel is the slice's **public API**; everything else is private to the slice.
- `@/` is the alias for `src/`.
- Respect the layer direction (§1). If an entity seems to need a feature, the dependency is
  inverted — move the logic up into the feature/process and pass data down as props.

---

## 7. How to add things (recipes)

**A new business action (e.g. "refund receipt")**

1. Create `features/sales/refund-receipt/client/use-refund-receipt.ts` returning
   `{ isRefundingReceipt, isRefundReceiptError, refundReceipt }`.
2. Orchestrate the services it needs (fiscalization, printer, customer-screen, vitals).
3. Export it from the slice `index.ts`. Consume it from a process or a page.

**A new workflow combining actions**

- Add a hook under `processes/<domain>/<flow>/client/` that composes the relevant feature
  hooks and re-exposes the uniform contract.

**A new piece of infrastructure (e.g. a scanner)**

- Add a slice under `providers/services/scanner/` following the [service pattern](#4-the-service-pattern):
  `service.ts` (extend `ObservableService`), `types.ts`, `provider.tsx`, `hooks.ts`,
  `index.ts`, and any `adapters/`. Mount its provider in the appropriate tree.

**New entity data**

- Put the isomorphic fetch in `entities/<entity>/data/shared/api.ts` as a `create…Api(client)`
  factory; wrap it for the browser in `data/client/queries.ts` and for RSC in
  `data/server/queries.ts`.

**New presentational UI for an entity**

- Add it under `entities/<entity>/components/<thing>/client/` and keep it prop-driven; let a
  page/feature supply the data and callbacks.

---

## 8. Why this structure

- **Change is local.** A capability lives in one slice; adding/removing it rarely touches
  unrelated code.
- **Dependencies are acyclic and obvious.** The downward-only rule prevents tangles and makes
  the blast radius of a change predictable.
- **RSC-safe by construction.** The `client`/`server`/`shared` split means every file's
  execution environment is explicit, and isomorphic code is shared rather than duplicated.
- **Infrastructure is swappable.** Libraries hide behind `lib/` providers; hardware hides
  behind service adapters. Replacing either is a contained edit.
- **Features compose.** The uniform feature-hook contract lets processes assemble workflows
  mechanically, and pages stay three lines long.

```

```
