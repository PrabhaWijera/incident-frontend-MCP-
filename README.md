# 🎨 Incident Management Frontend

A modern, responsive web application for monitoring and managing system incidents with AI-powered analysis.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [How It Works](#how-it-works)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Configuration](#configuration)

---

## 🎯 Overview

This is a **Next.js-based frontend application** that provides engineers with a unified dashboard to:

- Monitor system incidents in real-time
- View detailed incident information
- Request AI-powered root cause analysis
- Manage and register services
- Filter and search incidents
- Track incident resolution workflows

**Purpose**: Provides an intuitive, modern interface for incident management and monitoring.

---

## 🛠️ Technologies Used

### Core Framework
- **Next.js 16.1.1** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### State Management & Data Fetching
- **React Hooks** - `useState`, `useEffect` for state management
- **Axios** - HTTP client for API calls
- **Client-side rendering** - Real-time data updates

### UI Components
- **Custom Component Library** - Reusable UI components
  - Card, Badge, Button
  - StatsCard, IncidentCard
  - EventSimulator

### Development Tools
- **Turbopack** - Fast bundler (Next.js default)
- **TypeScript** - Type checking
- **ESLint** - Code linting

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Next.js Application              │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │      App Router (App Directory)  │  │
│  │                                  │  │
│  │  / (Dashboard)                   │  │
│  │  /incidents (List)                │  │
│  │  /incidents/[id] (Detail)         │  │
│  │  /services (Service Management)   │  │
│  └──────────────────────────────────┘  │
│                  │                      │
│  ┌───────────────▼───────────────┐    │
│  │      Components               │    │
│  │                                │    │
│  │  • Navigation                 │    │
│  │  • StatsCard                  │    │
│  │  • IncidentCard              │    │
│  │  • EventSimulator            │    │
│  │  • UI Components (Card, etc) │    │
│  └───────────────┬───────────────┘    │
│                  │                      │
│  ┌───────────────▼───────────────┐    │
│  │      API Client (lib/api.ts)  │    │
│  │                                │    │
│  │  • incidentsApi              │    │
│  │  • servicesApi               │    │
│  │  • aiApi                     │    │
│  │  • systemApi                 │    │
│  └───────────────┬───────────────┘    │
│                  │                      │
│  ┌───────────────▼───────────────┐    │
│  │      Backend API              │    │
│  │   (Express.js on :5000)      │    │
│  └───────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Data Flow

```
User Interaction
    ↓
React Component
    ↓
API Client (lib/api.ts)
    ↓
HTTP Request (Axios)
    ↓
Backend API (Express.js)
    ↓
MongoDB Database
    ↓
Response
    ↓
Component State Update (useState)
    ↓
UI Re-render
```

---

## ⚙️ How It Works

### 1. Page Rendering

**Server-Side Rendering (SSR)** for initial load:
- Next.js pre-renders pages at build time
- Fast initial page load
- SEO-friendly

**Client-Side Rendering (CSR)** for dynamic content:
- Real-time data fetching with `useEffect`
- Auto-refresh every 30 seconds
- Interactive UI updates

### 2. State Management

```typescript
// Component state
const [incidents, setIncidents] = useState<Incident[]>([]);
const [loading, setLoading] = useState(true);

// Fetch data
useEffect(() => {
  fetchIncidents();
  const interval = setInterval(fetchIncidents, 30000);
  return () => clearInterval(interval);
}, []);
```

### 3. API Integration

```typescript
// lib/api.ts - Centralized API client
const incidentsApi = {
  getAll: async (filters) => {
    const response = await api.get(`/api/incidents`, { params: filters });
    return response.data;
  },
  // ... other methods
};
```

### 4. Real-Time Updates

- **Auto-refresh**: Polls API every 30 seconds
- **Manual refresh**: User-triggered updates
- **Optimistic updates**: Immediate UI feedback

---

## ✨ Features

### Dashboard (`/`)
- **System Statistics**: Total incidents, open incidents, resolved count
- **Service Count**: Number of monitored services
- **Recent Incidents**: Latest 5 incidents with quick access
- **Event Simulator**: Trigger test incidents
- **Real-time Updates**: Auto-refresh every 30 seconds

### Incidents List (`/incidents`)
- **Incident Cards**: Visual cards with key information
- **Filtering**: By status, severity, category, service
- **Search**: Find specific incidents
- **Pagination**: Handle large incident lists
- **Quick Actions**: Navigate to detail page

### Incident Detail (`/incidents/[id]`)
- **Full Incident Information**: Title, description, metadata
- **Timeline**: Complete event history
- **Logs Viewer**: Associated log entries
- **AI Analysis Section**:
  - Root cause analysis with confidence scores
  - Suggested actions with approval workflow
  - AI model information (NVIDIA NIM)
- **Status Management**: Update incident status
- **Action Buttons**: Run AI analysis, resolve incident

### Services Management (`/services`)
- **Service List**: All registered services
- **Add Service**: Register new services to monitor
- **Service Status**: Enable/disable services
- **Health Testing**: Test service health on demand
- **Service Details**: Category, environment, metadata
- **Delete Services**: Remove services from monitoring

---

## 📁 Project Structure

```
incident-frontend/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Dashboard
│   ├── incidents/
│   │   ├── page.tsx            # Incidents list
│   │   └── [id]/
│   │       └── page.tsx        # Incident detail
│   └── services/
│       └── page.tsx            # Services management
├── components/
│   ├── ui/
│   │   ├── Card.tsx            # Card component
│   │   ├── Badge.tsx           # Badge component
│   │   └── Button.tsx          # Button component
│   ├── StatsCard.tsx           # Statistics card
│   ├── IncidentCard.tsx       # Incident card
│   ├── EventSimulator.tsx      # Event simulator
│   └── Navigation.tsx          # Navigation bar
├── lib/
│   ├── api.ts                  # API client
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Utility functions
├── public/                      # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Application runs on `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### API Configuration

The frontend connects to the backend API. Update `lib/api.ts` if needed:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
```

---

## 🎨 UI Components

### Card
Reusable card component for content containers

### Badge
Status indicators with variants:
- `success` - Green
- `warning` - Yellow
- `error` - Red
- `info` - Blue
- `default` - Gray

### Button
Interactive buttons with variants:
- `primary` - Blue, main actions
- `secondary` - Gray, secondary actions
- `outline` - Outlined style
- `danger` - Red, destructive actions

### StatsCard
Dashboard statistics display with icons

### IncidentCard
Incident summary card with:
- Title and description
- Severity and status badges
- Service name (if available)
- Timestamp and error count

---

## 🔄 Real-Time Features

### Auto-Refresh
- Dashboard: Every 30 seconds
- Incidents list: Every 30 seconds
- Incident detail: Every 30 seconds

### Manual Refresh
- Click "Refresh" button
- Immediate data update

### Optimistic Updates
- Status changes reflected immediately
- API calls in background
- Error handling with rollback

---

## 📱 Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-column grid
- **Desktop**: 3-4 column grid
- **Tailwind CSS**: Responsive utilities

---

## 🔗 Integration Points

### Backend API
- RESTful API endpoints
- JSON data format
- CORS enabled

### Services
- Register services via UI
- Monitor service health
- Link incidents to services

### AI Analysis
- Request AI analysis via button
- Display results with confidence scores
- Show suggested actions

---

## 🎯 Key Features Summary

✅ **Real-time Monitoring** - Auto-refresh every 30 seconds  
✅ **Service Management** - Register and manage services  
✅ **Incident Filtering** - Filter by status, severity, category, service  
✅ **AI Analysis** - Request and view AI-powered root cause analysis  
✅ **Timeline View** - Complete incident event history  
✅ **Logs Viewer** - Associated log entries  
✅ **Status Management** - Update incident status  
✅ **Responsive Design** - Works on all devices  
✅ **Modern UI** - Clean, intuitive interface  

---

**Built with Next.js, React, and TypeScript for modern incident management** 🚀
