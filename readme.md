# 🎨 Dribbble Clone

A modern, full-stack web application inspired by Dribbble, built with Express.js, MongoDB, and EJS. Share your creative work, discover inspiring designs, and connect with a community of designers and artists.

![Dribbble Clone](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

### Core Functionality

- 🔐 **User Authentication** - Secure signup, login, and logout
- 📸 **Post Management** - Create, edit, and delete creative posts
- 🖼️ **Image Upload** - Cloudinary integration for optimized image storage
- 👤 **User Profiles** - Personalized user pages and account management
- 🏷️ **Tagging System** - Organize posts with custom tags
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

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/buildsbyaman/Dribbble.git
   cd Dribbble
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # Database
   MONGOATLASURL=your_mongodb_connection_string

   # Session Security
   SESSION_SECRET=your_super_secret_session_key

   # Cloudinary Configuration
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**

   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to: `http://localhost:8080`

## 📁 Project Structure

```
Dribbble/
├── 📁 controllers/          # Route controllers
│   ├── post.js             # Post-related logic
│   └── user.js             # User-related logic
├── 📁 models/              # Mongoose schemas
│   ├── comment.js          # Comment model
│   ├── post.js             # Post model
│   └── user.js             # User model
├── 📁 public/              # Static assets
│   ├── 📁 css/             # Stylesheets
│   └── 📁 images/          # Static images
├── 📁 routes/              # Express routes
│   ├── post.js             # Post routes
│   └── user.js             # User routes
├── 📁 utilities/           # Helper functions
│   └── CustomError.js      # Custom error class
├── 📁 views/               # EJS templates
│   ├── 📁 includes/        # Partial templates
│   ├── 📁 layouts/         # Layout templates
│   ├── 📁 posts/           # Post templates
│   └── 📁 users/           # User templates
├── app.js                  # Main application file
├── middleware.js           # Custom middleware
├── model.js               # Validation schemas
└── package.json           # Dependencies
```

## 🛠️ Technology Stack

### Backend

- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization

### Frontend

- **EJS** - Templating engine
- **CSS3** - Modern styling with CSS variables
- **Responsive Design** - Mobile-first approach

### Development Tools

- **Nodemon** - Auto-restart during development
- **Joi** - Schema validation
- **Method-Override** - HTTP method override

## 🔧 Configuration

### Database Setup

The application supports both local MongoDB and MongoDB Atlas:

**Local MongoDB:**

```env
MONGOATLASURL=mongodb://localhost:27017/dribbble
```

**MongoDB Atlas:**

```env
MONGOATLASURL=mongodb+srv://username:password@cluster.mongodb.net/dribbble
```

### Cloudinary Setup

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your `.env` file

## 📊 API Endpoints

### Authentication Routes

- `GET /user/signup` - Show signup page
- `POST /user/signup` - Register new user
- `GET /user/login` - Show login page
- `POST /user/login` - Authenticate user
- `GET /user/logout` - Logout user

### User Routes

- `GET /user/` - User profile page
- `GET /user/edit` - Edit profile page
- `PUT /user/` - Update user profile
- `DELETE /user/` - Delete user account

### Post Routes

- `GET /post/` - Homepage (all posts)
- `GET /post/new` - Create new post page
- `POST /post/` - Create new post
- `GET /post/:id` - View individual post
- `GET /post/:id/edit` - Edit post page
- `PUT /post/:id` - Update post
- `DELETE /post/:id` - Delete post

## 🎨 Design System

### Color Palette

The application uses a modern, accessible color system:

- **Primary**: `#05299e` (Deep Blue)
- **Secondary**: `#64748b` (Slate Gray)
- **Success**: `#166534` (Green)
- **Error**: `#ef4444` (Red)
- **Warning**: `#ea4c89` (Pink)

### Typography

- **Headers**: Source Serif 4
- **Body Text**: Inter

## 🔒 Security Features

- **Password Hashing** - Bcrypt via Passport Local Mongoose
- **Session Management** - Secure session cookies
- **Input Validation** - Server-side validation with Joi
- **File Upload Security** - Restricted file types and size limits
- **XSS Protection** - EJS auto-escaping
- **CSRF Protection** - Method override tokens

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
SESSION_SECRET=your_production_session_secret
MONGOATLASURL=your_production_mongodb_url
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### Deployment Platforms

- **Heroku** - Ready for Heroku deployment
- **Railway** - Compatible with Railway
- **Vercel** - Serverless deployment ready
- **DigitalOcean** - VPS deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Dribbble](https://dribbble.com/)
- Built with love using modern web technologies
- Icons from [Feather Icons](https://feathericons.com/)

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/buildsbyaman/Dribbble/issues) page
2. Create a new issue if your problem isn't already listed
3. For urgent matters, contact: [your-email@example.com]

---

**Made with ❤️ by [Your Name]**

_Star ⭐ this repository if you found it helpful!_
