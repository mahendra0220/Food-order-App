import {useState,useEffect} from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';



const AvailableMeals = () => {
  const [Meals ,setMeals]=useState([]);
  const [IsLoding,setIsLodig]=useState(true);
  const [httpsError,setHttpsError]=useState();
  useEffect(()=>{
    const fetchMeals=async()=>{

   const response=await fetch('https://food-order-app-9814e-default-rtdb.firebaseio.com/Meals.json');
   if(!response.ok)
   {
     throw new Error('Somthing went wrong!');
   }
   const responseData= await response.json();
   const loadedMeals=[];
   for(const key in responseData)
   {
loadedMeals.push({
id:key,
name:responseData[key].name,
description:responseData[key].description,
price:responseData[key].price
});
   }
   setMeals(loadedMeals);
   setIsLodig(false);
    };
 fetchMeals().catch(error=>{
  setIsLodig(false);
  setHttpsError(error.message);
 });

  },
  []);


   if(IsLoding)
   {
    return(
    <section className={classes.mealsLoding}>
      <h2>Loding...</h2>
    </section>);
   }
   if(httpsError)
   {
   return ( <section className={classes.error}>
      <h2>{httpsError}</h2>
    </section>); 
   }
  const mealsList = Meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
