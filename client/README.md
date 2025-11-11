# Task Manager Client

A modern task management application built with Next.js and Clean Architecture principles.

## Overview

This is the frontend client for the Task Manager application. It provides a user-friendly interface for managing tasks with features like creating, updating, deleting, and filtering tasks by status. The application includes authentication functionality for secure user access.

## Architecture

The project follows Clean Architecture principles with clear separation of concerns:

- **Domain Layer**: Contains core business entities (Task, User) and use cases
- **Data Layer**: Handles API communication and repository implementations
- **Presentation Layer**: React components, hooks, and UI logic

## Features

- User authentication (login, signup, logout)
- Create, read, update, and delete tasks
- Filter tasks by status (pending, in progress, completed)
- Responsive design with modern UI components
- Real-time updates and loading states

## Tech Stack

- Next.js 14 with App Router
- TypeScript for type safety
- React for UI components
- Tailwind CSS for styling
- Jest for unit testing

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Project Structure

- `src/app` - Next.js app router pages and layouts
- `src/domain` - Business entities, interfaces, and use cases
- `src/data` - API clients and repository implementations
- `src/presentation` - React components, hooks, and providers
- `__tests__` - Unit tests for domain logic

## Environment Variables

Configure the following environment variables:

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:4000/api)

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```
