import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    pricePerDay: { type: Number, required: true, min: 1 },
    image: { type: String, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    available: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Car', carSchema);
