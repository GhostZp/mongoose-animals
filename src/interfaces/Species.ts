import { Document, Types } from 'mongoose';

export default interface Species extends Document {
  species_name: string;
  image: string;
  category: Types.ObjectId;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}