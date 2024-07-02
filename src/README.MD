markdown
Copy code
# User API

This is a simple API for user registration and login, built with Node.js, TypeScript, Express, and JWT for authentication.

## Prerequisites

- Node.js
- npm or yarn

The server will start on `http://localhost:3000`.

## Endpoints

### Register a User

**URL:** `http://localhost:3000/api/v1/users/signup`

**Method:** `POST`

**Request Body:**
```json
{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
}
Curl:

bash
Copy code
curl -X POST http://localhost:3000/api/v1/users/signup \
-H "Content-Type: application/json" \
-d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
}'
Postman:

Set method to POST.
Enter the URL: http://localhost:3000/api/v1/users/signup.
Go to the Body tab, select raw and JSON.
Enter the request body:
json
Copy code
{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
}
Click Send.
Response:

json
Copy code
{
    "id": 1,
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "$2a$10$E9g6hJ/HgUb2.YyNfR7D.uQieBfOH7nWgyJHkMv.qk84Ysl.m1fEu"
}
Login a User
URL: http://localhost:3000/api/v1/users/login

Method: POST

Request Body:

json
Copy code
{
    "email": "testuser@example.com",
    "password": "password123"
}
Curl:

bash
Copy code
curl -X POST http://localhost:3000/api/v1/users/login \
-H "Content-Type: application/json" \
-d '{
    "email": "testuser@example.com",
    "password": "password123"
}'
Postman:

Set method to POST.
Enter the URL: http://localhost:3000/api/v1/users/login.
Go to the Body tab, select raw and JSON.
Enter the request body:
json
Copy code
{
    "email": "testuser@example.com",
    "password": "password123"
}
Click Send.
Response:

json
Copy code
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5ODUxNTg3LCJleHAiOjE2Mjk4NTUxODd9.RzGvc7WJqzgrBGgnQ7cO15e9SvlBv6W-5aY4KzxGHkY"
}
Project Structure
bash
Copy code
├── src
│   ├── controllers
│   │   └── userController.ts
│   ├── middlewares
│   │   └── authMiddleware.ts
│   ├── models
│   │   └── user.ts
│   ├── routes
│   │   └── userRoutes.ts
│   └── app.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
Running Locally
Make sure you have your .env file configured, then run:

bash
Copy code
npm start
# or
yarn start
Visit http://localhost:3000 to test the API.