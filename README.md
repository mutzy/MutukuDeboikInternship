# Employee Record Management

## Description

This is a simple CRUD web application built with Next.js and MongoDB. The project allows users to manage employee records while implementing authentication using NextAuth.js.

## Features

✅ Create a record (First Name, Last Name, Email, Phone, Role: Admin/Staff).  
✅ Read all records and display them in a list.  
✅ Update the First Name, Last Name, and Phone.  
✅ Delete a record.  
✅ User authentication (Sign-up, Log in, Log out).  
✅ Protect CRUD operations – only logged-in users can manage records.  
✅ Use JWT-based authentication with NextAuth.js.  
✅ Server-side rendering (SSR) or static generation (SSG).  
✅ Error handling and proper validations.

## Tech Stack

- **Next.js** (for frontend and API routes)
- **MongoDB & Mongoose** (for data storage and schema management)
- **NextAuth.js** (for authentication)
- **Tailwind CSS** (for UI styling)
- **bcrypt** (for password hashing)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/employee-record-management.git
   cd employee-record-management
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```sh
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Sign up or log in** to access the application.
- **Create, read, update, and delete employee records** while logged in.
- **Authentication is required** to perform CRUD operations.

## API Routes

- `POST /api/register` – Register a new user.
- `POST /api/auth/[...nextauth]` – Log in user.
- `GET /api/employees` – Get all employee records.
- `POST /api/employees` – Create a new record.
- `PUT /api/employee/:id` – Update an employee record.
- `DELETE /api/employee/:id` – Delete an employee record.

## Author

Mutuku Muli
