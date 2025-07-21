const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('./database');
const User = require('./models/User.model');

// Create the Express app instance
const app = express();

// Immediately connect to the database
connectToDatabase();

// --- Middleware ---
// Apply CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// --- Environment Variables ---
// Read the secret key from Vercel's environment variables
const JWT_SECRET = process.env.JWT_SECRET;


// --- API ROUTES ---

// === FULL REGISTER ROUTE ===
app.post('/api/register', async (req, res) => {
  try {
    // Check if JWT_SECRET is available. If not, the server is misconfigured.
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables.');
    }
    
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully!' });

  } catch (error) {
    console.error('Error in /api/register:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});


// === FULL LOGIN ROUTE ===
app.post('/api/login', async (req, res) => {
  try {
    // Check if JWT_SECRET is available
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, message: 'Login successful!', token: token });
      }
    );

  } catch (error) {
    console.error('Error in /api/login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// --- EXPORT FOR VERCEL ---
// This is the crucial part that makes it a serverless function.
module.exports = app;