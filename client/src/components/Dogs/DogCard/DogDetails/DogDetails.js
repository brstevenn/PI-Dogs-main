import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from "react-router-dom";
import * as actions from '../../../../redux/actions/index'
import Nav from '../../../Nav/Nav';
import Loader from '../../../Loader/Loader'
import video from '../../../Home/Perro.mp4'
import "./DogDetails.css"


const DogDetails = (props) => {

  const allDogs = useSelector((state => state.dogs))
  const [dog, setDog] = useState()

  const dispatch = useDispatch()
  const location = useLocation()
  let idAndDB = location.search.replace("?","").split("&")
  let id = idAndDB[0].split("=")
  id = id[1]
  let db = idAndDB[1].split("=")
  db = db[1]
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    async function dogDetail(){
      setLoader(true)
      await dispatch(actions.getDogDetails(id, db))
      setLoader(false)
    }
    dogDetail()
  }, [dispatch, location, db, id])

  useEffect(() => {
    async function dogSetDetails(){
      await setDog([...allDogs])
    }
    dogSetDetails()
  }, [allDogs])

  return (
    <div className="dogDetailsContainer" >
      <video src={video} autoPlay={true} muted={true} loop={true} poster="./videoperro.mp4"></video>
      {(loader && <Loader/>) || <div className="divDetails" >
        <div className="divNavDetails" >
          <Nav/>
        </div>
        <div className="dogCardDetails" >
          {dog && dog.map(props => {
            return (
              <div className="cardDetails" key={props.id}>
                <img  className="dogImageDetails" src={props.image} alt={props.name} />
                <h1 className="dogTitleDetails" >Breed: {props.name}</h1>
                <p className="propsP" >Height: {props.height}</p>
                <p className="propsP" >Weight: {props.weight}</p>
                <p className="propsP" >Life Span: {props.life_span}</p>
                <div className="temperamentsContainer" >
                  Temperaments:
                  <p className="temperament" > {
                    typeof props.temperament === "object" ? props.temperament.join(", ") : props.temperament
                  }</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>}
    </div>
  );


};

export default DogDetails;