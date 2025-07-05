# ResumeAI - AI-Powered Resume Builder

## Overview

ResumeAI is a full-stack web application that allows users to generate professional resumes using AI. The application features a clean, minimal design inspired by Apple's website aesthetics, built with React, TypeScript, and Express.js. Users can create accounts, input prompts describing their experience, and receive AI-generated resume content.

## System Architecture

The application follows a modern full-stack architecture with clear separation of concerns:

- **Frontend**: React SPA with TypeScript, using Vite for development and build tooling
- **Backend**: Express.js server with TypeScript support
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Passport.js with session-based authentication using bcrypt for password hashing
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: React Context API for authentication state, TanStack Query for server state

## Key Components

### Frontend Architecture
- **React Router (wouter)**: Lightweight routing with three main routes (`/auth`, `/dashboard`, `/`)
- **Component Structure**: shadcn/ui components provide a comprehensive UI kit with accessibility built-in
- **Theme System**: Dark/light mode support with CSS variables and context-based theme management
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **API Layer**: TanStack Query for efficient server state management with custom query client

### Backend Architecture
- **Express.js Server**: RESTful API with middleware for logging, error handling, and authentication
- **Authentication System**: Passport.js local strategy with session management and memory store
- **Database Layer**: Drizzle ORM with PostgreSQL, featuring type-safe queries and migrations
- **Storage Abstraction**: Interface-based storage system with in-memory implementation for development

### Data Models
- **Users**: Email-based authentication with hashed passwords, names, and timestamps
- **Resumes**: User-associated resume records with title, content, original prompt, and creation dates

## Data Flow

1. **Authentication Flow**: Users register/login through forms that validate input, hash passwords, and establish sessions
2. **Resume Generation**: Dashboard accepts user prompts with experience level and industry selections
3. **Mock AI Processing**: Current implementation generates structured resume content based on prompt analysis
4. **Data Persistence**: Resume data is stored with user association and can be retrieved for viewing/editing
5. **Session Management**: User state is maintained across page refreshes using session storage

## External Dependencies

### Core Framework Dependencies
- **React 18**: Modern React with hooks and concurrent features
- **Express.js**: Lightweight, flexible Node.js web framework
- **TypeScript**: Type safety across the entire application stack

### Database & ORM
- **PostgreSQL**: Primary database (configured via DATABASE_URL environment variable)
- **Drizzle ORM**: Type-safe database operations with schema generation
- **@neondatabase/serverless**: Serverless-compatible PostgreSQL client

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **shadcn/ui**: High-quality, accessible React components built on Radix UI
- **Radix UI**: Primitive components for complex UI interactions

### Authentication & Security
- **Passport.js**: Flexible authentication middleware for Node.js
- **bcrypt**: Secure password hashing library
- **express-session**: Session management with configurable storage

### Development Tools
- **Vite**: Fast development server and build tool with HMR
- **Drizzle Kit**: Database migration and schema management tools
- **ESBuild**: Fast bundling for production builds

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to static assets in `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js` with external dependencies
3. **Database Setup**: Drizzle migrations ensure schema consistency across environments

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution with hot reloading
- **Production**: Compiled JavaScript with optimized asset serving
- **Database**: Requires DATABASE_URL environment variable for PostgreSQL connection
- **Sessions**: Configurable session secret (defaults provided for development)

### Hosting Considerations
- Static assets served from `dist/public` directory
- API routes prefixed with `/api` for clear separation
- Session store can be configured for production (currently uses memory store)
- Database migrations handled via `db:push` command

## Changelog

```
Changelog:
- July 05, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```