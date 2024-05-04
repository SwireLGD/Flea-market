import mongoose from "mongoose";
import config from "./config";
import Category from "./models/Category";
import User from "./models/User";
import { randomUUID } from "crypto";
import Item from "./models/Item";

const dropCollection = async (
        db: mongoose.Connection,
        collectionName: string,
    ) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const Collections = ['items', 'categories', 'users'];

const run = async () => {
        await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    for (const collection of Collections) {
        await dropCollection(db, collection);
    }

    const [category1, category2, category3] = await Category.create(
        {
            title: 'Clothes'
        },
        {
            title: 'Books'
        },
        {
            title: 'Arts'
        },
    );

    const [user1, user2] = await User.create(
        {username: 'Swire', password: '123qwerty', displayName: 'Beatrix Schwire', phoneNumber: '123456', token: randomUUID() },
        {username: 'Lilith', password: '123qwerty', displayName: 'Liliweiss', phoneNumber: '654321', token: randomUUID() }
    );

    const [item1, item2, item3, item4] = await Item.create(
        {title: 'Worn out coat', description: 'A coat thats been through a lot...', price: '200', category: category1._id, 
        image: 'fixtures/item1.jpg', seller: user1._id},
        {title: 'History of Rome', description: 'History book', price: '100', category: category2._id, 
        image: 'fixtures/item2.jpg', seller: user1._id},
        {title: 'Autoportrait', description: 'An autoportrait of some dude', price: '50', category: category3._id, 
        image: 'fixtures/item3.jpg', seller: user2._id},
        {title: 'Culinary book', description: 'Book with french cusine', price: '100', category: category2._id, 
        image: 'fixtures/item4.jpg', seller: user2._id},
    );

    await db.close();
};

void run();