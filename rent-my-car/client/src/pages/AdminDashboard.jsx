import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import API from '../api/axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const run = async () => {
      const [u, b] = await Promise.all([API.get('/auth/users'), API.get('/bookings/all')]);
      setUsers(u.data);
      setBookings(b.data);
    };
    run();
  }, []);

  const chartData = [{ name: 'Users', count: users.length }, { name: 'Bookings', count: bookings.length }];

  return (
    <div className="grid gap-4 p-4 lg:grid-cols-[240px,1fr]">
      <aside className="space-y-2 rounded bg-slate-900 p-4 text-white">
        <h3 className="text-lg font-semibold">Admin Sidebar</h3>
        <Link className="block rounded bg-slate-800 px-3 py-2" to="/admin/add-car">Add Car</Link>
        <Link className="block rounded bg-slate-800 px-3 py-2" to="/admin/manage-cars">Manage Cars</Link>
      </aside>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded bg-white p-4 shadow">Total Users: {users.length}</div>
          <div className="rounded bg-white p-4 shadow">Total Bookings: {bookings.length}</div>
        </div>
        <div className="h-72 rounded bg-white p-4 shadow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
