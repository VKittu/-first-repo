import { useEffect, useState } from 'react';
import API from '../api/axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get('/bookings/user').then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="mx-auto max-w-5xl p-4">
      <h1 className="mb-4 text-2xl font-bold">My Bookings</h1>
      <div className="space-y-3">
        {bookings.map((booking) => (
          <div key={booking._id} className="rounded bg-white p-4 shadow">
            <p className="font-semibold">{booking.carId?.title}</p>
            <p className="text-sm text-slate-600">{new Date(booking.startDate).toDateString()} - {new Date(booking.endDate).toDateString()}</p>
            <p>Total: ${booking.totalPrice}</p>
            <p>Status: {booking.paymentStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
