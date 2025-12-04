import React from 'react'

interface InputProps {
  type: 'text' | 'password' | 'email' | 'number'
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
}) => {
  return (
    <div className="w-full p-3 border border-gray-300 rounded text-base bg-gray-200 transition-colors text-gray-800 focus:outline-none focus:border-gray-900 focus:bg-gray-100">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default Input
