# Subscription Tracker API

## Description
The Subscription Tracker API is an application that allows users to create an account, login, and access protected routes to manage their subscriptions. It uses Express.js for the server, MongoDB and Mongoose for the database, and Upstash for sending reminder emails about the subscriptions.

## Features
- User authentication (Sign up, Login)
- Protected routes for managing subscriptions
- CRUD operations for subscriptions
- Automated email reminders for subscription renewals

## Technologies Used
- Express.js
- MongoDB
- Mongoose
- Upstash

## Installation
1. Clone the repository:
```bash
git clone https://github.com/guihi1/subscription-tracker.git
cd subscription-tracker
```

2. Install the dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following variables:
```
SERVER_URL=
DB_URI=
NODE_ENV=
JWT_SECRET=
JWT_EXPIRES_IN=
ARCJET_KEY=
ARCJET_ENV=
QSTASH_URL=
QSTASH_TOKEN
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=
EMAIL=
EMAIL_PASSWORD=
```

4. Start the application:
```bash
npm start
```


