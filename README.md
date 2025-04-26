# HomeHunt Backend

HomeHunt Backend is the API server for the HomeHunt full-stack application, built with Node.js, Express, TypeScript, and MongoDB. It provides various services for managing products, users, authentication, and more.

## Technologies Used
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building REST APIs.
- **TypeScript**: Superset of JavaScript to improve type safety and code quality.
- **MongoDB**: NoSQL database used for storing application data.
- **JWT**: JSON Web Token for user authentication and authorization.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **Next.js** (Frontend): Frontend framework to interact with this backend API.

## Features
- **User Authentication**: JWT-based authentication with login and registration endpoints.
- **Product Management**: Create, update, delete, and get products.
- **Error Handling**: Centralized error handling for API responses.
- **Role-based Authorization**: Different access levels for Admins, Landlords, and Tenants.

## Project Setup

### Prerequisites
Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/) (either locally or use a cloud service like MongoDB Atlas)
- [Postman](https://www.postman.com/) (optional, for testing API endpoints)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/HasibulIslam007/homehunt_server.git
    cd homehunt-backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
      mongodb+srv://hasibulislambracu:Ldjifjzg1la89CRA@cluster0.vm27qzt.mongodb.net/NextMart?retryWrites=true&w=majority&appName=Cluster0
    ```

4. Run the server:

    ```bash
    npm run dev
    ```

    The server will start on `http://localhost:3001`.

### Available Scripts

- **`npm run dev`**: Starts the server in development mode with live-reloading.
- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Starts the application in production mode after building.
- **`npm run lint`**: Lint the codebase using ESLint.

### API Endpoints

- **POST `/auth/register`**: Registers a new user.
- **POST `/auth/login`**: Logs in an existing user and returns a JWT token.
- **GET `/products`**: Retrieves a list of products (with pagination).
- **GET `/products/:productId`**: Retrieves details of a single product.
- **POST `/products`**: Adds a new product (requires admin authentication).
- **PATCH `/products/:productId`**: Updates an existing product (requires admin authentication).
- **DELETE `/products/:productId`**: Deletes a product (requires admin authentication).

## Database

The backend uses **MongoDB** for data persistence. The `MONGO_URI` environment variable points to the database connection string.

### MongoDB Models

- **User Model**: Contains information about the user, including their role (Admin, Landlord, Tenant), email, and password (hashed).
- **Product Model**: Contains product details such as name, description, price, category, and image URL.

---

## Testing

You can test the API endpoints using **Postman** or **Insomnia**. Here’s a quick guide to get started:

1. **Login**: Send a `POST` request to `/auth/login` with the correct credentials to get a JWT token.
2. **Authenticated requests**: Include the token in the `Authorization` header as `Bearer <token>` for protected routes like `/products`, `/auth/me`, etc.

---

## Deployment

To deploy this project, you can use any cloud service that supports Node.js applications such as:

- **Vercel**: Easy integration with Node.js applications.


Make sure to configure the `.env` variables correctly when deploying.

---

## Contributing

We welcome contributions to the project! Here’s how you can help:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Create a pull request with a description of your changes.

---



