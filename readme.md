# Toposel API

A REST API for managing User data with user authentication, built with Node.js, Express, Typescript.

## Features

- User authentication with JWT, Cookie
- User data management
- MongoDB database

## Tech Stack

- Node.js
- Express.js
- Typescript
- MongoDB
- Bcrypt
- JWT and Cookie for authentication

## API Endpoints

The server exposes the following API endpoints:

### Authentication

- `/api/v1/auth/signIn` - login route
- `/api/v1/auth/signUp` - register route

### Users

- `/api/v1/users/myData` - user data by id
- `/api/vi/users/showAll` - fetch all User data

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=
PORT=
JWT_SECRET="your-jwt-secret"
```

## Installation

1. Clone the repository:

```bash
https://github.com/sudipkumar0200/toposel-assignment
cd toposel-assignment
```

2. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run start
```

## License

[MIT License](LICENSE)
