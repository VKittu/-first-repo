import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 text-white backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-indigo-400">rent-my-car</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/">Home</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
          {user && <Link to="/bookings">My Bookings</Link>}
          {user && <Link to="/profile">Profile</Link>}
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
          {user ? (
            <button onClick={logout} className="rounded bg-indigo-600 px-3 py-1">Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="rounded bg-indigo-600 px-3 py-1">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
