// Check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be signed in');
    return res.redirect('/login');
  }
  next();
};

// Check if user is the owner of the listing
const isOwner = async (req, res, next) => {
  try {
    const Listing = require('./models/Listing');
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    }
    
    if (!listing.owner.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to do that');
      return res.redirect(`/listings/${req.params.id}`);
    }
    next();
  } catch (error) {
    req.flash('error', 'Error checking permissions');
    res.redirect('/listings');
  }
};

// Check if user is the author of the review
const isReviewAuthor = async (req, res, next) => {
  try {
    const Review = require('./models/Review');
    const review = await Review.findById(req.params.id);
    if (!review) {
      req.flash('error', 'Review not found');
      return res.redirect('/listings');
    }
    
    if (!review.author.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to do that');
      return res.redirect('/listings');
    }
    next();
  } catch (error) {
    req.flash('error', 'Error checking permissions');
    res.redirect('/listings');
  }
};

module.exports = {
  isLoggedIn,
  isOwner,
  isReviewAuthor
}; 