import React, { useState, useContext, useEffect } from 'react'
import { useGetPlayersByName } from '@/actions/players'
import ReactLoading from 'react-loading'

import styles from '@/styles/createTeam.module.scss'
import debounce from '@/util/debounce'
import { SoccerFieldContext } from '@/contexts/SoccerFieldContext'

export default function PlayerByName(): JSX.Element {
  const [playerName, setPlayerName] = useState<string>('')
  const { data, error, loading } = useGetPlayersByName(playerName)
  const { iterablePlayersId } = useContext(SoccerFieldContext)

  useEffect(() => {
    if (data && iterablePlayersId) {
      data.forEach(player => {
        if (iterablePlayersId.indexOf(player.player_id) > -1) {
          document.getElementById(`${player.player_id}`).style.display = 'none'
        }
      })
    }
  }, [iterablePlayersId])

  const handleChange = debounce(e => {
    setPlayerName(e.target.value)
  }, 1000)
  const handleDrag = e => {
    e.dataTransfer.setData('id', e.target.id)
    e.dataTransfer.setData('data', e.target.innerText)
  }
  return (
    <div className={styles['search-players-container']}>
      <label>Search players</label>
      <input
        type="text"
        placeholder="insert player name"
        onChange={handleChange}
      />
      {data &&
        data.length &&
        data.map(player => (
          <div
            key={player.player_id}
            id={`${player.player_id}`}
            className={styles['search-card-players-wrapper']}
            draggable={true}
            onDragStart={handleDrag}
          >
            <div className={styles['search-card-name_age-wrapper']}>
              <div className={styles['search-card-name-wrapper']}>
                <span>Name:</span>
                <span>{player.player_name}</span>
              </div>
              <div className={styles['search-card-age-wrapper']}>
                <span>Age:</span>
                <span>{player.age}</span>
              </div>
            </div>
            <div className={styles['search-card-nationality-wrapper']}>
              <span>Nacionality:</span>
              <span>{player.nationality}</span>
            </div>
          </div>
        ))}
      {playerName && loading && (
        <div className={styles['search-card-loading']}>
          <ReactLoading type="cubes" color="#CB255A" width={100} height={60} />
        </div>
      )}
    </div>
  )
}
