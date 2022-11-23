import React from "react";
import * as actions from '../../../redux/actions/index'
import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";

import './DogCard.css'

const DogCard = (props) => {

  const dispatch = useDispatch()

  async function handleClick(event) {
    event.preventDefault()
    await dispatch(actions.deletDog(event.target.name))
  }

  return (
    <div className="dogCard"  > 
      <button className="deleteDog" name={props.name} onClick={handleClick} >x</button>
      <Link  to={`/dogdetails?id=${props.id}&db=${props.db}`} ><img  className="dogImage" src={props.image} alt={props.name} /></Link>
      <h1 className="dogTitle" >Breed: {props.name}</h1>
      <p className="pDog" >Height: {props.height}</p>
      <p className="pDog" >Weight: {props.weight}</p>
      <p className="pDog" >Life Span: {props.life_span}</p>
      <div className="containerTemperaments" >
        Temperaments: 
        <p className="temperament" >{
          typeof props.temperament === "object" ? props.temperament.join(", ") : props.temperament
        }</p>
      </div>
    </div>
  );
};

export default DogCard;