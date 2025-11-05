import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './database/index.js';
import { router } from './routes/user.routes.js';
import path from 'path';

dotenv.config({ path: './.env' });

const app = express();

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(cors());
app.use(express.json());
app.use('/', router);


connectDb();


export default app;
