import { useState } from 'react'
import type { FormEvent } from 'react'
import { useGitHubRepos } from './hooks/useGitHubRepos'
import { useWeather } from './hooks/useWeather'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [username, setUsername] = useState('')
  const { data: repos, isLoading, isError, error } = useGitHubRepos(username)

  const [cityInput, setCityInput] = useState('')
  const [city, setCity] = useState('')
  const { geocoding, weather } = useWeather(city)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUsername(input.trim())
  }

  const handleWeatherSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCity(cityInput.trim())
  }

  return (
    <main>
      <h1>GitHub Repos</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="GitHub username"
        />
        <button type="submit">検索</button>
      </form>

      {isLoading && <p>読み込み中...</p>}
      {isError && <p>エラー：{error.message}</p>}

      {repos && (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
              {' '}Stars: {repo.stargazers_count}
              {repo.language && <> / {repo.language}</>}
            </li>
          ))}
        </ul>
      )}
      <h1>天気</h1>
      <form onSubmit={handleWeatherSubmit}>
        <input
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="都市名"
        />
        <button type="submit">検索</button>
      </form>

      {geocoding.isLoading && <p>場所を検索中...</p>}
      {geocoding.isError && <p>エラー：{geocoding.error.message}</p>}
      {city.length > 0 && geocoding.data === null && <p>都市が見つかりませんでした</p>}

      {weather.isLoading && <p>天気を取得中...</p>}
      {weather.isError && <p>エラー：{weather.error.message}</p>}
      {geocoding.data && weather.data && (
        <p>
          {geocoding.data.name} ({geocoding.data.country}) : {weather.data.temperature}°C
        </p>
      )}
    </main>
  )
}

export default App
