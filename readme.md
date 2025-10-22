# 🎨 Dribbble Clone

A modern, full-stack web application inspired by Dribbble, built with Express.js, MongoDB, and EJS. Share your creative work, discover inspiring designs, and connect with a community of designers and artists.

🌐 **Check out the live site here:** [buildsbyaman-dribbble.vercel.app](https://buildsbyaman-dribbble.vercel.app)

## ✨ Features

### Core Functionality

- 🔐 **User Authentication** - Secure signup, login, and logout
- 📸 **Shot Management** - Create, edit, and delete creative shots
- 🖼️ **Image Upload** - Cloudinary integration for optimized image storage
- 👤 **User Profiles** - Personalized user pages and account management
- 🏷️ **Tagging System** - Organize shots with custom tags
- 📱 **Responsive Design** - Mobile-first, fully responsive interface

### Technical Features

- 🔒 **Secure Sessions** - Express-session with Passport.js authentication
- 🛡️ **Input Validation** - Joi schema validation for data integrity
- 🎯 **Error Handling** - Custom error pages and flash messaging
- 🎨 **Modern UI/UX** - Clean, minimalist design with CSS variables
- ⚡ **Performance** - Optimized CSS and efficient database queries

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary Account** (for image uploads)

## 📁 Project Structure

```
Dribbble/
├── 📁 controllers/      # Route controllers
│   ├── shot.js             # Shot-related logic
│   └── user.js             # User-related logic
├── 📁 models/           # Mongoose schemas
│   ├── comment.js          # Comment model
│   ├── shot.js             # Shot model
│   └── user.js             # User model
├── 📁 public/           # Static assets
│   ├── 📁 css/             # Stylesheets
│   └── 📁 images/          # Static images
├── 📁 routes/           # Express routes
│   ├── shot.js             # Shot routes
│   └── user.js             # User routes
├── 📁 utilities/        # Helper functions
│   └── CustomError.js      # Custom error class
├── 📁 views/            # EJS templates
│   ├── 📁 includes/        # Partial templates
│   ├── 📁 layouts/         # Layout templates
│   ├── 📁 shots/           # Shot templates
│   └── 📁 users/           # User templates
├── app.js               # Main application file
├── middleware.js        # Custom middleware
├── model.js             # Validation schemas
└── package.json         # Dependencies
```

## 🛠️ Technology Stack

### Backend

- **Express.js**    -  Web application framework
- **MongoDB**       -  NoSQL database
- **Mongoose**      -  MongoDB object modeling
- **Passport.js**   -  Authentication middleware
- **Multer**        -  File upload handling
- **Cloudinary**    -  Image storage and optimization

### Frontend

- **EJS** - Templating engine
- **CSS3** - Modern styling with CSS variables
- **Responsive Design** - Mobile-first approach

### Development Tools

- **Nodemon** - Auto-restart during development
- **Joi** - Schema validation
- **Method-Override** - HTTP method override

### Cloudinary Setup

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your `.env` file

## 🎨 Design System

### Color Palette

The application uses a modern, accessible color system:

- **Primary**: `#05299e` (Deep Blue)
- **Secondary**: `#64748b` (Slate Gray)
- **Success**: `#166534` (Green)
- **Error**: `#ef4444` (Red)
- **Warning**: `#ea4c89` (Pink)

## 🔒 Security Features

- **Password Hashing** - Bcrypt via Passport Local Mongoose
- **Session Management** - Secure session cookies
- **Input Validation** - Server-side validation with Joi
- **File Upload Security** - Restricted file types and size limits
- **XSS Protection** - EJS auto-escaping
- **CSRF Protection** - Method override tokens
