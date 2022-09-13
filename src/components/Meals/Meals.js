import React from 'react';
import AvailableMeals from './AvailableMeals';

import classes from "./Meals.module.css";
import MealsSummary from './MealsSummary';

const Meals = (props) => {
    return (
        <React.Fragment>
            <MealsSummary />
            <AvailableMeals />
        </React.Fragment>
    )
}

export default Meals;