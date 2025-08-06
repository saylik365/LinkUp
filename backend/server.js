const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Only once
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  "https://linkup-1-08s6.onrender.com", 
  "http://localhost:3000",             
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, 
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/linkedin-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
