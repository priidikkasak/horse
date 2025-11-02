# Horse Stable Management Platform

A modern, minimalist web application for managing horse stables efficiently. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Horse Registry
- Complete horse profiles with detailed information
- Medical records tracking
- Vaccination schedules with due dates
- Training notes and performance tracking
- Individual horse detail pages

### Trainer Management
- Trainer profiles with specialties
- Contact information management
- Availability tracking

### Schedule Management
- Training lesson scheduling
- Real-time availability viewing
- Date-based lesson filtering
- Client booking information

### Analytics Dashboard
- Occupancy rate tracking
- Revenue metrics (monthly and total)
- Lesson count statistics
- Horse utilization rates with visual indicators

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: Minimalist, clean design

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

The project is already set up and ready to run.

### Running the Application

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Other Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── dashboard/    # Analytics dashboard
│   ├── horses/       # Horse registry
│   ├── trainers/     # Trainer management
│   └── schedule/     # Lesson scheduling
├── components/       # Reusable React components
├── lib/             # Utility functions and data
│   ├── data.ts      # Mock data store
│   └── analytics.ts # Dashboard calculations
└── types/           # TypeScript type definitions
```

## Current Implementation

This is a simplified MVP with:
- Mock data (no database required)
- Client-side rendering for interactive features
- Minimalist UI design
- Core features for stable management

## Future Enhancements

Potential areas for expansion:
- Database integration (PostgreSQL, MySQL, or MongoDB)
- User authentication and roles
- Online booking system for clients
- Payment processing
- Mobile responsive improvements
- Real-time notifications
- File uploads for documents/photos
- Reporting and export features
- Calendar integrations

## Pages

- `/` - Home page with feature overview
- `/horses` - Horse registry list
- `/horses/[id]` - Individual horse details
- `/trainers` - Trainer list
- `/schedule` - Lesson schedule
- `/dashboard` - Analytics and metrics
