import Booking from '../models/Booking.js';
import Car from '../models/Car.js';

const dayDiff = (start, end) => Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;

export const createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return res.status(400).json({ message: 'Invalid booking dates' });
    }

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (!car.available) return res.status(400).json({ message: 'Car is currently unavailable' });

    const overlap = await Booking.findOne({
      carId,
      bookingStatus: { $in: ['pending', 'confirmed'] },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }
      ]
    });

    if (overlap) {
      return res.status(400).json({ message: 'This car is already booked for selected dates' });
    }

    const days = dayDiff(start, end);
    const totalPrice = days * car.pricePerDay;

    const booking = await Booking.create({
      userId: req.user._id,
      carId,
      startDate: start,
      endDate: end,
      totalPrice
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id }).populate('carId').sort({ createdAt: -1 });
  res.json(bookings);
};

export const getAllBookings = async (_req, res) => {
  const bookings = await Booking.find()
    .populate('userId', 'name email role')
    .populate('carId')
    .sort({ createdAt: -1 });
  res.json(bookings);
};
