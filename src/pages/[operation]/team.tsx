import React, { useState, useContext } from 'react'
import styles from '@/styles/createTeam.module.scss'
import { Formik, Form, ErrorMessage } from 'formik'
import { useRouter } from 'next/router'

import { TeamsContext } from '@/contexts/TeamsContext'

import SoccerField from '@/components/SoccerField'
import Tags from '@/components/Tags'
import PlayerByName from '@/components/PlayerByName'

export default function team() {
  const [tag, setTag] = useState<string[]>()
  const { changeState, teams, handleUpdate } = useContext(TeamsContext)
  const router = useRouter()
  const { operation } = router.query
  const index = (router.query.index as unknown) as number

  const getTagValue = (value: string[]) => {
    setTag(value)
  }
  const initialState = () => {
    if (teams && teams[index]) {
      return { ...teams[index] }
    }
    return {
      name: '',
      description: '',
      website: '',
      teamType: '',
      tags: [],
      formation: '',
      players: null
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles['header-wrapper']}>
        <span>Create your team</span>
        <div className={styles['header-separator']} />
      </div>
      <Formik
        initialValues={initialState()}
        validate={values => {
          const errors = {}
          if (!values.website) {
            errors.website = 'Required'
          } else if (
            !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
              values.website
            )
          ) {
            errors.website = 'Invalid email address'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          values.tags = tag
          if (operation == 'update') {
            handleUpdate(index, values)
          } else {
            changeState(values)
          }
          router.push('/')
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <div className={styles['form-wrapper']}>
            <span className={styles['section-title']}>Team Information</span>
            <Form className={styles['form']}>
              <div className={styles['form-grid']}>
                <div className={styles['form-grid-left-wrapper']}>
                  <label htmlFor="">Team name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="insert team name"
                    required
                    onChange={handleChange}
                    value={values.name}
                  />
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    className={styles['team-description']}
                    onChange={handleChange}
                    required
                    value={values.description}
                  ></textarea>
                </div>
                <div className={styles['form-grid-right-wrapper']}>
                  <label htmlFor="website">Team website</label>
                  <input
                    name="website"
                    type="text"
                    placeholder="http://myteam.com"
                    onChange={handleChange}
                    required
                    className={errors.website ? styles['red-border'] : ''}
                    value={values.website}
                  />

                  <label htmlFor="">Team type</label>
                  <div className={styles['team-type-wrapper']}>
                    <div className={styles['team-type']}>
                      <input
                        type="radio"
                        name="teamType"
                        value="real"
                        onChange={handleChange}
                        checked={values.teamType === 'real'}
                      />
                      <label htmlFor="real">Real</label>
                    </div>
                    <div className={styles['team-type']}>
                      <input
                        type="radio"
                        name="teamType"
                        value="fantasy"
                        onChange={handleChange}
                        checked={values.teamType === 'fantasy'}
                      />
                      <label htmlFor="fantasy">Fantasy</label>
                    </div>
                  </div>
                  <Tags getTagValue={getTagValue} loadTags={values.tags} />
                </div>
              </div>
              <span className={styles['section-title']}>Configure Squad</span>
              <div className={styles['form-grid']}>
                <div className={styles['form-grid-left-wrapper']}>
                  <div className={styles['formation-wrapper']}>
                    <label htmlFor="formation">Formation</label>
                    <select onChange={handleChange} name="formation">
                      <option value="3-2-2-3">3 - 2 - 2 - 3</option>
                      <option value="3-2-3-1">3 - 2 - 3 - 1</option>
                      <option value="3-4-3">3 - 4 - 3</option>
                      <option value="3-5-2">3 - 5 - 2</option>
                      <option value="4-2-3-1">4 - 2 - 3 - 1</option>
                      <option value="4-3-1-1">4 - 3 - 1 - 1</option>
                      <option value="4-3-2">4 - 3 - 2 </option>
                      <option value="4-4-2">4 - 4 - 2</option>
                      <option value="4-5-2">4 - 5 - 2</option>
                      <option value="5-4-1">5 - 4 - 1</option>
                    </select>
                  </div>
                  <SoccerField />
                  <button
                    type="submit"
                    className={styles['save_button']}
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </div>
                <div
                  className={`${styles['form-grid-right-wrapper']} ${styles['search-players-wrapper']}`}
                >
                  <PlayerByName />
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
}
