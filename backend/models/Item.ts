import mongoose, { Types } from "mongoose";
import Category from "./Category";
import User from "./User";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        validate: {
            validator: async (id: Types.ObjectId) => {
              const category = await Category.findById(id);
              return Boolean(category);
            },
            message: 'Category does not exist!',
        },
    },
    image: {
        type: String || null
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (id: Types.ObjectId) => {
              const user = await User.findById(id);
              return Boolean(user);
            },
            message: 'User does not exist!',
        },
    }
},
{
    versionKey: false,
},
);

const Item = mongoose.model('Item', ItemSchema);

export default Item;