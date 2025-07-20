const mongoose = require('mongoose');

// This is the connection string for your local MongoDB instance.
// 'mongodb://localhost:27017/' is the standard address.
// 'skoonify_db' is the name of the database we want to use.
const MONGO_URI = 'mongodb://localhost:27017/skoonify_db';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connection to MongoDB has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to MongoDB:', error);
  }
};

module.exports = connectToDatabase; // Just export the function