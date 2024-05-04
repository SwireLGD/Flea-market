import express from 'express';
import Item from '../models/Item';
import mongoose, { Types } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import { ItemMutation } from '../types';

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res, next) => {
    try {
      const items = await Item.find();
      return res.send(items);
    } catch (e) {
      return next(e);
    }
});

itemsRouter.get('/:id', async (req, res, next) => {
    try {
        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch (e) {
            return res.status(404).send({ error: 'Wrong ObjectId' });
        }

        const item = await Item.findOne({ _id });

        if(!item) {
            return res.status(404).send({ error: 'Not found!' });
        }

        return res.send(item);
    } catch (e) {
        return next(e);
    }
});

itemsRouter.post('/', auth, async (req, res, next) => {
    try {
        const itemData: ItemMutation = {
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
            category: req.body.category
        }
        const item = new Item(itemData);
        await item.save();

        return res.send(item);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
    
        return next(e);
    }
});

itemsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
    try {
        const result = await Item.deleteOne({ _id: req.params.id, seller: req.user!._id });
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Item not found or unauthorized to delete the item' });
        }
        return res.status(204).send();
    } catch (e) {
        return next(e);
    }
});
