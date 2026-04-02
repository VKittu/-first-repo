import { Link } from 'react-router-dom';

const CarCard = ({ car }) => (
  <div className="animate-float overflow-hidden rounded-xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg">
    <img src={`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}${car.image}`} alt={car.title} className="h-48 w-full object-cover" />
    <div className="space-y-2 p-4">
      <h3 className="text-lg font-bold">{car.title}</h3>
      <p className="text-sm text-slate-600">{car.brand} • {car.location}</p>
      <p className="font-semibold text-indigo-600">${car.pricePerDay}/day</p>
      <Link className="inline-block rounded bg-indigo-600 px-3 py-2 text-sm text-white" to={`/cars/${car._id}`}>View Details</Link>
    </div>
  </div>
);

export default CarCard;
