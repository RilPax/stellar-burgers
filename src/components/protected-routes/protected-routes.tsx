import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export default function ProtectedRoutes() {
  const { isAuth, isAuthChecked } = useSelector(
    (state: RootState) => state.auth
  );

  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
}
