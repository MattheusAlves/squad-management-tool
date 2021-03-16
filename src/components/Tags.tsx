import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/createTeam.module.scss'

import { AiOutlineClose as Close } from 'react-icons/Ai'
import { validateYupSchema } from 'formik'

export default function Tags({ getTagValue, loadTags = null }) {
  const [tags, setTags] = useState<Array<string>>([])
  const [inputTag, setInputTag] = useState<string>('')

  useEffect(() => {
    const inputTags = document.getElementById('input-tags')
    if (inputTags) {
      inputTags.addEventListener('keydown', handleTags as EventListener)
    }
    return () =>
      inputTags.removeEventListener('keydown', handleTags as EventListener)
  }, [tags])
  
  useEffect(() => {
    if (loadTags) setTags(loadTags)
  }, [loadTags])

  useEffect(() => {
    getTagValue(tags)
  }, [tags])

  const handleTags = (e: KeyboardEvent): void => {
    e.stopPropagation()
    const target = e.target as HTMLInputElement
    if (
      e.key === 'Enter' &&
      target?.value?.length > 1 &&
      target.value.length < 40
    ) {
      e.preventDefault()
      const tag = target.value.trim().toUpperCase()
      if (tags && tags.indexOf(tag) === -1) {
        setTags(tags => [...tags, tag])
      } else if (!tags) {
        setTags([tag])
      }
      setInputTag('')
    }
  }
  const handleRemoveTag = (value: string) => {
    if (tags) {
      let newArray = tags.filter(tag => tag !== value)
      setTags(newArray)
    }
  }
  return (
    <div>
      <label htmlFor="">Tags</label>
      <div className={styles['tags-wrapper']}>
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => (
            <span key={index}>
              {tag}
              <span onClick={() => handleRemoveTag(tag)}>
                <Close className={styles['tags-icons']} />
              </span>
            </span>
          ))}
        <input
          type="text"
          id="input-tags"
          value={inputTag}
          onChange={e => setInputTag(e.target.value)}
        />
      </div>
    </div>
  )
}
