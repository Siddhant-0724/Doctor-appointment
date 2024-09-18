import { useContext } from 'react';
import { authContext } from '../context/Authcontext';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, allowedRoutes }) => {
  const { token, role } = useContext(authContext);
  const isAllowed = allowedRoutes.includes(role);
  const accessibleRoutes = token && isAllowed ? children : <Navigate to='/login' replace={true} />;
  
  return accessibleRoutes;
};

export default ProtectedRoutes;
