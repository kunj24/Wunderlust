const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const Review = require('../models/Review');
const { isLoggedIn, isReviewAuthor } = require('../middleware');

// Create - Add new review
router.post('/:id', isLoggedIn, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    }
    
    const review = new Review(req.body.review);
    review.author = req.user._id;
    review.listing = listing._id;
    
    await review.save();
    
    req.flash('success', 'Successfully added review!');
    res.redirect(`/listings/${listing._id}`);
  } catch (error) {
    req.flash('error', 'Error adding review');
    res.redirect(`/listings/${req.params.id}`);
  }
});

// Delete - Delete review
router.delete('/:id', isLoggedIn, isReviewAuthor, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      req.flash('error', 'Review not found');
      return res.redirect('/listings');
    }
    
    const listingId = review.listing;
    await Review.findByIdAndDelete(req.params.id);
    
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/listings/${listingId}`);
  } catch (error) {
    req.flash('error', 'Error deleting review');
    res.redirect('/listings');
  }
});

module.exports = router; 