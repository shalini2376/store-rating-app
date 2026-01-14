# ⭐ Store Rating Web Application

A full-stack web application that allows users to submit and manage ratings for registered stores.
The system supports role-based access control for administrators, normal users, and store owners.

## 🚀 Tech Stack

- Backend: Node.js, Express.js, SQLite
- Frontend: React.js (Vite), axios, react-router-dom
- Auth: JWT, bcrypt 

## ✨ Key Features

# 🔐 Authentication & Authorization

- Single login system for all users
- JWT-based authentication
- Role-based access control (Admin, User, Store Owner)

# 👑 Admin Functionalities

- View dashboard statistics:
    - Total users
    - Total stores
    - Total ratings

- Create and manage users (Admin / User / Store Owner)
- Add and manage stores
- View all users and stores with role-based details

# 👤 Normal User Functionalities

- Sign up and log in
- View all registered stores
- Search stores by name or address
- Submit ratings (1–5) for stores
- Update previously submitted ratings

# 🏪 Store Owner Functionalities

- View store dashboard
- See average store rating
- View list of users who rated their store

# 🗄️ Database Design

- Users: Stores all user information with role differentiation
- Stores: Stores store details and ownership mapping
- Ratings: Stores user-submitted ratings with unique user-store constraints

✔ Normalized schema
✔ Foreign key relationships
✔ Duplicate rating prevention

## 🛠️ Setup Instructions 

### Backend
```bash
cd backend
npm install
npm run dev
```

Server will run at:
```bash
http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:
```bash
 http://localhost:5173 
```

## 🔑 Roles

- Admin: Manage users, stores, dashboard stats
- User: Browse stores, submit ratings
- Store Owner: View store ratings

## 📌 Notes 

- SQLite used for simplicity
- Backend validations enforced
- Role-based access control implemented