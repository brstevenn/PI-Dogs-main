import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../redux/actions/index'
import TemperamentsCard from './TemperamentsCard/TemperamentsCard';

import './Temperaments.css'

const Temperaments = () => {

	const dispatch = useDispatch()
	const allTemperaments = useSelector(state => state.temperament)

	useEffect(() => {
		dispatch(actions.getAllTemperaments())
	}, [dispatch])

	/*useEffect(() => {
		setTemperaments()
	})*/

	return (
		<div>
			<h1 className="titleTemp" >Temperaments</h1>
			{allTemperaments && allTemperaments.map(item => {
				return (
					<TemperamentsCard key={item.id} name={item.name} />
				)
			})}
		</div>
	)

}

export default Temperaments