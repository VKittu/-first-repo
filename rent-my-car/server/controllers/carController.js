import Car from '../models/Car.js';

export const getCars = async (req, res) => {
  try {
    const { search = '', location = '', minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER, page = 1, limit = 8 } = req.query;

    const query = {
      title: { $regex: search, $options: 'i' },
      location: { $regex: location, $options: 'i' },
      pricePerDay: { $gte: Number(minPrice), $lte: Number(maxPrice) }
    };

    const skip = (Number(page) - 1) * Number(limit);

    const [cars, total] = await Promise.all([
      Car.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate('createdBy', 'name email'),
      Car.countDocuments(query)
    ]);

    res.json({ cars, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarById = async (req, res) => {
  const car = await Car.findById(req.params.id).populate('createdBy', 'name email');
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json(car);
};

export const addCar = async (req, res) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const car = await Car.create({
      ...req.body,
      image,
      createdBy: req.user._id
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const car = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });

    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCar = async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json({ message: 'Car deleted successfully' });
};
