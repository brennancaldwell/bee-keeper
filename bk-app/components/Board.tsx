import React, { useState } from 'react'

type BoardProps = {
  onClick: any
}

function Board({ onClick }: BoardProps) {
  const [ data, setData ] = useState('')

  return (
    <div onClick={onClick}>
        hi
    </div>
  )
}

export default Board;