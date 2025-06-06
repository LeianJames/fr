# Library Management System

A web-based library management system built with Node.js, Express, and SQLite.

## Features

- User authentication (Admin and Student roles)
- Book management (add, delete, update availability)
- Account management
- Category-based book organization
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd library-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
node init-database.js
```

4. Start the server:
```bash
node server.js
```

5. Open your browser and navigate to:
```
http://localhost:3000/page1.html
```

## Default Credentials

### Admin
- Username: admin
- Password: admin123

### Student
- ID: 2023001
- Password: password1

## Project Structure

```
├── server.js              # Main server file
├── init-database.js       # Database initialization script
├── package.json           # Project dependencies
├── .gitignore            # Git ignore file
├── README.md             # Project documentation
├── page1.html            # Login page
├── page1.5.html          # Main dashboard
└── Academics Books/      # Academic books section
    ├── academics.html
    └── academicspagination.js
```

## API Endpoints

- POST /api/login - User authentication
- POST /api/logout - User logout
- GET /api/books - Get all books
- GET /api/books/category/:category - Get books by category
- POST /api/books - Add new book (admin only)
- PUT /api/books/:id/availability - Update book availability (admin only)
- DELETE /api/books/:id - Delete book (admin only)
- GET /api/accounts - Get all accounts (admin only)
- POST /api/accounts/student - Add new student account (admin only)
- POST /api/accounts/admin - Add new admin account (admin only)
- DELETE /api/accounts/:type/:id - Delete account (admin only)

## Technologies Used

- Node.js
- Express.js
- SQLite3
- bcrypt (password hashing)
- express-session (session management)
- Bootstrap (UI framework)

## License

This project is licensed under the MIT License. 