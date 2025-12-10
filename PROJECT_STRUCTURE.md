earunnlive/
├── server/
│   ├── config/                 # Configuration files
│   ├── controllers/
│   │   └── authController.js   # Auth business logic
│   ├── middleware/
│   │   └── auth.js             # JWT authentication
│   ├── models/
│   │   └── User.js             # User schema
│   ├── routes/
│   │   └── authRoutes.js       # Auth endpoints
│   ├── .env.example            # Environment variables template
│   ├── .eslintrc.json          # ESLint config
│   ├── .gitignore
│   ├── package.json
│   └── server.js               # Server entry point
│
├── client/
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation component
│   │   │   ├── Navbar.css
│   │   │   ├── UsersList.jsx   # Users table component
│   │   │   └── UsersList.css
│   │   ├── pages/
│   │   │   ├── Login.jsx       # Login page
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.jsx   # Dashboard page
│   │   │   └── Dashboard.css
│   │   ├── context/            # (For Redux or Context API)
│   │   ├── hooks/              # (Custom React hooks)
│   │   ├── utils/
│   │   │   └── api.js          # Axios API client
│   │   ├── styles/             # (Global styles)
│   │   ├── App.jsx             # Main app component
│   │   ├── App.css
│   │   ├── index.jsx           # React entry point
│   │   ├── index.css           # Global styles
│   │   └── .gitignore
│   └── package.json
│
├── .gitignore
├── package.json                # Root package (for running dev mode)
├── README.md                   # Project documentation
└── tsconfig.json              # TypeScript config

TOTAL FILES CREATED: 30+
