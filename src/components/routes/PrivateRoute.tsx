import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/hooks';
import Loader from '../loader/Loader';

type Props = {
  component: JSX.Element;
};

export default function PrivateRoute({ component }: Props) {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return isAuth === null ? <Loader /> : isAuth ? component : <Navigate to="/" />;
}
