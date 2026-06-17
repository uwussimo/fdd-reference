import { ReactNode } from 'react';
import { Theme } from './theme/theme';

type MantineProps = {
  children: ReactNode;
};

export const Mantine = (props: MantineProps) => {
  const { children } = props;

  return (
    <Theme>
      {/* <Dates>
        <Modals> */}
      {children}

      {/* <ColorShemeHotkeys />
        </Modals>
      </Dates> */}
    </Theme>
  );
};
