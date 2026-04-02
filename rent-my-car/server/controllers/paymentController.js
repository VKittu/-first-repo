import crypto from 'crypto';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import Booking from '../models/Booking.js';

const stripe = process.env.STRIPE_SECRET ? new Stripe(process.env.STRIPE_SECRET) : null;

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

export const createOrder = async (req, res) => {
  try {
    const { bookingId, provider = 'stripe' } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (provider === 'stripe') {
      if (!stripe) return res.status(500).json({ message: 'Stripe is not configured' });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'Rent My Car Booking' },
              unit_amount: booking.totalPrice * 100
            },
            quantity: 1
          }
        ],
        success_url: `${process.env.CLIENT_URL}/payment?status=success&bookingId=${booking._id}`,
        cancel_url: `${process.env.CLIENT_URL}/payment?status=failed&bookingId=${booking._id}`
      });

      return res.json({ provider: 'stripe', orderId: session.id, url: session.url });
    }

    if (!razorpay) return res.status(500).json({ message: 'Razorpay is not configured' });

    const order = await razorpay.orders.create({
      amount: booking.totalPrice * 100,
      currency: 'INR',
      receipt: String(booking._id)
    });

    return res.json({ provider: 'razorpay', orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { bookingId, provider = 'stripe', paymentId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (provider === 'razorpay') {
      const expected = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (expected !== razorpay_signature) {
        booking.paymentStatus = 'failed';
        await booking.save();
        return res.status(400).json({ message: 'Payment verification failed' });
      }

      booking.paymentStatus = 'paid';
      booking.bookingStatus = 'confirmed';
      booking.paymentProvider = 'razorpay';
      booking.paymentId = razorpay_payment_id;
      await booking.save();

      return res.json({ message: 'Payment verified successfully', booking });
    }

    booking.paymentStatus = paymentId ? 'paid' : 'failed';
    booking.bookingStatus = paymentId ? 'confirmed' : 'pending';
    booking.paymentProvider = 'stripe';
    booking.paymentId = paymentId || null;
    await booking.save();

    res.json({ message: booking.paymentStatus === 'paid' ? 'Payment success' : 'Payment failed', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
