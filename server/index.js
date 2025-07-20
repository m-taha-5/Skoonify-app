const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('./database');
const User = require('./models/User.model');

const app = express();
const port = 3001;

// A secret key for signing our tokens.
const JWT_SECRET = process.env.JWT_SECRET;

const startServer = async () => {
  await connectToDatabase();
  app.use(cors());
  app.use(express.json());

  // === FULL REGISTER ROUTE ===
  app.post('/api/register', async (req, res) => {
    try {
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
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
  });


  // === FULL LOGIN ROUTE ===
  app.post('/api/login', async (req, res) => {
    try {
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
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();