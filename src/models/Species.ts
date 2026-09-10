import mongoose from 'mongoose';
import Species from '../interfaces/Species';
import Animal from './Animals';
import Polygon from '../interfaces/Polygon';

const Schema = mongoose.Schema;

const speciesSchema = new Schema<Species>({
  species_name: {
    type: String,
    minlength: 2,
    unique: true,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },

    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

speciesSchema.index({ location: '2dsphere' });

interface SpeciesModel extends mongoose.Model<Species> {
  findByArea(polygon: Polygon): Promise<Species[]>;
}

speciesSchema.statics.findByArea = async function (
  polygon: Polygon
): Promise<Species[]> {
  const animals = await Animal.find({
    location: {
      $geoWithin: {
        $geometry: polygon,
      },
    },
  });

  const speciesIds = animals.map((animal) => animal.species);

  return this.find({
    _id: { $in: speciesIds },
  });
};

export default mongoose.model<Species, SpeciesModel>(
  'Species',
  speciesSchema
);