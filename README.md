# MERN Admin Panel

A modern admin panel built with **M**ongoDB, **E**xpress, **R**eact, and **N**ode.js

## Features

- User Authentication (Register/Login)
- Dashboard with statistics
- User Management
- Responsive design
- JWT token-based security
- MongoDB database integration

## Project Structure

```
earunnlive/
├── server/
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── controllers/    # Business logic
│   ├── middleware/     # Authentication & validation
│   ├── config/         # Configuration files
│   ├── server.js       # Server entry point
│   └── package.json    # Server dependencies
├── client/
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Utility functions
│   │   ├── context/    # React context
│   │   ├── hooks/      # Custom hooks
│   │   ├── styles/     # Global styles
│   │   ├── App.jsx     # Main app component
│   │   └── index.jsx   # React entry point
│   └── package.json    # Client dependencies
└── README.md           # Project documentation
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Server Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/earunnlive-admin
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Start the server:
```bash
npm run dev
```

### Client Setup

```bash
cd client
npm install
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Users (to be implemented)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Technologies Used

### Frontend
- React 18
- React Router DOM
- Axios
- Redux & Redux Toolkit
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- Bcryptjs

## Future Enhancements

- [ ] Product management
- [ ] Order management
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] File upload functionality
- [ ] Role-based access control (RBAC)
- [ ] Activity logs

## License

ISC
