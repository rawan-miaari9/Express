# Food Delivery Marketplace Backend

This project is a NoSQL REST API system built using Node.js, Express.js, and MongoDB with Mongoose. It transforms a traditional relational database design for a multi-vendor food delivery marketplace into a high-performance, denormalized system with 5 core collections, robust schema validation, global error handling, and server-side pagination.

---

##  Key Features

* **Complete CRUD Engine:** Full Create, Read, Update, and Delete capabilities for all 5 core entities (Customers, Restaurants, Menu Items, Drivers, and Orders).
* **Automated Data Validation:** Enforces strict rules for required inputs, data types, and specific content formats (e.g., valid email structures and non-negative pricing).
* **Central Error Middleware:** Gracefully intercepts data validation issues and invalid database ID formats, turning ugly crashes into clean, readable server messages.
* **Built-in Pagination:** Protects server performance by breaking down large datasets into smaller page chunks using `page` and `limit` query parameters.

---

##  Tech Stack

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM Driver:** Mongoose
* **Language:** TypeScript
* **Testing Client:** Postman

---

##  Core API Endpoints

All endpoints receive and return data in standard JSON format.

###  Customers (`/api/customers`)
* `GET /api/customers?page=1&limit=10` -> Get all customers (with pagination)
* `GET /api/customers/:id` -> Get a specific customer by ID
* `POST /api/customers` -> Create a new customer
* `PUT /api/customers/:id` -> Update a customer's information
* `DELETE /api/customers/:id` -> Delete a customer profile

###  Restaurants (`/api/restaurants`)
* `GET /api/restaurants?page=1&limit=10` -> Get all restaurants
* `GET /api/restaurants/:id` -> Get a specific restaurant by ID
* `POST /api/restaurants` -> Register a new restaurant venue
* `PUT /api/restaurants/:id` -> Update a restaurant's details
* `DELETE /api/restaurants/:id` -> Remove a restaurant from the system

###  Menu Items (`/api/menuitems`)
* `GET /api/menuitems?page=1&limit=10` -> Get all menu items across restaurants
* `GET /api/menuitems/:id` -> Get a specific dish by ID
* `POST /api/menuitems` -> Add a new item to a restaurant's menu
* `PUT /api/menuitems/:id` -> Update item details (price, availability, etc.)
* `DELETE /api/menuitems/:id` -> Remove an item from the menu

###  Drivers (`/api/drivers`)
* `GET /api/drivers?page=1&limit=10` -> Get all registered delivery drivers
* `GET /api/drivers/:id` -> Get a specific driver profile by ID
* `POST /api/drivers` -> Onboard a new driver
* `PUT /api/drivers/:id` -> Update driver information or vehicle type
* `DELETE /api/drivers/:id` -> Remove a driver record

###  Orders (`/api/orders`)
* `GET /api/orders?page=1&limit=10` -> View the master order ledger (joins relational data)
* `GET /api/orders/:id` -> Fetch details for a specific order invoice
* `POST /api/orders` -> Place a brand new order
* `PUT /api/orders/:id` -> Update order fulfillment status (e.g., preparing, delivered)
* `DELETE /api/orders/:id` -> Clear an order reference from history

---

## How to Run the Project Locally

Follow these quick steps to get your development environment up and running:

### Step 1: Clone the Repository

### Step 2: Install Dependencies
Bash
npm install

Step 3: Configure Environment Variables
Create a file named .env in the root folder of your project (parallel to your package.json). Add the following keys with your specific details:

PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.hugenxc.mongodb.net/food-delivery-api?retryWrites=true&w=majority

Step 4: Run the Server in Development Mode
This fires up the app with hot-reloading enabled, meaning the server will instantly save changes whenever you update your code files.

npm run dev
Step 5: Test with Postman
Open Postman and direct your requests to your local host at: http://localhost:5000/api/<entity_route>
