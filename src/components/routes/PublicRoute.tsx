import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/hooks';

type Props = {
  component: JSX.Element;
};
export default function PublicRoute({ component }: Props) {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return isAuth ? <Navigate to="/main" /> : component;
}
