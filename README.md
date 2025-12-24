# 🌦️ Weather Forecast Dashboard

A professional, high-performance weather visualization platform built with Next.js, Radix UI, and advanced data visualization libraries. This application provides real-time weather data, long-term forecasts, historical analysis, and personalized weather recommendations with a stunning "Glassmorphism" design.

![Weather App Preview](https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop)

## ✨ Key Features

- **📍 Real-time Fetching**: Instant weather updates based on location search or geolocation.
- **📊 Advanced Analytics**: Detailed historical weather data visualization using Chart.js.
- **🔮 Multi-day Forecast**: Comprehensive outlook for the coming days with dynamic iconography.
- **💡 Smart Recommendations**: AI-driven suggestions based on current weather conditions (e.g., clothing, activities).
- **🌗 Dark Mode Support**: Fully responsive design with seamless light/dark mode transitions.
- **♿ Accessible UI**: Built on top of Radix UI primitives for maximum accessibility.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm / yarn / pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Visualization**: [Recharts](https://recharts.org/) & [Chart.js](https://www.chartjs.org/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

For a full list of dependencies, see the [Tech Stack Details](docs/tech-stack.md).

## 📖 Documentation

- [Architecture & Design](docs/architecture.md)
- [Technology Stack Breakdown](docs/tech-stack.md)
- [API Reference (Work in Progress)](docs/api.md)

## 🚢 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Built with ❤️ by [Chukwu Chinwendu](https://github.com/chukwuchinwendu)
