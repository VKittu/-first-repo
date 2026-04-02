import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../api/axios';

const ManageCars = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const res = await API.get('/cars', { params: { limit: 100, page: 1 } });
    setCars(res.data.cars || []);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const removeCar = async (id) => {
    await API.delete(`/cars/${id}`);
    toast.success('Car deleted');
    fetchCars();
  };

  return (
    <div className="mx-auto max-w-5xl p-4">
      <h2 className="mb-4 text-2xl font-bold">Manage Cars</h2>
      <div className="space-y-3">
        {cars.map((car) => (
          <div key={car._id} className="flex items-center justify-between rounded bg-white p-4 shadow">
            <div>
              <p className="font-semibold">{car.title}</p>
              <p className="text-sm text-slate-500">{car.brand} • {car.location} • ${car.pricePerDay}/day</p>
            </div>
            <button onClick={() => removeCar(car._id)} className="rounded bg-red-600 px-3 py-2 text-sm text-white">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCars;
