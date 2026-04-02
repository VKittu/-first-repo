# rent-my-car (MERN)

Production-ready MERN starter for car rental with JWT auth, admin management, bookings, and Stripe/Razorpay-capable payment flows.

## Project Structure

```
rent-my-car/
├── client/ (React + Vite + Tailwind)
└── server/ (Express + MongoDB)
```

## Features

- User registration/login with JWT
- User and admin route guards
- Car listing, search, filters, pagination
- Admin car CRUD with image upload (multer)
- Booking workflow with date range selection
- Payment create/verify endpoints (Stripe + Razorpay)
- Booking history and admin dashboard charts
- Toast notifications, loader, reusable components

## Setup

### 1) Install dependencies

```bash
npm install --prefix rent-my-car/server
npm install --prefix rent-my-car/client
```

### 2) Configure env

Server env (`rent-my-car/server/.env`):

```bash
PORT=5000
MONGO_URI=
JWT_SECRET=
STRIPE_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLIENT_URL=http://localhost:5173
```

Client env (`rent-my-car/client/.env`):

```bash
VITE_API_URL=http://localhost:5000/api
VITE_SERVER_URL=http://localhost:5000
```

### 3) Run app

```bash
npm run dev --prefix rent-my-car/server
npm run dev --prefix rent-my-car/client
```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Cars
- `GET /api/cars`
- `GET /api/cars/:id`
- `POST /api/cars` (admin)
- `PUT /api/cars/:id` (admin)
- `DELETE /api/cars/:id` (admin)

### Bookings
- `POST /api/bookings`
- `GET /api/bookings/user`
- `GET /api/bookings/all` (admin)

### Payment
- `POST /api/payment/create-order`
- `POST /api/payment/verify`
