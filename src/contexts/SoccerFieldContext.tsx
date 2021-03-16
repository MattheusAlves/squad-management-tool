import SoccerField from '@/components/SoccerField'
import React, { createContext, useState, useEffect } from 'react'

interface SoccerFieldContextData {
  players: Map<number, Player>
  addPlayerToField: (player) => void
  iterablePlayersId: Array<number>
  resetField: () => void
}
interface SoccerFieldProviderProps {
  children: React.ReactNode
}
interface Player {
  id: number
  name: string
  age: number
  nationality: string
}
export const SoccerFieldContext = createContext({} as SoccerFieldContextData)

export function SoccerFieldProvider({
  children
}: SoccerFieldProviderProps): JSX.Element {
  const [players, setPlayers] = useState<Map<number, Player>>(new Map())
  const [iterablePlayersId, setIterablePlayers] = useState<Array<number>>([])
  useEffect(() => {
    const getIterablePlayersIds = () => {
      const playersId = []
      for (let player of players.values()) {
        playersId.push(player.id)
      }
      setIterablePlayers(playersId)
    }
    if (players.size > 0) getIterablePlayersIds()
  }, [players])
  const addPlayerToField = player => {
    setPlayers(prev => new Map([...prev, [player.position, player]]))
  }
  const resetField = (): void => {
    setPlayers(new Map())
    setIterablePlayers([])
  }
  return (
    <SoccerFieldContext.Provider
      value={{ players, addPlayerToField, iterablePlayersId, resetField }}
    >
      {children}
    </SoccerFieldContext.Provider>
  )
}
