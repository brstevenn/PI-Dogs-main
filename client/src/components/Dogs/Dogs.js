import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../redux/actions/index'
import Nav from '../Nav/Nav';
import DogCard from './DogCard/DogCard'
import video from '../Home/Perro.mp4'
import Loader from '../Loader/Loader'


import './Dogs.css'

let idKey = 0

const Dogs= () => {

	
	const dispatch = useDispatch()
	
	const allDogs = useSelector((state => state.dogs))
	const allTemperaments = useSelector(state => state.temperament)
	const [data, setData] = useState()
	const [dataTemp, setDataTemp] = useState()
	const [filterTemp, setFilterTemp] = useState("")
	const [inputName, setInputName] = useState("")
	const [index, setIndex] = useState([2, 3, 4])
	const [mathFloor, setMathFloor] = useState(0)
	const [loader, setLoader] = useState(false)

	useEffect(() => {
		
		async function allData (){
			setLoader(true)
			await dispatch(actions.getAllDogs())
			await dispatch(actions.getAllTemperaments())
			setLoader(false)
		}
		allData()
		
	}, [dispatch])

	useEffect(() => {
		async function allSet(){
			await setData([...allDogs].splice(0, 8))
			await setDataTemp(allTemperaments)
			await setMathFloor(Math.floor(allDogs.length / 8))
		}
		allSet()
	}, [allDogs, allTemperaments])

	async function handleClick(event) {
		event.preventDefault()
		if(event.target.id === "1"){
			await setData([...allDogs].splice(0, 8))
		} else {
			await setData([...allDogs].splice(8 * event.target.id, 8))
		}
	}

	function handleClickPag(event){
		event.preventDefault()
		if(event.target.name === "prev"){
			if(index[2] < 5){
				setIndex([mathFloor - 3, mathFloor - 2, mathFloor - 1])
			} else if(index[0] === 3){
				setIndex([2, 3, 4])
			}else {
				setIndex([index[0] - 3, index[1] - 3, index[2] - 3])
			}
		}
		if(event.target.name === "next"){
			if(index[2] < mathFloor - 2){
			 setIndex([index[0] + 3, index[1] + 3, index[2] + 3])
			} else if(index[2] === mathFloor - 2){
				setIndex([mathFloor - 3, mathFloor - 2, mathFloor - 1 ])
			} else {
				setIndex([2, 3, 4])
			}
		}
	}

	async function handleChange(event){
		event.preventDefault()
		await setInputName(event.target.value)
	}

	async function handleClickFilter(event){
		event.preventDefault()
		await setFilterTemp("")
		await setInputName("")
		if(event.target.id === "1"){
			await dispatch(actions.getDogsByName(inputName))
		} else {
			await dispatch(actions.getAllDogs())
		}
	}
	

	async function filterByTemp(event){
		event.preventDefault()
		setInputName("")
		setFilterTemp(event.target.value)
		await dispatch(actions.getAllDogs())
		if(event.target.value === "All"){
			await dispatch(actions.getAllDogs())
		} else {
			setIndex([2, 3, 4])
			await dispatch(actions.getDogsByTemperament(event.target.value))
		}
	}

	async function sortDogs(event){
		event.preventDefault()
		
		await dispatch(actions.sortDogs(event.target.name))
		await setData([...allDogs].splice(0, 8))
		await setIndex([2, 3, 4])
	}

	const displayNone ={
		display: "none"
	}

	

	return (
		<div className="dogs" >
		{(loader && <Loader/>) || <div>
			<video src={video} autoPlay={true} muted={true} loop={true} poster="./videoperro.mp4" style="z-index: -1;position: fixed;width: 100vw;left: 0;top: 0;"></video>
			<div className="divNav" >
        		<Nav/>
      		</div>
			<div className="filters" >
				<label htmlFor="Submit" >
					<input className="inputByName" onChange={handleChange} value={inputName} type="text" name="filterByName" id="1"/>
					<button className="buttonByName" onClick={handleClickFilter} name="filterByName" id="1">Filter by name</button>
				</label>
				<label className="labelByTemperament" htmlFor="Submit">
					Filter by Temperament:
					<select className="selectByTemperament" name="Filter by Temperament" id="" value={filterTemp} onChange={filterByTemp} >
						<option className="optionByTemperament" value="All">All</option>
						{dataTemp &&  dataTemp.map(item => {
							return (
								item ? <option className="optionByTemperament" key={item.id.toString()} value={item.name} >{item.name}</option> : null
							)
						})}
					</select>
				</label>
				<button className="sortDogs" onClick={sortDogs} name="AlfabeticAZ" >Alfabetic <br></br> A-Z</button>
				<button className="sortDogs" onClick={sortDogs} name="AlfabeticZA" >Alfabetic <br></br> Z-A</button>
				<button className="sortDogs" onClick={sortDogs} name="WeightMinMax" >Weight By <br></br> Min-Max</button>
				<button className="sortDogs" onClick={sortDogs} name="WeightMaxMin" >Weight By <br></br> Max-Min</button>
				<button className="sortDogs" onClick={handleClickFilter} name="resetFilters" id="3">Reset filters</button>	
			</div>
			<div>
				<button className="buttonPag" onClick={handleClick} id={1} >1</button>
				{mathFloor >= 5 ? <button className="buttonPrevNext" onClick={handleClickPag} name="prev" >{"<"}</button> : <div style={displayNone}></div>}
				{mathFloor >= 2 ? <button className="buttonPag" onClick={handleClick} id={index[0]} >{index[0]}</button> : <div style={displayNone}></div>}
				{mathFloor >= 3 ? <button className="buttonPag" onClick={handleClick} id={index[1]} >{index[1]}</button> : <div style={displayNone}></div>}
				{mathFloor >= 4 ? <button className="buttonPag" onClick={handleClick} id={index[2]} >{index[2]}</button> : <div style={displayNone}></div>}
				{mathFloor >= 5 ? <button className="buttonPrevNext" onClick={handleClickPag} name="next" >{">"}</button> : <div style={displayNone}></div>}
				{mathFloor >= 5 ? <button className="buttonPag" onClick={handleClick} id={mathFloor} >{mathFloor}</button> : <div style={displayNone}></div>}		
			</div>
			<div className="cardsContainer" >
				{data && data.map(item => {
						idKey = idKey + 1
						return(
						 item ? <DogCard key={idKey} id={item.id} image={item.image} name={item.name} height={item.height} weight={item.weight} life_span={item.life_span} temperament={item.temperament} db={item.db} /> : <div style={displayNone}></div>
						)
					}
				)}
			</div>
			</div>}
		</div>
	)

}

export default Dogs