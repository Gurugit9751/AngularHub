
# AngularHub FullStack

Recommended Project Structure

AngularHub/
│
├── client/                    ← Angular 20 (Standalone)
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
│
├── server/                    ← Node.js + Express.js
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── database/
│   ├── mongo-init.js
│   ├── backup/
│   └── README.md
│
├── docker-compose.yml
├── README.md
└── .gitignore


Client (Angular)

Keep your existing structure exactly as it is:

client/src/app
│
├── core
│   ├── data
│   ├── models
│   └── services
│
├── features
│   ├── home
│   ├── docs
│   ├── auth
│   └── dashboard
│
├── layout
│   ├── header
│   ├── sidebar
│   ├── footer
│   └── layout
│
├── shared
│
├── app.routes.ts
└── app.config.ts


Backend Features

Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
Refresh Token
Role-Based Authorization (Admin/User)
Password Hashing (bcrypt)
Validation
Global Error Handling
Logging
REST APIs

Authentication Flow

Angular Login Page
        │
        ▼
POST /api/auth/login
        │
        ▼
Express Controller
        │
        ▼
Auth Service
        │
        ▼
MongoDB
        │
        ▼
JWT Access Token
        │
        ▼
Angular HTTP Interceptor
        │
        ▼
Protected Routes


Database Collections

users

roles

permissions

refresh_tokens


| Layer            | Technology                                                       |
| ---------------- | ---------------------------------------------------------------- |
| Frontend         | Angular 20, Standalone Components, Angular Material              |
| Backend          | Node.js, Express.js                                              |
| Database         | MongoDB, Mongoose                                                |
| Authentication   | JWT + Refresh Token                                              |
| State Management | Angular Signals (NgRx Signal Store can be added later if needed) |
| API              | REST                                                             |
| Styling          | Angular Material + SCSS                                          |
| Deployment       | Docker (optional), Nginx                                         |


Step 1: Create the Angular Client
ng new client --standalone --routing --style=scss


Step 2: Create Server Folder
Windows
mkdir server
cd server
npm init -y


Step 4: Create Server Structure
Windows (PowerShell)
mkdir src
mkdir src\config
mkdir src\controllers
mkdir src\middleware
mkdir src\models
mkdir src\routes
mkdir src\services
mkdir src\utils

New-Item src\app.js -ItemType File
New-Item src\server.js -ItemType File
New-Item .env -ItemType File

Step 5: Create Database Folder
Windows
cd ..
mkdir database
mkdir database\backup
type nul > database\mongo-init.js



Final Structure

AngularHub
│
├── client
│   ├── src
│   ├── angular.json
│   ├── package.json
│   └── ...
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── database
│   ├── backup
│   └── mongo-init.js
│
└── README.md


Angular CLI Commands (Inside the client Folder)

Once you're inside client, use Angular CLI to generate your Angular code

cd client

ng g c features/home --standalone

ng g c features/docs --standalone

ng g c features/auth/login --standalone

ng g c features/auth/forgot-password --standalone

ng g c features/dashboard --standalone


ng g c layout/header --standalone

ng g c layout/sidebar --standalone

ng g c layout/footer --standalone

ng g c layout/layout --standalone


Generate services:

ng g s core/services/auth

ng g s core/services/token

ng g s core/services/api

Generate guards:
ng g guard core/guards/auth

ng g guard core/guards/role


Generate interceptor:

ng g interceptor core/interceptors/auth

Generate model:
ng g interface core/models/user


Development Rules

We'll follow these rules throughout:

✅ Never change your folder structure.
✅ Build file by file.
✅ Mention the full file path before every file.
✅ Every step should compile and run.
✅ Enterprise-level, reusable code.
✅ Explain why we're creating each file.
✅ No skipped steps.


Phase 1 – Backend Setup

We'll complete the backend before connecting Angular.

Step 1: Initialize the Server

We'll create:

server/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── package.json
└── .env

We'll first install all backend dependencies and verify the Express server starts successfully.

Step 2: MongoDB Connection
Create the database configuration.


Step 3: User Model
Create the Mongoose schema.

Step 4: Authentication
Register
Login
JWT generation
Password hashing


Step 5: Middleware
Authentication middleware
Error handling
Validation


Step 6: API Testing

Test everything with Postman or Bruno before integrating Angular.



Phase 1 - Step 1
Backend Project Setup (Node.js + Express.js)

cd server


Step2:
npm install express mongoose cors dotenv bcrypt jsonwebtoken helmet morgan express-validator cookie-parser compression

| Package               | Purpose                                        | Real-world Example                                                                 |
| --------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| **express**           | Web framework for Node.js                      | Creates REST APIs like `/login`, `/users`, `/products`                             |
| **mongoose**          | MongoDB ODM (Object Data Modeling)             | Helps create schemas, models, and query MongoDB easily                             |
| **cors**              | Cross-Origin Resource Sharing                  | Allows your Angular app (`localhost:4200`) to call your backend (`localhost:5000`) |
| **dotenv**            | Loads environment variables from a `.env` file | Keeps secrets like database URLs and JWT keys out of your code                     |
| **bcrypt**            | Hashes passwords securely                      | Stores encrypted passwords instead of plain text                                   |
| **jsonwebtoken**      | Creates and verifies JWT tokens                | Used after login to authenticate users                                             |
| **helmet**            | Adds security-related HTTP headers             | Protects against common web vulnerabilities                                        |
| **morgan**            | Logs incoming HTTP requests                    | Useful for debugging and monitoring API traffic                                    |
| **express-validator** | Validates API request data                     | Ensures email, password, and other fields are valid                                |
| **cookie-parser**     | Reads cookies from requests                    | Useful if you store refresh tokens in cookies                                      |
| **compression**       | Compresses HTTP responses                      | Makes API responses smaller and faster                                             |
