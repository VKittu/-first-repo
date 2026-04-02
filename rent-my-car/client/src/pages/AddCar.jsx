import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../api/axios';

const AddCar = () => {
  const [form, setForm] = useState({ title: '', brand: '', pricePerDay: '', fuelType: 'Petrol', transmission: 'Manual', location: '' });
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (image) data.append('image', image);

    await API.post('/cars', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    toast.success('Car added successfully');
    setForm({ title: '', brand: '', pricePerDay: '', fuelType: 'Petrol', transmission: 'Manual', location: '' });
    setImage(null);
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <form onSubmit={submit} className="grid gap-3 rounded bg-white p-6 shadow">
        <h2 className="text-xl font-bold">Add Car</h2>
        <input className="rounded border p-2" required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="rounded border p-2" required placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        <input className="rounded border p-2" required type="number" min="1" placeholder="Price per day" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })} />
        <input className="rounded border p-2" required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <select className="rounded border p-2" value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })}><option>Petrol</option><option>Diesel</option><option>Electric</option></select>
        <select className="rounded border p-2" value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })}><option>Manual</option><option>Automatic</option></select>
        <input className="rounded border p-2" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button className="rounded bg-indigo-600 p-2 text-white">Save Car</button>
      </form>
    </div>
  );
};

export default AddCar;
