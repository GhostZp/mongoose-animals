import { Request, Response } from 'express';
import Category from '../models/Category';

export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find();

  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const category = new Category(req.body);
  const savedCategory = await category.save();

  res.status(201).json({
    message: 'Category created',
    data: savedCategory,
  });
};

export const updateCategory = async (req: Request, res: Response) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    message: 'Category updated',
    data: category,
  });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  res.json({
    message: 'Category deleted',
    data: category,
  });
};
