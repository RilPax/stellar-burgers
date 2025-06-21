import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import {
  loginUser,
  clearError
} from '../../services/slices/auth-slice/auth-slice';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // 🔑 Сохраняем путь, куда хотел попасть пользователь
  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch]
  );

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
