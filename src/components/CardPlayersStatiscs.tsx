import React, { useContext } from 'react'
import styles from '@/styles/components/cardPlayersStatiscs.module.scss'
import nameInitials from '@/util/nameInitials'
import { RankContext } from '@/contexts/RankContext'

export default function CardPlayersStatiscs() {
  const { mostPickedPlayer, lessPickedPlayer } = useContext(RankContext)
  
  return (
    <div className={styles['card-players_statiscs-container']}>
      <div className={styles['player-info-container']}>
        <span>Most picked player</span>
        <div className={styles['player-info-wrapper']}>
          <div className={styles['most_picked_player']}>
            <div className={styles['player-info-img']}>
              {mostPickedPlayer?.playerName && (
                <span>{nameInitials(mostPickedPlayer.playerName)}</span>
              )}
            </div>
          </div>
          {mostPickedPlayer?.percentage && (
            <span>{mostPickedPlayer.percentage.toFixed(1)}%</span>
          )}
        </div>
      </div>
      <div className={styles['card-midfield']}>
        <div className={styles['card-midfield-circle']}></div>
      </div>
      <div className={styles['player-info-container']}>
        <span>Less picked player</span>
        <div className={styles['player-info-wrapper']}>
          <div className={styles['player-info-img']}>
            {lessPickedPlayer?.playerName && (
              <span>{nameInitials(lessPickedPlayer.playerName)}</span>
            )}
          </div>
          {lessPickedPlayer?.percentage && (
            <span>{(lessPickedPlayer.percentage).toFixed(1)}%</span>
          )}
        </div>
      </div>
    </div>
  )
}
