import React from "react";
import * as actions from '../../../redux/actions/index'
import {useDispatch} from 'react-redux'
//import './DogCard.css'

const TemperamentsCard = (props) => {

  const dispatch = useDispatch()

  return (
    <div className="temperamentsCard" > 
      <p>{props.name}</p>
    </div>
  );
};

export default TemperamentsCard;