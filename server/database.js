const mongoose = require('mongoose');

// Vercel provides the MONGO_URI in an "environment variable".
// We tell our code to use that variable. process.env is how you access them.
const MONGO_URI = process.env.MONGO_URI;

const connectToDatabase = async () => {
  try {
    // We check if the MONGO_URI was even provided.
    if (!MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined.');
    }
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connection to MongoDB has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to MongoDB:', error);
    // This makes sure the server will crash if it can't connect, which is good for debugging.
    process.exit(1); 
  }
};

module.exports = connectToDatabase;