import React from 'react'

interface Props {
  children: React.ReactNode
  status?: 'success' | 'error' | 'warning' | 'info'
}

const colorClass = {
  success: 'bg-green-300',
  error: 'bg-red-300',
  warning: 'bg-yellow-200',
  info: 'bg-blue-300',
}

function Alert({ children, status = 'success' }: Props) {
  return (
    <div className={`rounded px-20 py-4 ${colorClass[status]}`}>{children}</div>
  )
}

export default Alert