import React from 'react'
import { useGlobalContext } from '../context'

const Favourites = () => {

  const { favourites, selectMeal, removeFromFavourites } = useGlobalContext()

  return (
    <section className='favourites'>
      <div className='favourites-content'>
        <h5>Favourite Meals</h5>
        <div className='favourites-container'>
          {favourites.map((item)=>{
            const {idMeal, strMealThumb:image} = item;
            return (
              <div className='favourite-item' key={idMeal}>
                <img src={image} className='favourites-img img' onClick={()=> selectMeal(idMeal, true)}/>
                <button className='remove-btn' onClick={()=>removeFromFavourites(idMeal)}>Remove</button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Favourites
