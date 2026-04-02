import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../api/axios';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [range, setRange] = useState([new Date(), new Date()]);

  useEffect(() => {
    API.get(`/cars/${id}`).then((res) => setCar(res.data));
  }, [id]);

  const bookNow = async () => {
    const [start, end] = range;
    const { data: booking } = await API.post('/bookings', {
      carId: id,
      startDate: start,
      endDate: end
    });

    const { data } = await API.post('/payment/create-order', { bookingId: booking._id, provider: 'stripe' });
    if (data.url) window.location.href = data.url;
    else toast.error('Payment session not created');
  };

  if (!car) return null;

  return (
    <div className="mx-auto grid max-w-5xl gap-5 p-4 md:grid-cols-2">
      <img src={`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}${car.image}`} alt={car.title} className="w-full rounded-xl object-cover" />
      <div className="space-y-4 rounded bg-white p-4 shadow">
        <h1 className="text-2xl font-bold">{car.title}</h1>
        <p>{car.brand} • {car.transmission} • {car.fuelType}</p>
        <p className="font-semibold text-indigo-600">${car.pricePerDay} / day</p>
        <Calendar selectRange onChange={setRange} value={range} />
        <button onClick={bookNow} className="rounded bg-indigo-600 px-4 py-2 text-white">Book & Pay</button>
      </div>
    </div>
  );
};

export default CarDetails;
