import { React, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

const AppContext = createContext()

const AppProvider = ({children}) => {

    const getFavouritesFromLocalStorage = () =>{
        let favourites = localStorage.getItem('favourites')
        if(favourites){
            favourites = JSON.parse(localStorage.getItem('favourites'))
        }else{
            favourites = []
        }
        return favourites
    }
    

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favourites, setFavourites] = useState(getFavouritesFromLocalStorage())

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const fetchMeals = async (url) =>{
    setLoading(true)
    try{
        const {data} = await axios(url)
        data.meals ? setMeals(data.meals) : setMeals([])
    }catch (e){
        console.log(e.response)
    }
    setLoading(false)
}

useEffect(()=>{
    fetchMeals(allMealsUrl)
},[])


useEffect(()=>{
    if(!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
},[searchTerm])

const fetchRandonMeal = () => {
    fetchMeals(randomMealUrl)
}

const selectMeal = (idMeal, favouriteMeal) => {
    let meal;
    if(favouriteMeal){
        meal = favourites.find((meal)=> meal.idMeal === idMeal)
    }else{
        meal = meals.find((meal)=>meal.idMeal === idMeal)
    }
    
    setSelectedMeal(meal)
    setShowModal(true)
}

const closeModal = () =>{
    setShowModal(false)
}

const addToFavourites = (idMeal) =>{
    const isfavourite = favourites.find((meal)=> meal.idMeal === idMeal)
    if(isfavourite) return
    const meal = meals.find((meal)=>meal.idMeal === idMeal)
    const updateFavourites = [...favourites, meal]
    setFavourites(updateFavourites)
    localStorage.setItem("favourites", JSON.stringify(updateFavourites))
}

const removeFromFavourites = (idMeal) =>{
    const updateFavourites = favourites.filter((meal)=> meal.idMeal !== idMeal)
    setFavourites(updateFavourites)
    localStorage.setItem("favourites", JSON.stringify(updateFavourites))
}


  return (
    <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandonMeal, showModal, selectMeal, selectedMeal, closeModal, favourites, addToFavourites, removeFromFavourites}}>
        {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export  { AppContext, AppProvider}
