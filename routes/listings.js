const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const Review = require('../models/Review');
const { isLoggedIn, isOwner } = require('../middleware');

// Index - Show all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find({}).populate('owner');
    res.render('listings/index', { listings });
  } catch (error) {
    req.flash('error', 'Error loading listings');
    res.redirect('/');
  }
});

// New - Show form to create new listing
router.get('/new', isLoggedIn, (req, res) => {
  res.render('listings/new');
});

// Create - Create new listing
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    await listing.save();
    req.flash('success', 'Successfully created new listing!');
    res.redirect(`/listings/${listing._id}`);
  } catch (error) {
    req.flash('error', 'Error creating listing');
    res.redirect('/listings/new');
  }
});

// Show - Show details of a specific listing
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching listing with ID:', req.params.id);
    
    const listing = await Listing.findById(req.params.id).populate('owner');
    
    if (!listing) {
      console.log('Listing not found');
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    }
    
    console.log('Listing found:', listing.title);
    console.log('Fetching reviews for listing:', listing._id);
    
    // Get reviews for this listing
    const reviews = await Review.find({ listing: listing._id }).populate('author');
    console.log('Reviews found:', reviews.length);
    
    res.render('listings/show', { listing, reviews });
  } catch (error) {
    console.error('Error loading listing:', error);
    console.error('Error stack:', error.stack);
    req.flash('error', 'Error loading listing');
    res.redirect('/listings');
  }
});

// Edit - Show form to edit listing
router.get('/:id/edit', isLoggedIn, isOwner, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    }
    res.render('listings/edit', { listing });
  } catch (error) {
    req.flash('error', 'Error loading listing');
    res.redirect('/listings');
  }
});

// Update - Update listing
router.put('/:id', isLoggedIn, isOwner, async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
    req.flash('success', 'Successfully updated listing!');
    res.redirect(`/listings/${req.params.id}`);
  } catch (error) {
    req.flash('error', 'Error updating listing');
    res.redirect(`/listings/${req.params.id}/edit`);
  }
});

// Delete - Delete listing
router.delete('/:id', isLoggedIn, isOwner, async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted listing!');
    res.redirect('/listings');
  } catch (error) {
    req.flash('error', 'Error deleting listing');
    res.redirect(`/listings/${req.params.id}`);
  }
});

module.exports = router; 