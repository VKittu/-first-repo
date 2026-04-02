import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddCar from './pages/AddCar';
import MyBookings from './pages/MyBookings';
import Payment from './pages/Payment';
import CarDetails from './pages/CarDetails';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import Profile from './pages/Profile';
import ManageCars from './pages/ManageCars';

const App = () => (
  <div className="min-h-screen bg-slate-100">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/payment" element={<UserRoute><Payment /></UserRoute>} />
      <Route path="/dashboard" element={<UserRoute><Dashboard /></UserRoute>} />
      <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
      <Route path="/bookings" element={<UserRoute><MyBookings /></UserRoute>} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/add-car" element={<AdminRoute><AddCar /></AdminRoute>} />
      <Route path="/admin/manage-cars" element={<AdminRoute><ManageCars /></AdminRoute>} />
    </Routes>
    <Footer />
  </div>
);

export default App;
