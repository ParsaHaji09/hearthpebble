const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config({ path: path.resolve(__dirname, '.env') });
connectDB();

// CORS Middleware must be before route definitions
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  credentials: true, // Allow cookies or authentication headers
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions)); // Apply CORS
app.options('*', cors(corsOptions)); // Preflight handling for all routes

// Body parsing middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send("API is running...");
});
app.use('/api/users', userRoutes); // Your user routes

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
