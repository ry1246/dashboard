import { useQuery } from '@tanstack/react-query'
import { fetchGeocoding, fetchCurrentWeather, fetchHourlyForecast } from '../api/weather'

export function useWeather(city: string) {
  const geocoding = useQuery({
    queryKey: ['weather', 'geocoding', city],
    queryFn: () => fetchGeocoding(city),
    enabled: city.length > 0,
  })

  const location = geocoding.data

  const weather = useQuery({
    queryKey: ['weather', 'current', location?.latitude, location?.longitude],
    queryFn: () => fetchCurrentWeather(location!.latitude, location!.longitude),
    enabled: location != null,
  })

  const hourly = useQuery({
    queryKey: ['weather', 'hourly', location?.latitude, location?.longitude],
    queryFn: () => fetchHourlyForecast(location!.latitude, location!.longitude),
      enabled: location != null,
  })

  return { geocoding, weather, hourly }
}
