import React from 'react'

interface MessageInfoBoxProps {
  content: string
  type: 'info' | 'success' | 'warning' | 'error'
}

const typeClasses = {
  info: 'bg-status-info',
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  error: 'bg-status-error',
}

const MessageInfoBoxComponent: React.FC<MessageInfoBoxProps> = ({
  content,
  type,
}) => {
  return (
    <div
      className={`flex items-center justify-start w-full p-3 rounded text-gray-100 ${typeClasses[type]}`}
    >
      {content}
    </div>
  )
}

export default MessageInfoBoxComponent
