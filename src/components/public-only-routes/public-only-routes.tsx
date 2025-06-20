import { Navigate, Outlet } from 'react-router-dom';

export default function PublicOnlyRoutes() {
  const user = null;

  return user ? <Navigate to='/' replace /> : <Outlet />;
}
