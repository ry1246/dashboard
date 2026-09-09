export type GeocodingResult = {
  latitude: number
  longitude: number
  name: string
  country: string
}

export type CurrentWeather = {
  temperature: number
  weatherCode: number
  time: string
}

export type HourlyForecastPoint = {
  time: string
  temperature: number
}

const GEOCODING_API_BASE = 'https://geocoding-api.open-meteo.com/v1'
const WEATHER_API_BASE = 'https://api.open-meteo.com/v1'

export async function fetchGeocoding(city: string): Promise<GeocodingResult | null> {
  const res = await fetch(
    `${GEOCODING_API_BASE}/search?name=${encodeURIComponent(city)}&count=1&language=ja&format=json`
  )
  if (!res.ok) {
    throw new Error(`Geocoding API error: ${res.status}`)
  }
  const data = await res.json()
  const result = data.results?.[0]
  if (!result) return null

  return {
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    country: result.country,
  }
}

export async function fetchCurrentWeather(latitude: number, longitude: number): Promise<CurrentWeather> {
  const res = await fetch(
    `${WEATHER_API_BASE}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
  )
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`)
  }
  const data = await res.json()

  return {
    temperature: data.current.temperature_2m,
    weatherCode: data.current.weather_code,
    time: data.current.time,
  }
}

export async function fetchHourlyForecast(latitude: number, longitude: number): Promise<HourlyForecastPoint[]> {
  const res = await fetch(
    `${WEATHER_API_BASE}/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_hours=24&timezone=auto`
  )
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`)
  }
  const data = await res.json()

  return data.hourly.time.map((time: string, i: number) => ({
    time,
    temperature: data.hourly.temperature_2m[i],
  }))
}
