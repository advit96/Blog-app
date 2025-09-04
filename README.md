# Blog App (MERN)

## A minimal blog platform built with React, Node.js/Express, and MongoDB. It includes JWT auth, CRUD for posts, search, categories, and pagination.

# Tech Stack
## - Backend: Node.js, Express, MongoDB (Mongoose), JWT
## - Frontend: React (Vite), React Router, Axios, Tailwind CSS

Getting Started

# Backend
```powershell
cd backend
npm install
# create backend/.env
# PORT=5000
# MONGODB_URI=mongodb://127.0.0.1:27017/blog_app
# JWT_SECRET=replace_with_strong_secret
npm run dev
```

# Frontend
```powershell
cd frontend
npm install
# optional: frontend/.env
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

# Features
- User authentication (signup/login) with hashed passwords and JWT
- Posts CRUD: create, edit, delete, view
- Search, categories, and pagination

# API Overview
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/posts?q=&category=&page=&limit=
- GET /api/posts/:slug
- POST /api/posts (auth)
- PUT /api/posts/:slug (auth, owner)
- DELETE /api/posts/:slug (auth, owner)

# Project Structure
- backend/: Express API, models, routes, middleware
- frontend/: Vite React app with pages and Tailwind styling


