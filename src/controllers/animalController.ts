import { Request, Response } from 'express';

import Animal from '../models/Animals';

export const getAnimals = async (req: Request, res: Response) => {
  const animals = await Animal.find()
  .populate({
    path: 'species',
    populate: {
      path: 'category',
    },
  })
  .select('-__v');

  res.json(animals);
};

export const getAnimalById = async (req: Request, res: Response) => {
  const animal = await Animal.findById(req.params.id)
  .populate({
    path: 'species',
    populate: {
      path: 'category',
    },
  })
  .select('-__v');

  res.json(animal);
};

export const getAnimalsBySpecies = async (
  req: Request,
  res: Response
) => {
  const animals = await Animal.findBySpecies(req.params.species);

  res.json(animals);
};

export const createAnimal = async (req: Request, res: Response) => {
  const animal = new Animal(req.body);
  const savedAnimal = await animal.save();

  res.status(201).json({
    message: 'Animal created',
    data: savedAnimal,
  });
};

export const updateAnimal = async (req: Request, res: Response) => {
  const animal = await Animal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    message: 'Animal updated',
    data: animal,
  });
};

export const deleteAnimal = async (req: Request, res: Response) => {
  const animal = await Animal.findByIdAndDelete(req.params.id);

  res.json({
    message: 'Animal deleted',
    data: animal,
  });
};

export const getAnimalsByLocation = async (
  req: Request,
  res: Response
) => {
  const { topRight, bottomLeft } = req.query;

  const [topRightLon, topRightLat] = (topRight as string)
    .split(',')
    .map(Number);

  const [bottomLeftLon, bottomLeftLat] = (bottomLeft as string)
    .split(',')
    .map(Number);

  const animals = await Animal.find({
    location: {
      $geoWithin: {
        $box: [
          [bottomLeftLon, bottomLeftLat],
          [topRightLon, topRightLat],
        ],
      },
    },
  })
    .populate({
    path: 'species',
    populate: {
      path: 'category',
    },
  })
  .select('-__v');

  res.json(animals);
};
