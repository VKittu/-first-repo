import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="rounded bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="mt-2 text-slate-600">Manage your account and bookings.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/profile" className="rounded bg-indigo-600 px-4 py-2 text-white">Profile</Link>
          <Link to="/bookings" className="rounded bg-slate-900 px-4 py-2 text-white">My Bookings</Link>
          {user?.role === 'admin' && <Link to="/admin" className="rounded bg-emerald-600 px-4 py-2 text-white">Admin Panel</Link>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
