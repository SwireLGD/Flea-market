import express from 'express';
import Category from '../models/Category';
import Item from '../models/Item';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.get('/:categoryId/items', async (req, res, next) => {
  try {
    const items = await Item.find({ category: req.params.categoryId }).populate('category');
    if (!items.length) {
      return res.status(404).send({ message: 'No items in this category yet' });
    }
    return res.send(items);
  } catch (e) {
    return next(e);
  }
});

export default categoriesRouter;