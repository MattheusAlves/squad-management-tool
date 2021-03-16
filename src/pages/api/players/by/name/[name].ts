import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function searchPlayers(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { name } = req.query
  try {
    const result = await axios.get(
      `https://api-football-v1.p.rapidapi.com/v2/players/search/${name}`,
      {
        headers: {
          ['x-rapidapi-key']: process.env.API_KEY,
          ['x-rapidapi-host']: process.env.API_HOST
        }
      }
    )
    let data
    if (result?.data?.api?.players && result.data.api.players.length > 6) {
      data = result.data.api.players.slice(0, 6)
    } else {
      data = result.data.api
    }
    res.status(200).json(data)
  } catch (e) {
    res.status(e.status || 400).json({ message: 'Api error' })
  }
}
