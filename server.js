import dotenv from 'dotenv';
dotenv.config({});
import express from 'express';
import cors from 'cors';
import { connectMongoAtlas } from './config/db.js';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error.js';
import apartmentRoutes from './routes/apartment.js';
import reviewRoutes from './routes/review.js';
import userRoutes from './routes/user.js';
connectMongoAtlas();

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the root route' });
});

app.use('/api/v1/apartments', apartmentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/users', userRoutes);

// Error Handler Middlware
app.use(errorHandler);

const PORT = process.env.PORT || 5500;
const server = app.listen(PORT, () => {
    console.log(`The Local server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error Occured : `, err.message);
    server.close(() => process.exit(1));
});
