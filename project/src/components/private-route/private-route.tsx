import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useSelector } from 'react-redux';
import { initialStateType } from '../../store/reducer';

type PrivateRouteProps = {
  children: JSX.Element
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector((state: initialStateType) => state.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={'/login'}/>;
}


export default PrivateRoute;
