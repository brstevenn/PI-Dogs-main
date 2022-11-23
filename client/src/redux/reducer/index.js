import { GET_ALL_DOGS, GET_DOGS_BY_NAME, CREATE_DOG, DELETE_DOG, GET_ALL_TEMPERAMENTS, GET_DOGS_BY_TEMPERAMENTS, SORT_DOGS, GET_DOG_DETAILS } from '../actions/index'

const initialState = {
	dogs: [],
	temperaments: {
		database: [],
	}
}



const rootReducer = (state = initialState, action) => {
	const data = action.payload
	switch (action.type) {
		case GET_ALL_DOGS:
			return {...state, dogs:  data.api.concat(...data.database.map(item => {
				return {
					id: item.id,
					name: item.name,
					height: item.height,
					weight: item.weight,
					image: item.image,
					temperament: item.temperament,
					db: true
				}
			}))};
		case GET_DOGS_BY_NAME:
			return {...state, dogs: data.map(item => {
				if(item){
					return {
						id: item.id,
						name: item.name,
						height: item.height,
						weight: item.weight,
						image: item.image,
						temperament: item.temperament,
					}
				} else {
					return null
				}
			})};
		case CREATE_DOG:
			return {...state, dogs: [state.dogs, data]}
		case DELETE_DOG:
			return {...state, dogs: state.dogs.filter(dog => dog.name !== data)}
		case GET_ALL_TEMPERAMENTS:
			return {...state, temperament: data}
		case GET_DOGS_BY_TEMPERAMENTS:
			return {...state, dogs: state.dogs.filter(dog => dog.temperament ? dog.temperament.includes(data) : null)}
		case SORT_DOGS:
			if(data === "AlfabeticAZ"){
				return {...state, dogs: state.dogs.sort((a, b) => {
  					if (a.name === b.name) {return 0;}
  					if (a.name < b.name) {return -1;}
  					return 1;
				})}
			}
			else if(data === "AlfabeticZA"){
				return {...state, dogs: state.dogs.sort((a, b) => {
  					if (a.name === b.name) {return 0;}
  					if (a.name > b.name) {return -1;}
  					return 1;
				})}
			} else if(data === "WeightMinMax") {
				return {...state, dogs: state.dogs.sort((a, b) => {
					let dataA = a.weight.includes("-") ? a.weight.split("-") :  a.weight.split("–")
					let dataB = b.weight.includes("-") ? b.weight.split("-") :  b.weight.split("–")
					let newDataA = Array.from(dataA, x => Number(x))
					let newDataB = Array.from(dataB, x => Number(x))
  					if (newDataA[0] === newDataB[0]) {return 0;}
  					if (newDataA[0] < newDataB[0]) {return -1;}
  					return 1;
				})}
			} else if (data === "WeightMaxMin") {
				return {...state, dogs: state.dogs.sort((a, b) => {
					let dataA = a.weight.includes("-") ? a.weight.split("-") :  a.weight.split("–")
					let dataB = b.weight.includes("-") ? b.weight.split("-") :  b.weight.split("–")
					let newDataA = Array.from(dataA, x => Number(x))
					let newDataB = Array.from(dataB, x => Number(x))
  					if (newDataA[0] === newDataB[0]) {return 0;}
  					if (newDataA[0] > newDataB[0]) {return -1;}
  					return 1;
				})}
			} else {
				return null
			}
		case GET_DOG_DETAILS:
			return {...state, dogs: [...data]}
		default:
			return state;
	}
}

export default rootReducer