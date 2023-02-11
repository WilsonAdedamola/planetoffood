import React from 'react'
import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {

const [text, setText] = useState('')
const {setSearchTerm, fetchRandonMeal} = useGlobalContext()

function handleChange(e){
  setText(e.target.value)
}

function handleSubmit(e){
  e.preventDefault()
  if(text){
    setSearchTerm(text)
  }
}

const handleRandomMeal = () => {
  setSearchTerm('')
  setText('')
  fetchRandonMeal()
}

  return (
    <header className='search-container'>
      <div className='logo-container'>
      <h2 className='logo'>Planet of Foods</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" className='form-input' placeholder='Search meal' onChange={handleChange} value={text} />
        <div className='btn-container'>
        <button type='submit' className='btn'>Search</button>
        <button type='button' className='btn btn-hipster' onClick={handleRandomMeal}>Get a random meal</button>
        </div>
      </form>
      
    </header>
  )
}

export default Search
