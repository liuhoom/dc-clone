'use client'

import { useRef, useState } from 'react'

export default function InputForm() {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // @ts-ignore
  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        ref={inputRef}
      />
      <p>You typed: {inputValue}</p>
      <button onClick={() => console.log(inputRef.current?.value)}>
        click me
      </button>
    </div>
  )
}
