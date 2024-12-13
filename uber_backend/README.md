# Backend API Documentation

## /users/register

**Method:** POST

**Description:**

Registers a new user in the system.

**Request Parameters:**

- **email** (string, required): User's email address.
- **fullname.firstname** (string, required): User's first name (minimum 3 characters).
- **fullname.lastname** (string, required): User's last name (minimum 3 characters).
- **password** (string, required): User's password (minimum 6 characters).

**Responses:**

- **201 Created**
  - **Description:** User registered successfully.
  - **Content:** JSON with authentication token.
- **400 Bad Request**
  - **Description:** Input validation failed.
  - **Content:** JSON with error details.

### Example Request for /users/register

**Request:**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Example Response for /users/register

```json
{
  "token": "your-authentication-token"
}
```

## /users/login

**Method:** POST

**Description:**

Logs in an existing user.

**Request Parameters:**

- **email** (string, required): User's email address.
- **password** (string, required): User's password.

**Responses:**

- **200 OK**
  - **Description:** User logged in successfully.
  - **Content:** JSON with authentication token.
- **400 Bad Request**
  - **Description:** Input validation failed.
  - **Content:** JSON with error details.
- **401 Unauthorized**
  - **Description:** Authentication failed.
  - **Content:** JSON with error details.

### Example Request for /users/login

**Request:**

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Example Response for /users/login

```json
{
  "token": "your-authentication-token",
  "user": {
    "id": "user-id",
    "email": "john.doe@example.com",
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

## /users/profile

**Method:** GET

**Description:**

Fetches the profile of the authenticated user.

**Request Headers:**

- **Authorization** (string, required): Bearer token.

**Responses:**

- **200 OK**
  - **Description:** User profile fetched successfully.
  - **Content:** JSON with user profile details.
- **401 Unauthorized**
  - **Description:** Authentication failed.
  - **Content:** JSON with error details.

### Example Request for /users/profile

**Request:**

```json
{
  "Authorization": "Bearer your-authentication-token"
}
```

### Example Response for /users/profile

```json
{
  "id": "user-id",
  "email": "john.doe@example.com",
  "firstname": "John",
  "lastname": "Doe"
}
```

## /users/logout

**Method:** POST

**Description:**

Logs out the authenticated user.

**Request Headers:**

- **Authorization** (string, required): Bearer token.

**Responses:**

- **200 OK**
  - **Description:** User logged out successfully.
- **401 Unauthorized**
  - **Description:** Authentication failed.
  - **Content:** JSON with error details.

### Example Request for /users/logout

**Request:**

```json
{
  "Authorization": "Bearer your-authentication-token"
}
```

### Example Response for /users/logout

```json
{
  "message": "User logged out successfully"
}
```

## /captains/register

**Method:** POST

**Description:**

Registers a new captain in the system.

**Request Parameters:**

- **email** (string, required): Captain's email address.
- **fullname.firstname** (string, required): Captain's first name (minimum 3 characters).
- **fullname.lastname** (string, required): Captain's last name (minimum 3 characters).
- **password** (string, required): Captain's password (minimum 6 characters).
- **vehicle.vehicleType** (string, required): Type of the vehicle (minimum 3 characters).
- **vehicle.color** (string, required): Color of the vehicle (minimum 3 characters).
- **vehicle.plateNumber** (string, required): Plate number of the vehicle (minimum 3 characters).
- **vehicle.capacity** (number, required): Capacity of the vehicle.

**Responses:**

- **201 Created**
  - **Description:** Captain registered successfully.
  - **Content:** JSON with captain details.
- **400 Bad Request**
  - **Description:** Input validation failed.
  - **Content:** JSON with error details.

### Example Request for /captains/register

**Request:**

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securepassword",
  "vehicle": {
    "vehicleType": "car",
    "color": "red",
    "plateNumber": "ABC123",
    "capacity": 4
  }
}
```

### Example Response for /captains/register

```json
{
  "id": "captain-id",
  "token": "your-authentication-token",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "vehicle": {
    "vehicleType": "car",
    "color": "red",
    "plateNumber": "ABC123",
    "capacity": 4
  },
  "status": "offline"
}
```

## /captains/login

**Method:** POST

**Description:**

Logs in an existing captain.

**Request Parameters:**

- **email** (string, required): Captain's email address.
- **password** (string, required): Captain's password.

**Responses:**

- **200 OK**
  - **Description:** Captain logged in successfully.
  - **Content:** JSON with authentication token.
- **400 Bad Request**
  - **Description:** Input validation failed.
  - **Content:** JSON with error details.
- **401 Unauthorized**
  - **Description:** Authentication failed.
  - **Content:** JSON with error details.

### Example Request for /captains/login

**Request:**

```json
{
  "email": "jane.doe@example.com",
  "password": "securepassword"
}
```

### Example Response for /captains/login

```json
{
  "token": "your-authentication-token",
  "captain": {
    "id": "captain-id",
    "email": "jane.doe@example.com",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "vehicle": {
      "vehicleType": "car",
      "color": "red",
      "plateNumber": "ABC123",
      "capacity": 4
    },
    "status": "offline"
  }
}
```

## /captains/profile

**Method:** GET

**Description:**

Fetches the profile of the authenticated captain.

**Request Headers:**

- **Authorization** (string, required): Bearer token.

**Responses:**

- **200 OK**
  - **Description:** Captain profile fetched successfully.
  - **Content:** JSON with captain profile details.
- **401 Unauthorized**
  - **Description:** Authentication failed.
  - **Content:** JSON with error details.

### Example Request for /captains/profile

**Request:**

```json
{
  "Authorization": "Bearer your-authentication-token"
}
```

### Example Response for /captains/profile

```json
{
  "id": "captain-id",
  "email": "jane.doe@example.com",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "vehicle": {
    "vehicleType": "car",
    "color": "red",
    "plateNumber": "ABC123",
    "capacity": 4
  },
  "status": "offline"
}
```

## /captains/logout

**Method:** POST

**Description:**

Logs out the authenticated captain.

**Request Headers:**

- **Authorization** (string, required): Bearer token.

**Responses:**

- **200 OK**
  - **Description:** Captain logged out successfully.
- **401 Unauthorized**
  - **Description:** Authentication failed.
  - **Content:** JSON with error details.

### Example Request for /captains/logout

**Request:**

```json
{
  "Authorization": "Bearer your-authentication-token"
}
```

### Example Response for /captains/logout

```json
{
  "message": "Captain logged out successfully"
}
```
