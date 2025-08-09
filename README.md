---

# Info Hub

Info Hub is a full-stack MERN web application designed to help users discover, create, and share information easily. It features a welcoming React front-end with animated UI elements and a backend API built with Node.js and Express connected to a MongoDB database.

## Features

* **React frontend** with animated welcome page and user-friendly UI
* **User registration and login** with authentication
* **Create, read, update, delete (CRUD) posts**
* **Responsive post display** with smooth transitions and styled components
* Backend REST API built with **Express** and **Node.js**
* **MongoDB** for data storage

## Technologies Used

* **MongoDB** - Database
* **Express** - Backend framework
* **React** - Frontend library
* **Node.js** - Backend runtime
* **React Router** - Frontend routing
* CSS animations and transitions for UI polish

## Getting Started

### Prerequisites

* Node.js (v14+ recommended)
* npm or yarn
* MongoDB instance (local or cloud like MongoDB Atlas)

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/info-hub.git
   cd info-hub
   ```

2. Install backend dependencies and start the server:

   ```bash
   cd backend
   npm install
   npm start
   ```

3. In a new terminal, install frontend dependencies and start React:

   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. Open your browser to `http://localhost:3000`

### Environment Variables

Create a `.env` file in the backend folder with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Project Structure

```
/backend      # Express API, models, controllers
/frontend     # React app, components, styles
```

## Usage

* Register a new user or login
* Create and view posts with descriptions, images, timestamps, and usernames
* Edit or delete your own posts

## License

MIT License

---
