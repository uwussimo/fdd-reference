import { Effects } from './_components/effects';
import { Providers } from './_components/providers';

const Layout = (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>

      <body>
        <Providers>
          <Effects />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
