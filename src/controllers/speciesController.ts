import { Request, Response } from 'express';

import Species from '../models/Species';

export const getSpecies = async (req: Request, res: Response) => {
  const species = await Species.find();

  res.json(species);
};

export const getSpeciesById = async (req: Request, res: Response) => {
  const species = await Species.findById(req.params.id);

  res.json(species);
};

export const getSpeciesByArea = async (
  req: Request,
  res: Response
) => {
  const species = await Species.findByArea(req.body);

  res.json(species);
};

export const createSpecies = async (req: Request, res: Response) => {
  const species = new Species(req.body);
  const savedSpecies = await species.save();

  res.status(201).json({
    message: 'Species created',
    data: savedSpecies,
  });
};

export const updateSpecies = async (req: Request, res: Response) => {
  const species = await Species.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    message: 'Species updated',
    data: species,
  });
};

export const deleteSpecies = async (req: Request, res: Response) => {
  const species = await Species.findByIdAndDelete(req.params.id);

  res.json({
    message: 'Species deleted',
    data: species,
  });
};
