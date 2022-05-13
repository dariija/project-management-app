import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/hooks';

type Props = {
  component: JSX.Element;
};

export default function PrivateRoute({ component }: Props) {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return isAuth ? component : <Navigate to="/" />;
}
