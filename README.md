# CRUD Node.js Application with MySQL

This project is a simple CRUD application built with Node.js, Express, and MySQL. It includes APIs for managing `users`, `todos` and `categories`.

## Project Setup

### Prerequisites

- Node.js
- MySQL

### 1. Clone the Repository

```bash
git clone https://github.com/manthanank/crud-nodejs-mysql.git
cd crud-nodejs-mysql
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy the example environment file and edit it with your database credentials:

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file to include your MySQL database details:

   ```dotenv
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_DATABASE=your_database
   ```

### 4. Create the Database and Tables

1. **Create the database**:

   ```sql
   CREATE DATABASE your_database;
   ```

2. **Run SQL scripts to create the tables**:

   **`create_tables.sql`**:

   ```sql
   -- Create users table
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create categories table
    CREATE TABLE categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL
    );

    -- Create todos table
    CREATE TABLE todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT FALSE,
        user_id INT,
        category_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    -- Create todo_logs table
    CREATE TABLE todo_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        todo_id INT,
        action VARCHAR(50),
        action_time TIMESTAMP,
        FOREIGN KEY (todo_id) REFERENCES todos(id)
    );

    -- Create a view for todo details
    CREATE VIEW todo_details AS
    SELECT todos.id, todos.title, todos.completed, users.username, categories.name AS category_name
    FROM todos
    JOIN users ON todos.user_id = users.id
    JOIN categories ON todos.category_id = categories.id;
   ```

   Run the script in your MySQL client.

### 5. Start the Application

To start the application in development mode:

```bash
npm run dev
```

For production mode:

```bash
npm start
```

## API Endpoints

### Users

#### 1. Get All Users

- **Method**: `GET`
- **URL**: `/users`

#### 2. Get User by ID

- **Method**: `GET`
- **URL**: `/users/:id`

#### 3. Create User

- **Method**: `POST`
- **URL**: `/users`
- **Request Body**:

  ```json
  {
    "username": "john_doe",
    "email": "john@example.com"
  }
  ```

#### 4. Update User

- **Method**: `PUT`
- **URL**: `/users/:id`
- **Request Body**:

  ```json
  {
    "username": "john_doe_updated",
    "email": "john_updated@example.com"
  }
  ```

#### 5. Delete User

- **Method**: `DELETE`
- **URL**: `/users/:id`

### Todos

#### 1. Get All Todos

- **Method**: `GET`
- **URL**: `/todos`

#### 2. Get Todo by ID

- **Method**: `GET`
- **URL**: `/todos/:id`

#### 3. Create Todo

- **Method**: `POST`
- **URL**: `/todos`
- **Request Body**:

  ```json
  {
      "title": "Buy groceries",
      "completed": false,
      "user_id": 1,
      "category_id": 2
  }
  ```

#### 4. Update Todo

- **Method**: `PUT`
- **URL**: `/todos/:id`
- **Request Body**:

  ```json
  {
      "title": "Buy groceries and cook dinner",
      "completed": true,
      "user_id": 1,
      "category_id": 2
  }
  ```

#### 5. Delete Todo

- **Method**: `DELETE`
- **URL**: `/todos/:id`

### Todo Logs

#### 1. Get All Todo Logs

- **Method**: `GET`
- **URL**: `/todo-logs`

#### 2. Get Todo Log by ID

- **Method**: `GET`
- **URL**: `/todo-logs/:id`

#### 3. Create Todo Log

- **Method**: `POST`
- **URL**: `/todo-logs`
- **Request Body**:

  ```json
  {
      "todo_id": 1,
      "action": "Updated"
  }
  ```

#### 4. Delete Todo Log

- **Method**: `DELETE`
- **URL**: `/todo-logs/:id`

### Todo Details

#### 1. Get All Todo Details

- **Method**: `GET`
- **URL**: `/todo-details`

#### 2. Get Todo Detail by ID

- **Method**: `GET`
- **URL**: `/todo-details/:id`

### Categories

#### 1. Get All Categories

- **Method**: `GET`
- **URL**: `/categories`

#### 2. Get Category by ID

- **Method**: `GET`
- **URL**: `/categories/:id`

#### 3. Create Category

- **Method**: `POST`
- **URL**: `/categories`
- **Request Body**:

  ```json
  {
      "name": "Health"
  }
  ```

#### 4. Update Category

- **Method**: `PUT`
- **URL**: `/categories/:id`
- **Request Body**:

  ```json
  {
      "name": "Wellness"
  }
  ```

#### 5. Delete Category

- **Method**: `DELETE`
- **URL**: `/categories/:id`

## Error Handling

The application uses a basic error handling middleware that returns a 500 status code and an error message for any unexpected errors.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to contribute to this project by creating issues or pull requests.

## Contact

For any questions or issues, please contact [manthan.ank46@gmail.com](mailto:manthan.ank46@gmail.com).

Replace placeholders like `your-username`, `your_user`, `your_password`, and `your_database` with your actual values. Adjust the email address and any other project-specific details as necessary.

### Postman Documentation

- [Postman Documentation](https://documenter.getpostman.com/view/16684062/2sA3s6Ep9v)

### Test the APIs

You can test the APIs using Postman or any other API testing tool.

## Conclusion

That's it! You have successfully set up a CRUD Node.js application with MySQL. You can now use this project as a starting point for building your own Node.js applications with MySQL.
