import React from 'react'

import Teams from '@/components/Teams'
import Rank from '@/components/Rank'
import CardPlayersStatiscs from '@/components/CardPlayersStatiscs'

import styles from '@/styles/home.module.scss'

export default function index() {
  return (
    <div className={styles.container}>
      <section>
        <Teams />
      </section>
      <section>
        <div className={styles['statiscs-wrapper']}>
          <Rank />
          <CardPlayersStatiscs />
        </div>
      </section>
    </div>
  )
}
