const express = require('express')
const dotenv = require('dotenv')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const cors = require('cors');

const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes');

const { notFound, errorHandler } = require('./middleware/errorHandler');

dotenv.config({ path: path.resolve(__dirname, '.env') });
connectDB();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',  // Change this to the origin of your React app
    credentials: true,
  }));
  

app.get('/', (req, res) => {
    res.send("API is running...");
})

// user opps
app.use('/api/users', userRoutes);

// errors
app.use(notFound);
app.use(errorHandler);



app.listen(PORT, console.log(`Server started on PORT ${PORT}`))