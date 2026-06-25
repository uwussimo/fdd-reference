import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

import { defaultLocale } from '../shared/config';

type I18nProps = {
  children: ReactNode;
};

export const I18n = (props: I18nProps) => {
  const { children } = props;

  return <NextIntlClientProvider locale={defaultLocale}>{children}</NextIntlClientProvider>;
};
