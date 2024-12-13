# Uber-like Application

A full-stack ride-hailing application with separate frontend and backend components.

## Project Structure

```plaintext
├── uber_frontend/     # React frontend application
└── uber_backend/      # Express.js backend API
```

## Frontend (uber_frontend)

React application built with Vite

### Frontend Tech Stack

- React 18.3
- Vite 6.0
- ESLint
- CSS Modules

### Frontend Installation Steps

1. Navigate to frontend directory:

```bash
cd uber_frontend
```

1. Install dependencies:

```bash
npm install
```

1. Run development server:

```bash
npm run dev
```

1. Build for production:

```bash
npm run build
```

## Backend (uber_backend)

Express.js REST API with MongoDB

### Tech Stack

- Node.js
- Express.js 4.21
- MongoDB with Mongoose 8.8
- JWT Authentication
- Cookie Parser
- CORS enabled

### Features

- User authentication (register/login/logout)
- Captain authentication (register/login/logout)
- Profile management
- Token blacklisting
- Input validation
- Password hashing

### API Endpoints

#### Users

- POST `/users/register` - Register new user
- POST `/users/login` - User login
- GET `/users/profile` - Get user profile
- GET `/users/logout` - User logout

#### Captains

- POST `/captains/register` - Register new captain
- POST `/captains/login` - Captain login
- GET `/captains/profile` - Get captain profile
- GET `/captains/logout` - Captain logout

### Backend Installation Steps

1. Navigate to backend directory:

```bash
cd uber_backend
```

1. Install dependencies:

```bash
npm install
```

1. Create `.env` file with following variables:

```plaintext
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

1. Run development server:

```bash
npm run dev
```

### Models

#### User Model

- Fullname (firstname, lastname)
- Email
- Password
- Socket ID

#### Captain Model

- Fullname (firstname, lastname)
- Email
- Password
- Vehicle details (type, color, plate number, capacity)
- Status (online/offline)
- Socket ID

#### BlacklistToken Model

- Token
- Created At (auto-expires after 24h)

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Token blacklisting
- Input validation
- Protected routes
- CORS enabled
- Cookie-based authentication

## Development Workflow

### Frontend Development Setup

```bash
cd uber_frontend
npm run dev
```

### Backend Development Setup

```bash
cd uber_backend
npm run dev
```

## API Reference

Detailed API documentation available in [uber_backend/README.md](uber_backend/README.md)

## Contributing

1. Fork the repository
1. Create your feature branch
1. Commit your changes
1. Push to the branch
1. Create a Pull Request

## License

ISC
