import React, { useContext } from 'react'
import styles from '@/styles/createTeam.module.scss'

import { SoccerFieldContext } from '@/contexts/SoccerFieldContext'
import nameInitials from '@/util/nameInitials'

export default function SoccerField() {
  const { addPlayerToField, players } = useContext(SoccerFieldContext)

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    var id = e.dataTransfer.getData('id')
    const position = parseInt(e.currentTarget.id, 10)
    const data = e.dataTransfer
      .getData('data')
      .split('\n')
      .map(value => value.substr(value.indexOf(':') + 1))
    const player = {
      id: id,
      name: data[0],
      age: data[1],
      nationality: data[2],
      position: position
    }
    addPlayerToField(player)
  }
  // e.target.appendChild(document.getElementById(data))
  const handleDragOver = e => {
    e.preventDefault()
  }
  return (
    <div className={styles['football-pitch']}>
      <div className={styles['football-midfield-line']}>
        <div className={styles['football-midfield-circle']} />
      </div>
      <div
        className={styles['football-player-one']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="1"
      >
        <div className={styles['football-player']}>
          {players && players.get(1) ? (
            <span className={styles['football-player-initials']} title={`${players.get(1).name}\n Age: ${players.get(1).age}`}>
              {nameInitials(players.get(1).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
            
          )}
        </div>
      </div>
      <div
        className={styles['football-player-two']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="2"
      >
        <div className={styles['football-player']}>
          {players && players.get(2) ? (
            <span className={styles['football-player-initials']} title={`${players.get(2).name}\n Age: ${players.get(2).age}`}>
              {nameInitials(players.get(2).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
          )}
        </div>
      </div>
      <div
        className={styles['football-player-three']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="3"
      >
        <div className={styles['football-player']}>
          {players && players.get(3) ? (
            <span className={styles['football-player-initials']} title={`${players.get(3).name}\n Age: ${players.get(3).age}`}>
              {nameInitials(players.get(3).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
          )}
        </div>
      </div>
      <div
        className={styles['football-player-four']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="4"
      >
        <div className={styles['football-player']}>
          {players && players.get(4) ? (
            <span className={styles['football-player-initials']} title={`${players.get(4).name}\n Age: ${players.get(4).age}`}>
              {nameInitials(players.get(4).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
          )}
        </div>
      </div>
      <div
        className={styles['football-player-five']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="5"
      >
        <div className={styles['football-player']}>
          {players && players.get(5) ? (
            <span className={styles['football-player-initials']} title={`${players.get(5).name}\n Age: ${players.get(5).age}`}>
              {nameInitials(players.get(5).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
          )}
        </div>
      </div>
      <div
        className={styles['football-player-six']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="6"
      >
        <div className={styles['football-player']}>
          {players && players.get(6) ? (
            <span className={styles['football-player-initials']} title={`${players.get(6).name}\n Age: ${players.get(6).age}`}>
              {nameInitials(players.get(6).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
          )}
        </div>
      </div>
      <div
        className={styles['football-player-seven']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="7"
      >
        <div className={styles['football-player']}>
          {players && players.get(7) ? (
            <span className={styles['football-player-initials']} title={`${players.get(7).name}\n Age: ${players.get(7).age}`}>
              {nameInitials(players.get(7).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
          )}
        </div>
      </div>
      <div
        className={styles['football-player-eight']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="8"
      >
        <div className={styles['football-player']}>
          {players && players.get(8) ? (
            <span className={styles['football-player-initials']} title={`${players.get(8).name}\n Age: ${players.get(8).age}`}>
              {nameInitials(players.get(8).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
          )}
        </div>
      </div>
      <div
        className={styles['football-player-nine']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="9"
      >
        <div className={styles['football-player']}>
          {players && players.get(9) ? (
            <span className={styles['football-player-initials']} title={`${players.get(9).name}\n Age: ${players.get(9).age}`}>
              {nameInitials(players.get(9).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
          )}
        </div>
      </div>
      <div
        className={styles['football-player-ten']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="10"
      >
        <div className={styles['football-player']}>
          {players && players.get(10) ? (
            <span className={styles['football-player-initials']} title={`${players.get(10).name}\n Age: ${players.get(10).age}`}>
              {nameInitials(players.get(10).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
          )}
        </div>
      </div>
      <div
        className={styles['football-player-eleven']}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="11"
      >
        <div className={styles['football-player']}>
          {players && players.get(11) ? (
            <span className={styles['football-player-initials']} title={`${players.get(11).name}\n Age: ${players.get(11).age}`}>
              {nameInitials(players.get(11).name)}
            </span>
          ) : (
            <span className={styles['football-player-add']}>+</span>
          )}
        </div>
      </div>
    </div>
  )
}
