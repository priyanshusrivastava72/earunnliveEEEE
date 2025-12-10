# Landing Admin Panel

A complete admin panel for managing landing page content using **Node.js + Express + MongoDB + React + Vite**.

## 📁 Project Structure

```
landing-admin/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Admin.js       # Admin user model
│   │   │   └── Section.js     # Website section model
│   │   ├── routes/
│   │   │   ├── authRoutes.js  # Authentication endpoints
│   │   │   └── sectionRoutes.js # Section CRUD endpoints
│   │   ├── middleware/
│   │   │   ├── auth.js        # JWT protection middleware
│   │   │   └── errorHandler.js # Error handling
│   │   └── config/
│   │       └── db.js          # MongoDB connection
│   ├── server.js              # Express server entry
│   ├── .env                   # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── apiClient.js   # Axios client with interceptors
    │   │   ├── authApi.js     # Auth API calls
    │   │   └── sectionApi.js  # Section API calls
    │   ├── pages/
    │   │   ├── LoginPage.jsx  # Login form
    │   │   └── DashboardPage.jsx # Edit sections
    │   ├── routes/
    │   │   ├── AppRoutes.jsx  # Route definitions
    │   │   └── ProtectedRoute.jsx # Auth wrapper
    │   └── main.jsx           # React entry point
    ├── index.html             # HTML template
    ├── vite.config.js         # Vite config
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB running locally (or MongoDB Atlas)

### Backend Setup

```bash
cd landing-admin/backend

# Install dependencies
npm install

# Configure .env if needed (already set)
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/landing_admin
# JWT_SECRET=supersecretkeychangeit

# Start development server
npm run dev
```

Backend runs on: **http://localhost:5000**

### Create First Admin (One-time)

Using Postman or Thunder Client, send:

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "admin@admin.com",
  "password": "Admin@123"
}
```

### Frontend Setup

```bash
cd landing-admin/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs on: **http://localhost:5173**

### Login to Dashboard

- Email: `admin@admin.com`
- Password: `Admin@123`

## 📝 API Endpoints

### Auth
- `POST /api/auth/register` - Create admin (one-time)
- `POST /api/auth/login` - Login admin

### Sections
- `GET /api/sections` - Get all sections
- `GET /api/sections/:key` - Get section by key
- `PUT /api/sections/:key` - Create/update section (requires token)

## 🎯 How It Works

1. **Admin logs in** with email & password
2. **JWT token** stored in localStorage
3. **Dashboard shows all sections** from MongoDB
4. **Select a section** and edit: title, subtitle, content, image URL
5. **Click Save** → API updates MongoDB
6. **Your landing page** can fetch sections via GET /api/sections

## 📊 Section Model

Each section is stored in MongoDB with:
- `key` (string, unique) - e.g., "hero", "about", "services"
- `title` - Main heading
- `subtitle` - Secondary text
- `content` - Full description/body
- `imageUrl` - Featured image URL
- `extraData` - Extra JSON object for custom fields

## 🔒 Security

- Passwords hashed with **bcryptjs**
- JWT tokens expire in **7 days**
- Protected routes require Bearer token
- CORS enabled for frontend communication

## 🛠 Development Commands

**Backend:**
```bash
npm run dev    # Start with nodemon
npm start      # Start production
```

**Frontend:**
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview build
```

## 📦 Dependencies

**Backend:**
- express, mongoose, jsonwebtoken, bcryptjs, cors, dotenv

**Frontend:**
- react, react-router-dom, axios, vite

## 🚀 Production Deployment

1. Build frontend: `npm run build` → `dist/` folder
2. Serve frontend files from backend `/public` or separate hosting
3. Deploy backend to Heroku/Railway/AWS
4. Update MongoDB URI to production database
5. Change JWT_SECRET to strong random string

## 📝 License

MIT
