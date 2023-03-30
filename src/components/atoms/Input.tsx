import React from 'react'

interface Props {
  type?: string
  placeholder?: string
  value?: string
  className?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ type = 'text', placeholder, className, value, onChange }: Props) {
  return (
    <input type={type} placeholder={placeholder} className={`border-b-2 pl-2 outline-none ${className}` } />
  )
}

export default Input