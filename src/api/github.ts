export type GitHubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
  updated_at: string
}

const GITHUB_API_BASE = 'https://api.github.com'

export async function fetchGitHubRepos(user: string): Promise<GitHubRepo[]> {
  const res = await fetch(`${GITHUB_API_BASE}/users/${user}/repos?sort=updated`)
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`)
  }
  return res.json()
}
