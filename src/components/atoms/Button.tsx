import React from 'react'

interface Props {
  children: string
}

function Button({ children }: Props) {
  return (
    <button className='bg-sky-100 hover:bg-sky-200 px-10 py-2 rounded font-semibold'>
      {children}
    </button>
  )
}

export default Button