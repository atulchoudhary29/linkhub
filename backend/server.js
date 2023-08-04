import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/users.js';
import linkRoutes from './routes/links.js';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect to Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/links', linkRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

