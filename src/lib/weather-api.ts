const GEO_BASE = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_BASE = "https://api.open-meteo.com/v1/forecast";

export interface GeoResult {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  weatherCode: number;
}

export interface DayForecast {
  date: string;
  high: number;
  low: number;
  weatherCode: number;
}

export async function searchCities(query: string): Promise<GeoResult[]> {
  if (!query.trim()) return [];
  const res = await fetch(`${GEO_BASE}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
  const data = await res.json();
  return data.results ?? [];
}

export async function fetchWeather(lat: number, lon: number): Promise<{ current: CurrentWeather; forecast: DayForecast[] }> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    forecast_days: "6",
    timezone: "auto",
  });
  const res = await fetch(`${WEATHER_BASE}?${params}`);
  const data = await res.json();

  const current: CurrentWeather = {
    temperature: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    humidity: data.current.relative_humidity_2m,
    windSpeed: Math.round(data.current.wind_speed_10m),
    pressure: Math.round(data.current.surface_pressure),
    weatherCode: data.current.weather_code,
  };

  const forecast: DayForecast[] = data.daily.time.slice(1).map((date: string, i: number) => ({
    date,
    high: Math.round(data.daily.temperature_2m_max[i + 1]),
    low: Math.round(data.daily.temperature_2m_min[i + 1]),
    weatherCode: data.daily.weather_code[i + 1],
  }));

  return { current, forecast };
}

export function weatherCodeToInfo(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "Clear Sky", icon: "☀️" };
  if (code <= 3) return { label: "Partly Cloudy", icon: "⛅" };
  if (code <= 49) return { label: "Foggy", icon: "🌫️" };
  if (code <= 59) return { label: "Drizzle", icon: "🌦️" };
  if (code <= 69) return { label: "Rain", icon: "🌧️" };
  if (code <= 79) return { label: "Snow", icon: "❄️" };
  if (code <= 84) return { label: "Rain Showers", icon: "🌧️" };
  if (code <= 86) return { label: "Snow Showers", icon: "🌨️" };
  if (code <= 99) return { label: "Thunderstorm", icon: "⛈️" };
  return { label: "Unknown", icon: "🌡️" };
}

export function getWeatherGradient(code: number): string {
  if (code === 0) return "from-sky-400 via-blue-500 to-indigo-600";
  if (code <= 3) return "from-blue-400 via-slate-400 to-blue-600";
  if (code <= 49) return "from-gray-400 via-slate-500 to-gray-600";
  if (code <= 69) return "from-slate-500 via-gray-600 to-slate-700";
  if (code <= 79) return "from-slate-300 via-blue-200 to-slate-400";
  if (code <= 86) return "from-gray-300 via-slate-400 to-gray-500";
  return "from-gray-600 via-purple-700 to-gray-800";
}
