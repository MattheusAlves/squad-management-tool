import React, { useContext} from 'react'

import styles from '@/styles/components/rank.module.scss'
import { RankContext } from '@/contexts/RankContext'

export default function Rank() {
  const { highestAvgAge, lowestAvgAge } = useContext(RankContext)
  return (
    <div className={styles['rank-container']}>
      <div className={styles['rank-header-wrapper']}>
        <span className={styles['rank-header-title']}>Top 5</span>
      </div>
      <div className={styles['rank-header-separator']} />
      <div className={styles['rank-avg-container']}>
        <div className={styles['rank-avg_age-container']}>
          <span>Highest avg age</span>
          {highestAvgAge && (
            <div className={styles['rank-avg_age-wrapper']}>
              {highestAvgAge.map(team => (
                <div className={styles['rank-avg_age']}>
                  <span>{team.name}</span>
                  <span>{team.avg.toFixed(1)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles['rank-avg_age-container']}>
          <span>Lowest avg age</span>
          {lowestAvgAge && (
            <div className={styles['rank-avg_age-wrapper']}>
              {lowestAvgAge.map(team => (
                <div className={styles['rank-avg_age']}>
                  <span>{team.name}</span>
                  <span>{team.avg.toFixed(1)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
