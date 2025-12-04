import React from 'react'

interface TagComponentProps {
  content: string
}

const TagComponent: React.FC<TagComponentProps> = ({ content }) => {
  return (
    <div className="flex items-center justify-center px-2 py-1 text-gray-100 text-xs bg-status-info rounded-2xl">
      {content}
    </div>
  )
}

export default TagComponent
