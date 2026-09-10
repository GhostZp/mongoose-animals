import mongoose from 'mongoose';
import Animal from '../interfaces/Animals';

const Schema = mongoose.Schema;

interface AnimalModel extends mongoose.Model<Animal> {
  findBySpecies(species_name: string): Promise<Animal[]>;
}

const animalSchema = new Schema<Animal, AnimalModel>({
  animal_name: {
    type: String,
    minlength: 2,
    required: true,
  },

  birthdate: {
    type: Date,
    required: true,
    validate: {
      validator: (value: Date) => value <= new Date(),
      message: 'Birthdate cannot be in the future',
    },
  },

  species: {
    type: Schema.Types.ObjectId,
    ref: 'Species',
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

animalSchema.index({ location: '2dsphere' });

animalSchema.statics.findBySpecies = async function (
  species_name: string
): Promise<Animal[]> {
  return this.aggregate([
    {
      $lookup: {
        from: 'species',
        localField: 'species',
        foreignField: '_id',
        as: 'species',
      },
    },
    {
      $unwind: '$species',
    },
    {
      $match: {
        'species.species_name': species_name,
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'species.category',
        foreignField: '_id',
        as: 'species.category',
      },
    },
    {
      $unwind: '$species.category',
    },
    {
      $project: {
        __v: 0,
        'species.__v': 0,
        'species.category.__v': 0,
      },
    },
  ]);
};

export default mongoose.model<Animal, AnimalModel>(
  'Animal',
  animalSchema
);
