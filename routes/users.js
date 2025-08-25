const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Show signup form
router.get('/signup', (req, res) => {
  res.render('users/signup');
});

// Handle signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    
    req.flash('success', 'Welcome to Wanderlust!');
    res.redirect('/login');
  } catch (error) {
    console.error('Signup error:', error);
    let message = 'Error creating account';
    // Duplicate key error (e.g., unique username/email)
    if (error && error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0] || 'field';
      message = `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} already exists`;
    } else if (error.name === 'ValidationError') {
      const details = Object.values(error.errors).map(e => e.message).join(', ');
      message = `Validation failed: ${details}`;
    }
    req.flash('error', message);
    res.redirect('/signup');
  }
});

// Show login form
router.get('/login', (req, res) => {
  res.render('users/login');
});

// Handle login
router.post('/login', passport.authenticate('local', {
  failureFlash: true,
  failureRedirect: '/login'
}), (req, res) => {
  req.flash('success', 'Welcome back!');
  res.redirect('/');
});

// Handle logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash('error', 'Error logging out');
      return res.redirect('/');
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/');
  });
});

module.exports = router; 