import { Effects } from './_components/effects';
import { Providers } from './_components/providers';

const Layout = (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <Providers>
      <Effects />
      {children}
    </Providers>
  );
};

export default Layout;
