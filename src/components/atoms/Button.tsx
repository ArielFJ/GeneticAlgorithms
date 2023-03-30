import React from 'react'

interface Props {
  text: string
}

function Button({ text }: Props) {
  return (
    <button className='bg-sky-100 hover:bg-sky-200 px-10 py-2 rounded font-semibold'>
      {text}
    </button>
  )
}

export default Button