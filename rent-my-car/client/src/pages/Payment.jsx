import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../api/axios';

const Payment = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    const status = params.get('status');
    const bookingId = params.get('bookingId');

    if (!bookingId) return;

    API.post('/payment/verify', {
      bookingId,
      provider: 'stripe',
      paymentId: status === 'success' ? `stripe_${Date.now()}` : null
    }).then(() => {
      if (status === 'success') toast.success('Payment completed');
      else toast.error('Payment failed');
    });
  }, [params]);

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="rounded bg-white p-8 text-center shadow">
        <h1 className="text-2xl font-bold">Payment Status</h1>
        <p className="mt-3 text-slate-600">{params.get('status') === 'success' ? 'Payment successful!' : 'Payment failed or cancelled.'}</p>
      </div>
    </div>
  );
};

export default Payment;
