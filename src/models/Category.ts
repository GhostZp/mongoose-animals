import mongoose from 'mongoose';
import Category from '../interfaces/Category';

const Schema = mongoose.Schema;

const categorySchema = new Schema<Category>({
  category_name: {
    type: String,
    minlength: 2,
    unique: true,
    required: true,
  },
});

export default mongoose.model<Category>('Category', categorySchema);