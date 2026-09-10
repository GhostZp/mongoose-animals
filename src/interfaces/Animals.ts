import { Document, Types } from 'mongoose';

export default interface Animal extends Document {
  animal_name: string;
  birthdate: Date;
  species: Types.ObjectId;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}