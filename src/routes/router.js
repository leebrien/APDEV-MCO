const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/model.users');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, username, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !username || !password || password !== confirmPassword) {
    return res.status(400).json({ error: 'Please fill all fields correctly and make sure passwords match.' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ firstName, lastName, username, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'Sign-up successful', user: { username } });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Server error during sign-up.' });
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    res.json({ message: 'Sign-in successful', user: { username } });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Server error during sign-in.' });
  }
});

module.exports = router;
