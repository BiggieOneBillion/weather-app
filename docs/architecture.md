# Architecture & Project Structure

This document describes the architectural patterns, data flow, and organization of the Weather Forecast application.

## Directory Structure

```text
weather-app/
├── app/                  # Next.js App Router root
│   ├── api/              # API routes (Backend logic)
│   ├── globals.css       # Global styles & Tailwind directives
│   ├── layout.tsx        # Root layout with ThemeProvider
│   └── page.tsx          # Main entry point (Weather Dashboard)
├── components/           # UI Components
│   ├── ui/               # Radix UI + Tailwind base components
│   ├── weather-dashboard.tsx # Orchestrator component
│   ├── weather-display.tsx   # Current weather visualization
│   └── ...               # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, types, and constants
├── public/               # Static assets (images, icons)
└── types/                # Shared TypeScript types
```

## Architectural Patterns

### Orchestrator Component
The `WeatherDashboard` component acts as the main orchestrator, managing the state and coordinating data between specialized display components like `ForecastDisplay`, `WeatherHistoryAnalysis`, and `WeatherRecommendations`.

### UI Component Layer
Most UI elements are built on top of [Radix UI](https://www.radix-ui.com/) primitives, ensuring accessibility and a consistent design language. These are located in `components/ui`.

### Data Flow
- **Input**: Users search for a location or use geolocation.
- **Fetch**: Data is fetched via API routes in `app/api` or directly from client-side hooks.
- **State**: React state (or specialized hooks) manages the current weather context.
- **Visualization**: Data is piped into Recharts/Chart.js components for graphical representation.

### Styling
The application uses a "Glassmorphism" aesthetic with vibrant gradients and subtle shadows, fully supporting both light and dark modes through `next-themes`.
