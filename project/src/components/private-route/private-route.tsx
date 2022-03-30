import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element
  authorizationStatus: string
}

function PrivateRoute({children, authorizationStatus}: PrivateRouteProps): JSX.Element {

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={'/login'}/>;
}


export default PrivateRoute;
