import { useQuery } from '@tanstack/react-query'
import { fetchGitHubRepos } from '../api/github'

export function useGitHubRepos(user: string) {
  return useQuery({
    queryKey: ['github', 'repos', user],
    queryFn: () => fetchGitHubRepos(user),
  })
}
