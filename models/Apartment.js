import mongoose from 'mongoose';

const ApartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  }
});

export const Apartment = mongoose.model('Apartment',ApartmentSchema)