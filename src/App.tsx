import { useState } from 'react'
import type { FormEvent } from 'react'
import { useGitHubRepos } from './hooks/useGitHubRepos'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [username, setUsername] = useState('')
  const { data: repos, isLoading, isError, error } = useGitHubRepos(username)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUsername(input.trim())
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
    </main>
  )
}

export default App
