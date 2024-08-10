# Shop Inventory and Sales Management System

This project is a backend system designed to manage inventory and sales for a small shop. It allows users to add items to the inventory, create bills for sales transactions, and update inventory automatically.

## Features

- **Item Management:** Add, update, delete, and retrieve items in the inventory.
- **Bill Management:** Create bills for sales, which automatically update the inventory.
- **Automatic Item ID Generation:** Item IDs are generated automatically when creating bills.
- **MongoDB Integration:** Utilizes MongoDB for data storage with Mongoose ORM.

## Getting Started

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your system. You can download it from [Node.js official website](https://nodejs.org/).
- **MongoDB**: Install MongoDB locally or use a cloud service like MongoDB Atlas.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/premlalwani09/Shop-Inventory.git
   cd Shop-Inventory


2. **Install Dependencies:**

    Navigate to the project directory and install the required packages:

    ```bash 
    npm install

3. ***Configure Environment Variables:***

    Create a .env file in the root directory and configure the following environment variables:

    ```bash
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/shop_inventory
    ```
        
    Replace MONGO_URI with your MongoDB connection string if using a cloud service.

4. ***Start the Server:***

    ```bash
    npm start
    ```

    The server should now be running on http://localhost:3000.


## API Endpoints

### Items

- **Add a New Item**
    - POST /api/items
    - Request Body:

    ```bash
    {
    "name": "Item A",
    "price": 20,
    "quantity": 100
    }

- **Retrieve All Items**
    - GET /api/items

- **Retrieve an Item by ID**
    - GET /api/items/:id

- **Update an Item**

    - PUT /api/items/:id
    - Request Body:

    ```bash
    {
    "name": "Updated Item A",
    "price": 25,
    "quantity": 50
    }

- **Delete an Item**

    - DELETE /api/items/:id


### Bills

- **Create a New Bill**

    - POST /api/bills
    - Request Body:

    ```bash
    {
    "items": [
        {
        "name": "Item A",
        "price": 20,   
        "quantity": 2
        },
        {
        "name": "Item B",
        "price": 10,   
        "quantity": 1
        }
    ]
    }

- **Retrieve All Bills**

    - GET /api/bills

- **Retrieve a Bill by ID**

    - GET /api/bills/:id


## Testing
You can use Postman or any other API client to test the endpoints.

