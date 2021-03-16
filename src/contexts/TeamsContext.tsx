import React, { createContext, useState, useContext } from 'react'
import { SoccerFieldContext } from '@/contexts/SoccerFieldContext'

interface TeamsContextData {
  teams: TeamProps[] | null
  changeState: (obj: TeamProps) => void
  handleUpdate: (number, TeamProps) => void
  handleDelete: (number) => void
}
interface TeamsProviderProps {
  children: React.ReactNode
}
interface TeamProps {
  name: string
  description: string
  website: string
  tags: Array<string>
  teamType: string
  formation: string
  players: Map<number, Record<string, any>>
}
export const TeamsContext = createContext({} as TeamsContextData)

export function TeamsProvider({ children }: TeamsProviderProps): JSX.Element {
  const [teams, setTeams] = useState<TeamProps[]>()
  const { players, resetField } = useContext(SoccerFieldContext)

  const changeState = (obj: TeamProps): void => {
    if (obj) {
      teams
        ? setTeams(teams => [...teams, { ...obj, players }])
        : setTeams([{ ...obj, players }])

      resetField()
    }
  }
  const handleUpdate = (index, values) => {
    teams[index] = { ...values, players }
    setTeams([...teams])
  }
  const handleDelete = index => {
    teams.splice(index, 1)
    setTeams([...teams])
  }
  return (
    <TeamsContext.Provider
      value={{ teams, changeState, handleUpdate, handleDelete }}
    >
      {children}
    </TeamsContext.Provider>
  )
}
