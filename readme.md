# Dribbble Clone

A modern, full-stack web application inspired by Dribbble, built with Express.js, MongoDB, and EJS. Share your creative work, discover inspiring designs, and connect with a community of designers and artists.

🌐 **Check out the live site here:** [buildsbyaman-dribbble.vercel.app](https://buildsbyaman-dribbble.vercel.app)

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with email verification
- 📸 **Shot Management** - Create, edit, delete, and view creative shots
- 💬 **Reviews & Ratings** - Rate and comment on shots (1-5 stars)
- ❤️ **Like System** - Like/unlike shots with real-time updates
- 📊 **Statistics** - View and like counters for shots
- 🖼️ **Image Upload** - Cloudinary integration for optimized storage
- 👤 **User Profiles** - Personal profiles showing user shots and liked content
- 🔔 **Email Notifications** - OTP verification and password reset
- 🏷️ **Tagging System** - Organize shots with custom tags
- 📱 **Responsive Design** - Mobile-first, fully responsive interface
- �️ **Security** - Input validation, session management, and CSRF protection

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary Account** (for image uploads)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Start development server: `npm app.js`

## 📁 Project Structure

```
Dribbble/
├── 📁 controllers/      # Route controllers
│   ├── review.js           # Review management
│   ├── shot.js             # Shot CRUD operations
│   ├── stat.js             # Statistics & likes
│   └── user.js             # Authentication & profiles
├── 📁 models/           # Mongoose schemas
│   ├── review.js           # Review model
│   ├── shot.js             # Shot model
│   └── user.js             # User model
├── 📁 routes/           # Express routes
│   ├── review.js           # Review endpoints
│   ├── shot.js             # Shot endpoints
│   ├── stat.js             # Statistics endpoints
│   └── user.js             # User endpoints
├── 📁 utilities/        # Helper functions
│   ├── CustomError.js      # Error handling
│   ├── cleanupUnverifiedUsers.js  # User cleanup job
│   ├── verficationEmail.js # Email service
│   └── wrapAsync.js        # Async wrapper
├── 📁 public/css/       # Stylesheets
├── 📁 views/            # EJS templates
├── app.js               # Main application
├── middleware.js        # Auth middleware
└── model.js            # Joi validation schemas
```

## 🛠️ Technology Stack

**Backend:** Express.js, MongoDB, Mongoose, Passport.js, Multer, Cloudinary, Nodemailer
**Frontend:** EJS, CSS3 with CSS Variables, Responsive Design
**Security:** Joi Validation, Express-Session, CSRF Protection, Rate Limiting