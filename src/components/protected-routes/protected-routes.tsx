import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'src/services/store';

export default function ProtectedRoutes() {
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? <Outlet /> : <Navigate to='/login' />;
}
