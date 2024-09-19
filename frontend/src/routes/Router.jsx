import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Services from '../pages/Services';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Doctor from '../pages/Doctor/Doctor';
import Doctordetails from '../pages/Doctor/Doctordetails';
import Myaccount from '../dashboard/user-account/Myaccount';
import Mydashboard from '../dashboard/doctor-account/Mydashboard';
import CheakoutSucess from '../pages/Doctor/CheakoutSucess'  // Corrected spelling
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes.jsx';

const Router = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/doctor/:id" element={<Doctordetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/checkout-success" element={<CheakoutSucess/>} /> 

        {/* Protected Routes */}
        <Route
          path="/users/profile/me"
          element={
            <ProtectedRoutes allowedRoutes={['patient']}>
              <Myaccount />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/doctors/profile/me"
          element={
            <ProtectedRoutes allowedRoutes={['doctor']}>
              <Mydashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default Router;
