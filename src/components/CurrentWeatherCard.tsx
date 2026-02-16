import { motion } from "framer-motion";
import { Droplets, Wind, Gauge, Thermometer } from "lucide-react";
import { type CurrentWeather, weatherCodeToInfo } from "@/lib/weather-api";

interface Props {
  data: CurrentWeather;
  cityName: string;
}

export default function CurrentWeatherCard({ data, cityName }: Props) {
  const { label, icon } = weatherCodeToInfo(data.weatherCode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 text-center text-white shadow-2xl"
    >
      <h2 className="text-2xl font-light tracking-wide mb-1">{cityName}</h2>
      <p className="text-white/60 text-sm mb-6">{label}</p>

      <div className="text-8xl mb-2 leading-none">{icon}</div>
      <div className="text-7xl font-extralight tracking-tighter mb-1">
        {data.temperature}°
      </div>
      <p className="text-white/50 text-sm mb-8">
        Feels like {data.feelsLike}°
      </p>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Droplets, label: "Humidity", value: `${data.humidity}%` },
          { icon: Wind, label: "Wind", value: `${data.windSpeed} km/h` },
          { icon: Gauge, label: "Pressure", value: `${data.pressure} hPa` },
          { icon: Thermometer, label: "Feels like", value: `${data.feelsLike}°` },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 bg-white/10 rounded-2xl p-3">
            <item.icon className="h-5 w-5 text-white/60 shrink-0" />
            <div className="text-left">
              <p className="text-[11px] text-white/50 uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
