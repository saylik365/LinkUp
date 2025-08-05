# LinkedIn Clone - Simplified MERN Stack

A simplified LinkedIn clone built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring only the core functionalities.

## 🚀 Features

### Core Features
- **User Authentication**: Secure registration and login with email & password
- **User Profiles**: Name, email, and bio management
- **Public Post Feed**: Create, read, and display text-only posts
- **Profile Pages**: View user profiles and their posts

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Integration**: Data persistence with Mongoose ODM
- **RESTful API**: Clean and organized backend endpoints
- **Modern UI**: Clean, responsive design
- **Real-time Updates**: Immediate UI updates after actions

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **Moment.js** - Date formatting
- **CSS3** - Styling with custom properties

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linkedin-clone
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Backend environment
   cd backend
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/linkedin-clone
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the application**
   ```bash
   # From root directory
   npm run dev
   ```
   
   This will start both backend (port 5000) and frontend (port 3000)

### Alternative: Run separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## 🗄️ Database Schema

### User Model
- `firstName` (String, required)
- `lastName` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `bio` (String, optional)
- `timestamps` (createdAt, updatedAt)

### Post Model
- `author` (ObjectId, ref: User, required)
- `content` (String, required)
- `timestamps` (createdAt, updatedAt)

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user

### Users
- `GET /api/users/:id` - Get user profile and posts
- `PUT /api/users/profile` - Update user profile

### Posts
- `GET /api/posts` - Get all posts (feed)
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get post by ID
- `DELETE /api/posts/:id` - Delete a post (author only)

## 🎨 UI Components

### Layout
- **Header**: Logo, search, and user menu
- **Sidebar**: User info and quick actions
- **Main Content**: Dynamic content area

### Components
- **Post Card**: Display posts with author and timestamp
- **Create Post**: Simple text post creation
- **Profile**: User profile display and editing
- **Authentication**: Login and registration forms

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create Heroku app
2. Set environment variables
3. Connect MongoDB Atlas
4. Deploy with Git

### Frontend Deployment (Netlify/Vercel)
1. Build the React app
2. Deploy to Netlify or Vercel
3. Set environment variables
4. Configure redirects for React Router

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- LinkedIn for the design inspiration
- MERN stack community
- React and Node.js communities

---

**Note**: This is a simplified learning project and not affiliated with LinkedIn. Use responsibly and respect LinkedIn's terms of service. 