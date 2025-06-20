import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

export const AppHeader: FC = () => {
  const username = useSelector((store: RootState) => store.auth.user?.name);

  return <AppHeaderUI userName={username ? username : ''} />;
};
