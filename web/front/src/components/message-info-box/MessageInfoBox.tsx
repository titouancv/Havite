import React from 'react'
import styles from './message-info-box.module.scss'

interface MessageInfoBoxProps {
  content: string
  type: 'info' | 'success' | 'warning' | 'error'
}

const MessageInfoBoxComponent: React.FC<MessageInfoBoxProps> = ({ content, type }) => {
  const className = `${styles.messageInfoBox} ${styles[type]}`

  return <div className={className}>{content}</div>
}

export default MessageInfoBoxComponent
