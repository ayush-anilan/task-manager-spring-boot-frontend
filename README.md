# Task Manager Frontend

A modern frontend application for managing tasks, built with React, TypeScript, and Vite. This application consumes a Spring Boot backend API to provide a seamless task management experience.

## Features

- View all tasks with filtering by status and priority
- Add new tasks with title, description, priority, and status
- Edit existing tasks
- Delete tasks
- Responsive design with Tailwind CSS
- Real-time updates through API integration

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **State Management**: React hooks (useState, useEffect)
- **Linting**: ESLint with React and TypeScript plugins

## Project Structure

```
src/
├── api/           # API service functions
├── components/    # Reusable UI components
├── pages/         # Page components
├── types/         # TypeScript type definitions
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## API Integration

The frontend communicates with a Spring Boot backend API. API endpoints are configured in `src/api/taskApi.ts`:

- `GET /tasks` - Retrieve all tasks
- `GET /tasks/{id}` - Retrieve a specific task
- `GET /tasks/status/{status}` - Filter tasks by status
- `GET /tasks/priority/{priority}` - Filter tasks by priority
- `POST /tasks` - Create a new task
- `PUT /tasks/{id}` - Update an existing task
- `DELETE /tasks/{id}` - Delete a task

The backend URL is configured via environment variable `VITE_BACKEND_URL` (defaults to `http://localhost:8080`).

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with:
   ```
   VITE_BACKEND_URL=http://localhost:8080
   ```
   (Adjust the URL if your backend runs on a different port or host)
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build locally

## Environment Variables

- `VITE_BACKEND_URL` - URL of the Spring Boot backend API

## Building for Production

To create a production build:
```bash
npm run build
```
The built files will be in the `dist/` directory.

## Development Guidelines

- Follow the existing code style and conventions
- Use functional components with React hooks
- Apply Tailwind CSS utility classes for styling
- Keep API calls in the `api/` service layer
- Define TypeScript interfaces in the `types/` directory
- Write reusable components in the `components/` directory

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.