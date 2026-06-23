import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type I18nProps = {
  children: ReactNode;
};

export const I18n = (props: I18nProps) => {
  const { children } = props;

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};
