import useSWR from 'swr'
import fetcher from '@/util/fetcher'

interface Data {
  data: Player[]
  error: Record<string, any>
  loading: boolean
}
interface Player {
  age: number
  firstname: string
  lastname: string
  player_id: number
  player_name: string
  position: string
  weight: number
  nationality: string
}
export const useGetPlayersByName = (name: string): Data => {
  const { data, error, ...rest } = useSWR(
    name ? `/api/players/by/name/${name}` : null,
    fetcher
  )
  return { data, error, loading: !data && !error, ...rest } as Data
}
