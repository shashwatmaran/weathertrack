# ☁️ WeatherTrack

A clean, minimal weather app built with React and TypeScript. Search any city in the world and instantly see current conditions plus a 5-day forecast — all powered by the free [Open-Meteo API](https://open-meteo.com/), no API key required.

![WeatherTrack preview](public/clouds-and-sun.png)

---

## ✨ Features

- 🔍 **City Search** — Debounced autocomplete powered by the Open-Meteo Geocoding API
- 🌡️ **Current Conditions** — Temperature, feels-like, humidity, wind speed, and pressure
- 📅 **5-Day Forecast** — Daily high/low with a visual temperature range bar
- 🎨 **Dynamic Gradients** — Background changes based on current weather conditions (sunny, cloudy, rainy, snowy, etc.)
- 💎 **Glassmorphism UI** — Frosted-glass cards with smooth Framer Motion animations
- 📱 **Responsive** — Works on all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite](https://vitejs.dev/) with SWC |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Animations | [Framer Motion](https://www.framer-motion.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| Weather Data | [Open-Meteo API](https://open-meteo.com/) (free, no key needed) |
| Testing | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| CI/CD | [Jenkins](https://www.jenkins.io/) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/weathertrack.git
cd weathertrack

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🧪 Testing

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

---

## 🏗️ Project Structure

```
weathertrack-main/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── ui/              # Radix UI / shadcn components
│   │   ├── CitySearch.tsx   # Debounced city autocomplete input
│   │   ├── CurrentWeatherCard.tsx  # Current conditions display
│   │   └── ForecastRow.tsx  # 5-day forecast list
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── weather-api.ts   # Open-Meteo API calls & helpers
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── Index.tsx        # Main page
│   │   └── NotFound.tsx     # 404 page
│   ├── App.tsx              # Root component & routing
│   └── main.tsx             # Entry point
├── Jenkinsfile              # CI/CD pipeline definition
├── vite.config.ts
└── tailwind.config.ts
```

---

## ⚙️ CI/CD

This project includes a **Jenkinsfile** that defines a two-stage pipeline:

1. **Install** — Runs `npm install` to restore dependencies
2. **Build** — Runs `npm run build` to produce a production bundle

On success, built JavaScript artifacts are archived with fingerprinting for traceability.

---

## 🌐 API

WeatherTrack uses two endpoints from [Open-Meteo](https://open-meteo.com/) — completely free with no API key:

| Endpoint | Purpose |
|---|---|
| `geocoding-api.open-meteo.com/v1/search` | City name → coordinates |
| `api.open-meteo.com/v1/forecast` | Coordinates → weather data |

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute it.
