import React, { useContext } from 'react'
import styles from '@/styles/components/teams.module.scss'
import { MdModeEdit as Edit } from 'react-icons/Md'
import { BiTrash as Trash, BiShareAlt as Share } from 'react-icons/Bi'
import { useRouter } from 'next/router'

import Link from 'next/link'
import { TeamsContext } from '@/contexts/TeamsContext'

export default function Teams() {
  const { teams, handleDelete } = useContext(TeamsContext)
  const router = useRouter()
  return (
    <div className={styles['teams-container']}>
      <div className={styles['teams-header-wrapper']}>
        <span className={styles['teams-header-title']}>My teams</span>
        <span className={styles['teams-header-add']}>
          <Link href="/create/team">
            <a>+</a>
          </Link>
        </span>
      </div>
      <div className={styles['teams-header-separator']} />
      <div className={styles['teams-table-wrapper']}>
        {!teams && (
          <div>
            <span className={styles['not-found-svg-wrapper']}>
              <img src="/images/404.png" className={styles['not-found-svg']} />
            </span>
          </div>
        )}
        <table className={styles['teams-table']}>
          <thead>
            <tr>
              <th>
                <div className={styles['teams-title-wrapper']}>
                  Name
                  <div className={styles['triangle-wrapper']}>
                    <span>▴</span>
                    <span>▾</span>
                  </div>
                </div>
              </th>
              <th>
                <div className={styles['teams-title-wrapper']}>
                  Description
                  <div className={styles['triangle-wrapper']}>
                    <span>▴</span>
                    <span>▾</span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {teams &&
              teams.map((team, index) => (
                <tr key={index}>
                  <td>{team.name}</td>
                  <td>
                    <div className={styles['teams-description-wrapper']}>
                      <span>{team.description}</span>
                      <div
                        className={styles['teams-description-icons-wrapper']}
                      >
                        <span>
                          <Trash onClick={() => handleDelete(index)} />
                        </span>
                        <span>
                          <Share />
                        </span>
                        <span
                          onClick={() =>
                            router.push({
                              pathname: '[operation]/team',
                              query: { operation: 'update', index: index }
                            })
                          }
                        >
                          <Edit />
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
