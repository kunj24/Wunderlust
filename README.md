<<<<<<< HEAD
# Wanderlust - Hotel Listing Platform

A full-stack web application for listing and managing hotel properties, built with Node.js, Express.js, MongoDB, and EJS templating.

## Features

- **User Authentication**: Sign up, login, and logout functionality
- **Hotel Listings**: Browse, create, edit, and delete hotel listings
- **Review System**: Rate and review hotels with star ratings and comments
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Image Management**: Support for external image URLs (e.g., Unsplash)
- **Authorization**: Users can only edit/delete their own listings and reviews

## Tech Stack

**Backend**: Node.js, Express.js
**Database**: MongoDB with Mongoose ODM
**Authentication**: Passport.js with local strategy
**Password Hashing**: bcrypt
**Templating**: EJS
**Frontend**: HTML, CSS, Bootstrap 5
**Icons**: Font Awesome

## Prerequisites

Node.js (v14 or higher)
MongoDB (running locally or cloud instance)
npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Ensure MongoDB is running on your system
   - The application will connect to `mongodb://localhost:27017/wanderlust`

4. **Seed the database**
   ```bash
   npm run seed
   ```
   This will create:
   - A default user (username: `demo`, password: `password123`)
   - 40 sample hotel listings

5. **Start the application**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open your browser and navigate to `image.pnghttp://localhost:8080`
   - The application will redirect to `/listings` by default

## Project Structure

```
wunderlust/
├── models/              # Database models
│   ├── User.js         # User model with authentication
│   ├── Listing.js      # Hotel listing model
│   └── Review.js       # Review model
├── routes/              # Express routes
│   ├── listings.js     # Hotel listing CRUD operations
│   ├── reviews.js      # Review operations
│   └── users.js        # Authentication routes
├── views/               # EJS templates
│   ├── partials/       # Reusable components
│   │   ├── header.ejs  # Navigation and alerts
│   │   └── footer.ejs  # Footer with social links
│   ├── listings/       # Hotel listing-related views
│   │   ├── index.ejs   # All hotel listings grid
│   │   ├── show.ejs    # Single hotel listing details
│   │   ├── new.ejs     # Create hotel listing form
│   │   └── edit.ejs    # Edit hotel listing form
│   └── users/          # User authentication views
│       ├── signup.ejs  # Registration form
│       └── login.ejs   # Login form
├── public/              # Static assets
│   └── css/            # Custom stylesheets
│       └── style.css   # Main CSS file
├── server.js            # Express server entry point
├── seed.js              # Database seeding script
├── sampleListings.js    # Sample hotel data for seeding
├── middleware.js        # Authentication middleware
├── package.json         # Project dependencies
└── README.md            # This file
```

## API Endpoints

### Authentication
- `GET /signup` - Show signup form
- `POST /signup` - Create new user account
- `GET /login` - Show login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Listings
- `GET /listings` - Show all hotel listings
- `GET /listings/new` - Show create hotel listing form (authenticated)
- `POST /listings` - Create new hotel listing (authenticated)
- `GET /listings/:id` - Show specific hotel listing
- `GET /listings/:id/edit` - Show edit form (owner only)
- `PUT /listings/:id` - Update hotel listing (owner only)
- `DELETE /listings/:id` - Delete hotel listing (owner only)

### Reviews
- `POST /reviews/:id` - Add review to hotel listing (authenticated)
- `DELETE /reviews/:id` - Delete review (author only)

## Default User Credentials

After running the seed script, you can login with:
- **Username**: `demo`
- **Password**: `password123`

## Features in Detail

### Hotel Listings
- Grid layout displaying hotel images, titles, prices, and locations
- Responsive design that works on all device sizes
- Each hotel listing card shows key information and links to detailed view

### Hotel Listing Management
- Authenticated users can create new hotel listings
- Hotel owners can edit and delete their listings
- Form validation ensures data integrity

### Review System
- Star rating system (1-5 stars)
- Comment functionality for detailed feedback
- Users can only delete their own reviews
- Reviews are displayed on hotel listing detail pages

### User Experience
- Flash messages for success/error feedback
- Responsive navigation with user authentication status
- Clean, modern UI using Bootstrap components
- Smooth animations and hover effects

## Customization

### Adding New Fields
To add new fields to hotel listings (e.g., amenities, pet-friendly status):
1. Update the `Listing` model in `models/Listing.js`
2. Modify the forms in `views/listings/new.ejs` and `views/listings/edit.ejs`
3. Update the display templates as needed

### Styling Changes
- Main styles are in `public/css/style.css`
- Bootstrap classes provide responsive layout and components
- Custom CSS adds animations and specific styling

### Database Schema
The application uses three main collections:
- **Users**: Authentication and user management
- **Listings**: Hotel information and metadata
- **Reviews**: User feedback and ratings

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
- Ensure MongoDB is running: `mongod`
- Check connection string in `server.js`

2. **Port Already in Use**
- Change the port in `server.js` or kill the process using port 8080

3. **Authentication Issues**
- Clear browser cookies and try logging in again
- Check that the user exists in the database

4. **Image Loading Issues**
- Verify image URLs are accessible
- Check browser console for CORS errors

### Development Tips

- Use `npm run dev` for development with auto-restart
- Check the browser console for JavaScript errors
- Monitor the terminal for server-side errors
- Use MongoDB Compass for database inspection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository or contact the development team.
=======

