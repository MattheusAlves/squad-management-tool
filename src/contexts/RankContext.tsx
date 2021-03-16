import React, { createContext, useState, useEffect, useContext } from 'react'
import { TeamsContext } from '@/contexts/TeamsContext'

interface RankContextData {
  highestAvgAge: Array<Record<string, number>>
  lowestAvgAge: Array<Record<string, number>>
  mostPickedPlayer: Record<string, any>
  lessPickedPlayer: Record<string, any>
}
interface RankProviderProps {
  children: React.ReactNode
}
interface RankProps {}
export const RankContext = createContext({} as RankContextData)
interface playersAge {}
export function RankProvider({ children }: RankProviderProps): JSX.Element {
  const [highestAvgAge, setHighesAvgAge] = useState<
    Array<Record<string, any>>
  >()
  const [lowestAvgAge, setLowestAvgAge] = useState<Array<Record<string, any>>>()
  const [mostPickedPlayer, setMostPickedPlayer] = useState<
    Record<string, any>
  >()
  const [lessPickedPlayer, setLessPickedPlayer] = useState<
    Record<string, any>
  >()
  const { teams } = useContext(TeamsContext)
  useEffect(() => {
    if (teams && teams.length > 1) {
      setAvgAge()
      setPickedPlayers()
    }
  }, [teams])

  const setAvgAge = () => {
    const ageAvgByTeam = teams.map(team => {
      let avg = 0
      for (let player of team.players.values()) {
        if (player.age) {
          avg = avg + parseInt(player.age, 10)
        }
      }
      return {
        name: team.name,
        avg: avg / team.players.size
      }
    })
    const ageAvgSorted = ageAvgByTeam.sort(
      (acumulator, current) => acumulator.avg - current.avg
    )
    setLowestAvgAge(
      ageAvgSorted.slice(0, Math.round((ageAvgSorted.length - 1) / 2))
    )
    setHighesAvgAge(
      ageAvgSorted.slice(Math.round((ageAvgSorted.length - 1) / 2))
    )
  }

  const setPickedPlayers = () => {
    let repeatedValues = {}
    let playersQuantity: number = 0
    let notRepeatedValues = {}
    teams.forEach((team, index) => {
      playersQuantity += team.players.size
      for (let playerOne of team.players.values()) {
        if (teams[index + 1]) {
          for (let playerTwo of teams[index + 1].players.values()) {
            if (playerOne.id === playerTwo.id) {
              if (repeatedValues[playerOne.id]) {
                repeatedValues[playerOne.id] = {
                  playerName: playerOne.name,
                  count: repeatedValues[playerOne.id].count + 1
                }
              } else
                repeatedValues[playerOne.id] = {
                  playerName: playerOne.name,
                  count: 2
                }
            }
          }
        }
      }
    })
    teams.forEach(team => {
      for (let player of team.players.values()) {
        if (Object.keys(repeatedValues).indexOf(player.id) === -1) {
          notRepeatedValues[player.id] = {
            playerName: player.name
          }
        }
      }
    })
    let sortable = []
    for (let player in repeatedValues) {
      sortable.push([
        player,
        repeatedValues[player].count,
        repeatedValues[player].playerName
      ])
    }
    let orderedPlayers = sortable.sort((a, b) => b[1] - a[1])
    if (orderedPlayers && orderedPlayers.length) {
      let lessPicked
      let mostPicked = {
        playerName: orderedPlayers[0][2],
        playerId: orderedPlayers[0][0],
        count: orderedPlayers[0][1]
      }
      const mostPickedPlayerPercentage =
        (mostPicked.count / playersQuantity) * 100
      if (notRepeatedValues && Object.keys(notRepeatedValues).length > 0) {
        lessPicked = notRepeatedValues[Object.keys(notRepeatedValues)[0]]
      } else {
        lessPicked = orderedPlayers[orderedPlayers.length - 1]
      }
      const lessPickedPlayerPercentage = lessPicked.count
        ? (lessPicked.count / playersQuantity) * 100
        : (1 / playersQuantity) * 100
      if (
        mostPicked &&
        lessPicked &&
        mostPickedPlayerPercentage &&
        lessPickedPlayerPercentage
      ) {
        setMostPickedPlayer({
          ...mostPicked,
          percentage: mostPickedPlayerPercentage
        })
        setLessPickedPlayer({
          ...lessPicked,
          percentage: lessPickedPlayerPercentage
        })
      }
    }
  }
  return (
    <RankContext.Provider
      value={{
        highestAvgAge,
        lowestAvgAge,
        mostPickedPlayer,
        lessPickedPlayer
      }}
    >
      {children}
    </RankContext.Provider>
  )
}
