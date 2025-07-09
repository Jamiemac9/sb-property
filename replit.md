# SB Property Clearance - Business Website

## Overview

This is a modern React single-page application for SB Property Clearance, a UK-based property clearance business. The application is built with Vite, React, and TypeScript, featuring a professional design with a green and white color scheme. It includes a backend API for handling callback requests and uses a modern tech stack optimized for performance and user experience.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **Validation**: Zod for schema validation

## Key Components

### Frontend Components
- **Header**: Sticky navigation with mobile-responsive menu
- **Hero**: Full-screen hero section with background image and CTAs
- **TrustBar**: Trust indicators and partner logos
- **Services**: Grid layout showcasing core services
- **HowItWorks**: 3-step process explanation
- **Location**: Google Maps integration with business location and customer reviews
- **Footer**: Contact form and company information

### Backend Components
- **API Routes**: RESTful endpoints for callback requests
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Database Schema**: User and callback request tables
- **Middleware**: Request logging and error handling

## Data Flow

1. **User Interaction**: Users browse the website and fill out callback request forms
2. **Form Submission**: Client-side validation using React Hook Form and Zod
3. **API Request**: POST request to `/api/callback` endpoint
4. **Server Processing**: Express server validates data and stores in database
5. **Response**: Success/error response sent back to client
6. **UI Feedback**: Toast notifications inform users of submission status

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with Radix UI components
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React icons
- **Date Handling**: date-fns library
- **Carousel**: Embla Carousel for interactive components
- **Maps**: Google Maps API with React Google Maps library

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Store**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution

### Development Tools
- **Replit Integration**: Cartographer plugin for Replit development
- **Error Overlay**: Runtime error modal for development
- **Hot Reload**: Vite HMR for fast development cycles

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` - Runs both frontend and backend in development mode
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution with auto-restart

### Production Build
- **Frontend Build**: `vite build` - Creates optimized static assets
- **Backend Build**: `esbuild` - Bundles server code for production
- **Output**: `dist/` directory with both client and server builds

### Production Deployment
- **Command**: `npm start` - Runs production server
- **Static Files**: Express serves built frontend from `dist/public`
- **Database**: Requires DATABASE_URL environment variable
- **Session Secret**: Requires SESSION_SECRET for security

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 06, 2025. Initial setup
- July 06, 2025. Added Google Maps integration with location section and customer reviews display
- July 06, 2025. Enhanced quote form with UK postcode lookup and WhatsApp integration for direct quote submissions
- July 06, 2025. Implemented comprehensive customer support system with real UK address lookup, AI chatbot, and multi-channel contact integration (WhatsApp: 07753226214)
- July 06, 2025. Fixed Object Storage initialization error by adding environment checks and graceful fallback to base64 encoding for development
- July 09, 2025. Enhanced Object Storage error handling to prevent deployment crashes - wrapped initialization in try-catch, added fallback mechanisms, improved error handling in upload/retrieval endpoints, and added health check endpoint for deployment monitoring
- July 09, 2025. Applied comprehensive deployment fixes: added process error handlers for uncaught exceptions, improved Object Storage production environment checks, enhanced health check endpoint with detailed monitoring data, added server startup status tracking, implemented graceful shutdown handling, and improved error handling throughout the application to prevent crashes in production