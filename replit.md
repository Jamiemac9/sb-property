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
- July 09, 2025. Implemented production-safe deployment architecture: wrapped Object Storage initialization in async try-catch blocks, added production environment variable validation, implemented fallback server creation for failed route registration, enhanced server binding error handling with proper port conflict detection, improved production vs development environment detection, and added comprehensive error logging throughout the application to prevent deployment crashes
- July 09, 2025. Created fail-safe deployment system: implemented production-safe routes as fallback mechanism, added emergency server mode for critical deployment failures, enhanced process error handling to prevent complete application crashes, isolated Object Storage module imports to prevent initialization failures, and created comprehensive deployment testing infrastructure to ensure production readiness
- August 17, 2025. Implemented comprehensive service pages system: created dedicated detailed service pages for all 7 main services (house clearance, garden clearance, waste removal, commercial work, skip bags, cleaning services, home removals) with individual routing, pricing breakdowns, feature details, and professional layouts. Enhanced navigation with dropdown menus in header and expanded footer with service links. Updated homepage service cards to include "Learn More" buttons linking to detailed pages.
- March 24, 2026. Comprehensive SEO/AEO/GEO improvements: created useSEO hook (client/src/hooks/use-seo.ts) for per-page dynamic title/meta/canonical/OG/JSON-LD; enhanced index.html with full LocalBusiness schema, aggregateRating, openingHours, areaServed; added sitemap.xml and robots.txt; created HomeFAQ accordion with FAQPage schema on homepage; added per-page Service schemas and FAQ sections to house-clearance, garden-clearance, waste-removal, commercial-work, cleaning-services, home-removals pages; fixed H1/H2 heading hierarchy throughout; improved image alt text and added width/height/loading attributes; fixed Car→Sparkles icon in cleaning-services; updated waste-removal H1 to include "Staffordshire & Midlands".