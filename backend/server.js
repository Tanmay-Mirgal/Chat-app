import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { ConnectDB } from './lib/db.js';
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth",authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    ConnectDB();
});