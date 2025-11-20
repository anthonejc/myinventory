# User Dashboard Setup Guide

## Database Setup

Before using the user dashboard, you need to initialize the required database tables for cart and orders functionality.

### Option 1: Using the API endpoint (Recommended)

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Make a POST request to initialize tables:
   ```bash
   curl -X POST http://localhost:3000/api/init-tables
   ```

   Or visit `http://localhost:3000/api/init-tables` in your browser and use a tool like Postman to make a POST request.

### Option 2: Using SQL directly

Run the SQL commands from `init-user-tables.sql` in your PostgreSQL database:

```sql
-- Run the contents of init-user-tables.sql in your database
```

## Features Included

### User Dashboard
- **Product Browsing**: View all available products with search and category filtering
- **Shopping Cart**: Add items to cart, update quantities, remove items
- **Checkout**: Place orders with automatic stock management
- **Order History**: View all past orders with detailed item information

### Key Features:
1. **Product Management**:
   - Search products by name or description
   - Filter by category
   - View stock availability
   - Real-time stock updates

2. **Cart Functionality**:
   - Add products to cart
   - Update item quantities
   - Remove items from cart
   - Real-time cart total calculation
   - Stock validation

3. **Order Processing**:
   - Secure checkout process
   - Automatic stock deduction
   - Order confirmation
   - Transaction rollback on errors

4. **Order History**:
   - View all past orders
   - Order status tracking
   - Detailed item breakdown
   - Order date and total amount

### API Endpoints Created:

- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart` - Remove item from cart

- `GET /api/orders` - Get user's order history
- `POST /api/orders` - Create new order (checkout)

- `POST /api/init-tables` - Initialize database tables

### Security Features:
- JWT token authentication for all user operations
- User-specific cart and order isolation
- Stock validation before order placement
- Transaction safety with rollback on errors

## Usage

1. Login as a user (not admin)
2. Browse products on the main dashboard
3. Add items to your cart
4. View and manage your cart
5. Proceed to checkout
6. View your order history

The dashboard provides a complete e-commerce experience with modern UI/UX patterns including:
- Responsive design
- Loading states
- Toast notifications
- Real-time updates
- Error handling