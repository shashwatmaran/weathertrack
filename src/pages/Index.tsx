import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CitySearch from "@/components/CitySearch";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import ForecastRow from "@/components/ForecastRow";
import { fetchWeather, getWeatherGradient, type GeoResult, type CurrentWeather, type DayForecast } from "@/lib/weather-api";

const Index = () => {
  const [cityName, setCityName] = useState("");
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [gradient, setGradient] = useState("from-indigo-500 via-purple-500 to-pink-500");

  const handleSelect = async (city: GeoResult) => {
    setCityName(`${city.name}, ${city.country}`);
    setLoading(true);
    try {
      const data = await fetchWeather(city.latitude, city.longitude);
      setCurrent(data.current);
      setForecast(data.forecast);
      setGradient(getWeatherGradient(data.current.weatherCode));
    } catch {
      console.error("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-1000 ease-in-out`}>
      <div className="min-h-screen flex flex-col items-center px-4 py-12 gap-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-3xl font-extralight tracking-wide mb-2"
        >
          Weather
        </motion.h1>

        <CitySearch onSelect={handleSelect} />

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-white/70 mt-12"
            >
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading…
            </motion.div>
          )}

          {!loading && current && (
            <motion.div
              key="weather"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <CurrentWeatherCard data={current} cityName={cityName} />
              {forecast.length > 0 && <ForecastRow forecast={forecast} />}
            </motion.div>
          )}

          {!loading && !current && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="text-white mt-20 text-lg font-light"
            >
              Search for a city to see the weather
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
