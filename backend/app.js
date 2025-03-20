import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import authRoutes from '../backend/routes/auth.routes.js';
import userRoutes from '../backend/routes/user.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

export default app;