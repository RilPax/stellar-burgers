import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const username = useSelector((store: RootState) => store.auth.user?.name);

  return <AppHeaderUI userName={username ? username : ''} />;
};
