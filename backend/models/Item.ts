import mongoose from "mongoose";

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
        required: true
    },
    image: {
        type: String || null
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    versionKey: false,
},
);

const Item = mongoose.model('Item', ItemSchema);

export default Item;