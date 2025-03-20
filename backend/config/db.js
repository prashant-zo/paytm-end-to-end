import mongoose from 'mongoose';
import logger from './logger.js';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';
import Account from '../models/Account.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        logger.info(`MongoDB Connected ${conn.connection.host}`)
    } catch (err) {
        logger.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

export { User, Account };

export default connectDB;