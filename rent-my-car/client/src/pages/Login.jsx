import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={submit} className="space-y-4 rounded bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">Login</h2>
        <input className="w-full rounded border p-2" type="email" required placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded border p-2" type="password" required minLength="6" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button disabled={loading} className="w-full rounded bg-indigo-600 p-2 text-white">{loading ? 'Please wait...' : 'Login'}</button>
        <p className="text-sm">No account? <Link to="/register" className="text-indigo-600">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
