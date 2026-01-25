# EventO Platform

A global, responsive web platform for booking venues (lawns, banquets, cafes, etc.) and event service providers (caterers, decorators, organizers) for weddings, birthdays, galas, engagements, and more.

![EventO Platform](https://via.placeholder.com/800x400?text=EventO+Platform)

## 🌟 Features

- **User & Host Registration**: Separate registration flows with OTP verification
- **Venue Management**: List and manage venues with detailed information
- **Service Provider Integration**: Caterers, decorators, and event organizers
- **Advanced Search**: Find venues by location, capacity, event type, and date
- **Booking System**: Complete booking flow with form customization
- **Payment Integration**: Secure payment processing with Stripe
- **Real-time Notifications**: Email and SMS notifications for bookings
- **Responsive Design**: Works on all devices (desktop, tablet, mobile)
- **Admin Dashboard**: Manage users, hosts, venues, and bookings

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js with Next.js
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API
- **Form Handling**: Formik with Yup validation
- **Animations**: Framer Motion
- **UI Components**: Custom components with React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express Validator
- **Payment Processing**: Stripe API
- **Notifications**: Nodemailer (Email), Twilio (SMS)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Stripe account (for payments)
- Twilio account (for SMS)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/enjoy-booking.git
   cd enjoy-booking
   ```

2. Run the setup script to install dependencies for both frontend and backend
   ```bash
   node setup.js
   ```

3. Configure environment variables:

   **Backend (.env file in backend directory)**
   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/enjoy-booking
   
   # JWT Authentication
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   
   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_FROM=your_email@gmail.com
   
   # Twilio SMS Configuration
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   
   # Stripe Payment Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

   **Frontend (.env.local file in frontend directory)**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. Start the development servers:

   **Backend**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

5. Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📋 Project Structure

```
enjoy-booking/
├── backend/                # Backend server
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── uploads/            # Uploaded files
│   ├── .env                # Environment variables
│   ├── .env.example        # Example environment variables
│   ├── package.json        # Dependencies and scripts
│   └── server.js           # Entry point
│
├── frontend/               # Next.js frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Next.js pages
│   │   ├── styles/         # CSS styles
│   │   └── utils/          # Utility functions
│   ├── .env.local          # Environment variables
│   └── package.json        # Dependencies and scripts
│
├── deploy.config.json      # Deployment configuration
├── setup.js                # Setup script
└── README.md               # Project documentation
```

## 🌐 Deployment

### Backend Deployment

1. Create a MongoDB Atlas cluster
2. Set up environment variables on your hosting platform
3. Deploy the backend to a service like Render, Heroku, or DigitalOcean

### Frontend Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to Vercel or Netlify:
   ```bash
   # Using Vercel CLI
   vercel
   
   # Using Netlify CLI
   netlify deploy
   ```

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation
- CORS protection
- Secure payment processing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@enjoybooking.com or open an issue in the repository.

