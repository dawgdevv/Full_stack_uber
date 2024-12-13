# Uber-like Application

A full-stack ride-hailing application with separate frontend and backend components.

## Project Structure

```
├── uber_frontend/     # React frontend application
└── uber_backend/      # Express.js backend API
```

## Frontend (uber_frontend)

React application built with Vite

### Tech Stack

- React 18.3
- Vite 6.0
- ESLint
- CSS Modules

### Setup & Installation

1. Navigate to frontend directory:

```bash
cd uber_frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

4. Build for production:

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

### Setup & Installation

1. Navigate to backend directory:

```bash
cd uber_backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with following variables:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run development server:

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

## Development

### Frontend Development

```bash
cd uber_frontend
npm run dev
```

### Backend Development

```bash
cd uber_backend
npm run dev
```

## API Documentation

Detailed API documentation available in [uber_backend/README.md](uber_backend/README.md)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
