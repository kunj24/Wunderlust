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
    req.flash('error', 'Error creating account');
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