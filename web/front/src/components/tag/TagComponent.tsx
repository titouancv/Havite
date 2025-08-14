import React from 'react'
import styles from './tag-component.module.scss'

interface TagComponentProps {
  content: string
}

const TagComponent: React.FC<TagComponentProps> = ({ content }) => {
  return <div className={styles.tagComponent}>{content}</div>
}

export default TagComponent
