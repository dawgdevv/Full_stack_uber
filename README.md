# Full Stack Uber-Clone Application

A comprehensive ride-hailing platform that connects riders with drivers, featuring real-time location tracking, ride management, and secure authentication.

## Core Features

### For Riders

- User registration and authentication
- Real-time ride booking
- Live driver tracking
- Ride history
- Multiple payment methods integration
- Rate and review drivers
- Save favorite locations
- Fare estimation
- Multiple ride types (Economy, Premium, etc.)

### For Drivers (Captains)

- Driver registration and verification
- Real-time ride requests
- Navigation integration
- Earnings tracking
- Status management (Online/Offline)
- Trip history
- Performance analytics
- Revenue reports

## Technical Architecture

### Frontend Technology Stack (uber_frontend)

- **Core Framework**: React 18.3
- **Build Tool**: Vite 6.0
- **State Management**: Redux Toolkit
- **Maps Integration**: Google Maps API
- **Real-time Communication**: Socket.io-client
- **Styling**:
  - Tailwind CSS
  - CSS Modules
  - Material-UI components
- **Form Handling**: React Hook Form
- **API Communication**: Axios
- **Authentication**: JWT with HTTP-only cookies
- **Testing**: Jest & React Testing Library

### Backend Technology Stack (uber_backend)

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.21
- **Database**: MongoDB with Mongoose 8.8
- **Real-time Server**: Socket.io
- **Authentication**:
  - JWT (jsonwebtoken)
  - Passport.js
- **Security**:
  - bcrypt for password hashing
  - helmet for HTTP headers
  - rate-limiting
  - CORS protection
- **Validation**: Joi/Yup
- **File Upload**: Multer
- **Payment Processing**: Stripe API
- **Email Service**: NodeMailer
- **Testing**: Jest with Supertest

## System Architecture

```plaintext
├── Frontend (React)
│   ├── Public Routes
│   │   ├── Landing Page
│   │   ├── Login/Register
│   │   └── Fare Estimation
│   └── Protected Routes
│       ├── User Dashboard
│       ├── Booking Interface
│       ├── Ride Tracking
│       └── Payment Management
│
├── Backend (Express.js)
│   ├── API Gateway
│   ├── Authentication Service
│   ├── Ride Management Service
│   ├── Payment Service
│   ├── Location Service
│   └── Notification Service
│
└── External Services
    ├── MongoDB Database
    ├── Redis Cache
    ├── Socket.io Server
    ├── Payment Gateway
    └── Maps Service
```

## API Services

### Authentication Service

- Complete JWT-based authentication flow
- Social login integration (Google, Facebook)
- Phone number verification
- Password reset functionality
- Session management

### Ride Management Service

- Ride creation and assignment
- Real-time location updates
- Fare calculation
- Route optimization
- Driver matching algorithm

### Payment Service

- Multiple payment method support
- Secure payment processing
- Automatic fare calculation
- Receipt generation
- Refund handling

### Location Service

- Real-time location tracking
- Geofencing
- Address autocomplete
- Distance calculation
- ETA prediction

### Notification Service

- Push notifications
- Email notifications
- SMS alerts
- In-app messaging

## Database Schema

### User Collection

- Basic profile (name, email, phone)
- Authentication details
- Payment information
- Ride history
- Preferences
- Ratings

### Captain Collection

- Profile information
- Vehicle details
- Documents and verification
- Performance metrics
- Earnings history
- Current status

### Ride Collection

- Ride details
- Route information
- Payment status
- Timestamps
- User and captain references

### Payment Collection

- Transaction details
- Payment method
- Status tracking
- Refund information

## Security Implementations

- JWT token rotation
- Rate limiting
- Request validation
- SQL injection prevention
- XSS protection
- CSRF protection
- Data encryption
- Secure password policies

## Development Setup

### Frontend Installation Steps

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

### Backend Installation Steps

1. Navigate to backend directory:

```bash
cd uber_backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with following variables:

```plaintext
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run development server:

```bash
npm run dev
```

## Performance Optimizations

- Redis caching
- Database indexing
- Load balancing
- Image optimization
- Code splitting
- Lazy loading
- Service worker implementation

## Monitoring and Logging

- Error tracking
- Performance monitoring
- User analytics
- Server health checks
- Automated alerting

## Contributing Guidelines

1. Fork the repository
1. Create your feature branch
1. Commit your changes
1. Push to the branch
1. Create a Pull Request
