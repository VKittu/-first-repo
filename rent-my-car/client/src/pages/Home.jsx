import { useEffect, useState } from 'react';
import API from '../api/axios';
import CarCard from '../components/CarCard';
import Loader from '../components/Loader';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', location: '', minPrice: '', maxPrice: '' });
  const [appliedFilters, setAppliedFilters] = useState({ search: '', location: '', minPrice: '', maxPrice: '' });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      const { data } = await API.get('/cars', { params: { ...appliedFilters, page } });
      setCars(data.cars);
      setPages(data.pages || 1);
      setLoading(false);
    };

    fetchCars();
  }, [page, appliedFilters]);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setAppliedFilters(filters);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4">
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-700 p-8 text-white">
        <h1 className="text-3xl font-bold">Find your perfect rental car</h1>
        <p className="mt-2 text-indigo-100">Book premium cars with secure payment and instant confirmation.</p>
      </section>

      <form onSubmit={onSearch} className="grid gap-3 rounded-xl bg-white p-4 shadow md:grid-cols-5">
        <input className="rounded border p-2" placeholder="Search title" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <input className="rounded border p-2" placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <input className="rounded border p-2" type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
        <input className="rounded border p-2" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
        <button className="rounded bg-indigo-600 px-4 py-2 text-white">Search</button>
      </form>

      {loading ? <Loader /> : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => <CarCard key={car._id} car={car} />)}
          </div>
          <div className="flex justify-center gap-2">
            <button className="rounded border px-3 py-1" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
            <span className="px-2 py-1">{page} / {pages}</span>
            <button className="rounded border px-3 py-1" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
