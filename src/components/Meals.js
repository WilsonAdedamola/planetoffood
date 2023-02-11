import React from 'react'
import { useGlobalContext } from '../context'
import {BsHeart} from 'react-icons/bs'

const Meals = () => {

const {meals, loading, selectMeal, addToFavourites } = useGlobalContext()

if(loading){
  return(
    <div className='section'>
      <h4>Loading</h4>
    </div>
  )
}

if(meals.length < 1){
  return(
    <div className='section'>
      <h4>No items match your search</h4>
    </div>
  )
}
  return (
    <div className='section-center'>
      {meals.map((singleMeal)=>{
        const{idMeal, strMeal:title, strMealThumb:image} = singleMeal
        return (
          <div className='single-meal' key={idMeal}>
            <img src={image} className="img" alt="" onClick={()=>selectMeal(idMeal)}/>
            <button className='like-btn' onClick={()=> addToFavourites(idMeal)}><BsHeart /></button>
            <footer>
              <h5>{title}</h5>
              <button className='btn btn-details' onClick={()=>selectMeal(idMeal)}>
                Meal details
              </button>
            </footer>
          </div>
        )
      })}
    </div>
  )
}

export default Meals
