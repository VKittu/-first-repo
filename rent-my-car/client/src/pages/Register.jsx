import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={submit} className="space-y-4 rounded bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">Register</h2>
        <input className="w-full rounded border p-2" required placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full rounded border p-2" type="email" required placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded border p-2" type="password" required minLength="6" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button disabled={loading} className="w-full rounded bg-indigo-600 p-2 text-white">{loading ? 'Please wait...' : 'Create account'}</button>
        <p className="text-sm">Have an account? <Link to="/login" className="text-indigo-600">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
