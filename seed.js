const mongoose = require('mongoose');
const User = require('./models/User');
const Listing = require('./models/Listing');
const { data: sampleListings } = require('./sampleListings');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wanderlust', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing data
    await User.deleteMany({});
    await Listing.deleteMany({});
    console.log('Cleared existing data');
    
    // Create a default user
    const defaultUser = new User({
      username: 'demo',
      email: 'demo@wanderlust.com',
      password: 'password123'
    });
    
    await defaultUser.save();
    console.log('Created default user:', defaultUser.username);
    
    // Create listings with the default user as owner
    const listingsWithOwner = sampleListings.map(listing => ({
      ...listing,
      owner: defaultUser._id
    }));
    
    await Listing.insertMany(listingsWithOwner);
    console.log(`Created ${sampleListings.length} listings`);
    
    console.log('Database seeded successfully!');
    console.log('Default user credentials:');
    console.log('Username: demo');
    console.log('Password: password123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}); 