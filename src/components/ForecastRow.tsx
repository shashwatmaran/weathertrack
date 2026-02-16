import { motion } from "framer-motion";
import { type DayForecast, weatherCodeToInfo } from "@/lib/weather-api";
import { format, parseISO } from "date-fns";

interface Props {
  forecast: DayForecast[];
}

export default function ForecastRow({ forecast }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-md mx-auto"
    >
      <h3 className="text-white/60 text-xs uppercase tracking-widest mb-3 px-1">5-Day Forecast</h3>
      <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 divide-y divide-white/10 overflow-hidden shadow-2xl">
        {forecast.map((day, i) => {
          const { icon } = weatherCodeToInfo(day.weatherCode);
          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center justify-between px-5 py-3 text-white"
            >
              <span className="w-20 text-sm font-medium">
                {format(parseISO(day.date), "EEE")}
              </span>
              <span className="text-2xl">{icon}</span>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-white/50">{day.low}°</span>
                <div className="w-20 h-1 rounded-full bg-white/20 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-300 to-orange-300"
                    style={{ width: `${Math.min(100, Math.max(20, ((day.high - day.low) / 30) * 100))}%` }}
                  />
                </div>
                <span className="font-medium">{day.high}°</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
