# Restaurant Order & Billing Management System

This is a full-stack business management application designed for restaurants to manage food orders, billing operations, menu items, staff records, and sales tracking.

The system is split into two separate Next.js applications that connect to a single shared MongoDB database.

🔗 Live Links
Live (Customer): https://restaurant-management-system-6hhv.vercel.app/
Live (Admin): https://restaurant-management-system-roan.vercel.app/

---

## Project Structure

- /website - The customer-facing frontend site for browsing and ordering food.
- /admin-pane - The secure internal management dashboard and backend API host.

---

## Features

### Customer Website
- Dynamic menu loading with search and category filtering.
- Fully functional shopping cart (Zustand) with subtotal and tax calculations.
- Checkout page to capture name, phone, table/address, and payment method.
- Contact form to send messages directly to restaurant management.

### Admin Dashboard (Secured with JWT)
- Live Analytics: Total Revenue, active orders, and completed transaction counters.
- Menu Management: Full CRUD operations (Add, Edit, Delete) and active stock toggles.
- Category Management: CRUD operations for food categories.
- Order & Billing tracking: View order details and update order status (Pending, Preparing, Ready, Completed).
- Inbox: Read and delete customer contact messages.
- Dynamic Staff & Roles Management: Create custom roles with specific permissions, hire staff, and assign roles. Higher rank users are protected from modification by lower rank users.

---

## Tech Stack

- Frontend Framework: Next.js 15 (App Router)
- CSS Styling: Tailwind CSS (v4) & Lucide React Icons
- State Management: Zustand (Cart state)
- Database: MongoDB & Mongoose
- Security: JSON Web Tokens (JWT) & bcryptjs password hashing

---

## Setup & Installation

### Prerequisites
- Node.js installed on your computer.
- A MongoDB Atlas Database or local MongoDB instance.

### 1. Configure the Environment Variables
Create a file named `.env` inside the `admin-pane` folder and add your configuration details:

MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here

### 2. Install Dependencies
Open your terminal and run the install command inside both directories:

# Install website dependencies
cd website
npm install

# Install admin panel dependencies
cd ../admin-pane
npm install

### 3. Run the Development Servers
You need to run both applications simultaneously.

In terminal 1 (Website):
cd website
npm run dev

In terminal 2 (Admin Panel & APIs):
cd admin-pane
npm run dev -- -p 3001

The customer website will be live at: http://localhost:3000
The admin panel will be live at: http://localhost:3001

### 4. Setup Your First Account
Go to http://localhost:3001/register to create your first Master Admin account. Once registered, you can log in at http://localhost:3001/login.