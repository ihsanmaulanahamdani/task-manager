# Task Manager API Server

Express.js backend server for Task Manager application following MVC architecture.

## Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JSON Web Token** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Request validation
- **CORS** - Cross-origin requests

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.ts          # Database configuration
│   ├── models/
│   │   ├── User.ts              # User model
│   │   ├── Task.ts              # Task model
│   │   └── index.ts             # Models export
│   ├── controllers/
│   │   ├── authController.ts    # Auth logic
│   │   └── taskController.ts    # Task logic
│   ├── routes/
│   │   ├── authRoutes.ts        # Auth endpoints
│   │   ├── taskRoutes.ts        # Task endpoints
│   │   └── index.ts             # Routes export
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   ├── validator.ts         # Joi validation
│   │   └── errorHandler.ts      # Error handling
│   ├── validators/
│   │   └── index.ts             # Joi schemas
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point
│
├── Dockerfile
├── package.json
├── tsconfig.json
└── .env.example
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Setup environment variables**

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Ensure PostgreSQL is running**

```bash
docker-compose up postgres -d
```

4. **Start development server**

```bash
npm run dev
```

Server will run on http://localhost:4000

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | No            |
| POST   | `/api/auth/login`    | Login user        | No            |
| POST   | `/api/auth/logout`   | Logout user       | Yes           |
| GET    | `/api/auth/me`       | Get current user  | Yes           |

### Tasks

| Method | Endpoint                     | Description            | Auth Required |
| ------ | ---------------------------- | ---------------------- | ------------- |
| GET    | `/api/tasks`                 | Get all tasks          | Yes           |
| GET    | `/api/tasks?status=<status>` | Filter tasks by status | Yes           |
| GET    | `/api/tasks/:id`             | Get single task        | Yes           |
| POST   | `/api/tasks`                 | Create new task        | Yes           |
| PUT    | `/api/tasks/:id`             | Update task            | Yes           |
| DELETE | `/api/tasks/:id`             | Delete task            | Yes           |

### Health Check

| Method | Endpoint      | Description  | Auth Required |
| ------ | ------------- | ------------ | ------------- |
| GET    | `/api/health` | Health check | No            |

## Request/Response Examples

### Register User

**Request:**

```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt-token"
}
```

### Create Task

**Request:**

```json
POST /api/tasks
Authorization: Bearer <token>
{
  "title": "Complete project",
  "description": "Finish the task manager app",
  "status": "to do"
}
```

**Response:**

```json
{
  "task": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task manager app",
    "status": "to do",
    "userId": "user-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Environment Variables

| Variable         | Description       | Default                 |
| ---------------- | ----------------- | ----------------------- |
| `NODE_ENV`       | Environment mode  | `development`           |
| `PORT`           | Server port       | `4000`                  |
| `DB_HOST`        | PostgreSQL host   | `localhost`             |
| `DB_PORT`        | PostgreSQL port   | `5432`                  |
| `DB_NAME`        | Database name     | `taskmanager`           |
| `DB_USER`        | Database user     | `taskuser`              |
| `DB_PASSWORD`    | Database password | `taskpass`              |
| `JWT_SECRET`     | JWT secret key    | Required                |
| `JWT_EXPIRES_IN` | JWT expiration    | `7d`                    |
| `CORS_ORIGIN`    | Allowed origin    | `http://localhost:3000` |

## Docker

### Build Image

```bash
docker build -t taskmanager-server .
```

### Run Container

```bash
docker run -p 4000:4000 \
  -e DB_HOST=postgres \
  -e JWT_SECRET=your-secret \
  taskmanager-server
```

### With Docker Compose

```bash
# From project root
docker-compose up server
```

## Development

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Database

The server uses Sequelize ORM which will automatically:

- Create database connection
- Sync models (create tables)
- Handle migrations in development mode

### Adding New Endpoints

1. Create controller in `src/controllers/`
2. Create route in `src/routes/`
3. Add validation schema in `src/validators/`
4. Register route in `src/routes/index.ts`

## Architecture

### MVC Pattern

- **Models** (`src/models/`) - Data layer, database schemas
- **Controllers** (`src/controllers/`) - Business logic
- **Routes** (`src/routes/`) - API endpoints

### Middleware Stack

1. **CORS** - Handle cross-origin requests
2. **Body Parser** - Parse JSON requests
3. **Authentication** - Verify JWT tokens
4. **Validation** - Validate request data with Joi
5. **Error Handler** - Centralized error handling

### Authentication Flow

1. User registers/logs in
2. Server validates credentials
3. Server generates JWT token
4. Client stores token
5. Client sends token in Authorization header
6. Server validates token via middleware
7. User ID attached to request

## Security

- Passwords hashed with bcrypt
- JWT for stateless authentication
- Input validation with Joi
- SQL injection protection via Sequelize
- CORS configuration
- Environment variables for secrets

## Error Handling

All errors are handled centrally and return consistent JSON:

```json
{
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

HTTP Status Codes:

- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error
