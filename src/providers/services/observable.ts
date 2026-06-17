export abstract class ObservableService {
  private readonly listeners = new Set<() => void>();

  readonly subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  protected notify() {
    this.listeners.forEach(listener => listener());
  }
}
