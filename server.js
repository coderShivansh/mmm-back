const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Contact API');
});

// Routes
const contactRouter = require('./routes/contact');
app.use('/api/contact', contactRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
