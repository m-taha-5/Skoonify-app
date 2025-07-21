const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true // Removes any whitespace from the beginning and end
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
    trim: true,
    lowercase: true // Store email in lowercase to avoid duplicates like 'Test@a.com' vs 'test@a.com'
  },
  password: {
    type: String,
    required: true
  }
});

// Create the model from the schema and export it
const User = mongoose.model('User', UserSchema);

module.exports = User;