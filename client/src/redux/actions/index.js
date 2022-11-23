import axios from 'axios'

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const CREATE_DOG = "CREATE_DOG";
export const DELETE_DOG = "DELETE_DOG";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const GET_DOGS_BY_TEMPERAMENTS = "GET_DOGS_BY_TEMPERAMENTS";
export const SORT_DOGS = "SORT_DOGS";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";

const baseUrl = 'http://localhost:3001'

export const getAllDogs = () => {
	return async function  (dispatch){
        return await axios.get(`${baseUrl}/dogs`)
        .then(async res => {
            await dispatch({
                type: GET_ALL_DOGS,
                payload: res.data
            })
        })
        .catch(err => {console.log(err)})
    }
}

export const getDogsByName = (name) => {
    return async function(dispatch){
        return await axios.get(`${baseUrl}/dogs?name=${name}`)
        .then(res => {
            dispatch({
                type: GET_DOGS_BY_NAME,
                payload: res.data
            })
        })
        .catch(err => {console.log(err)})
    }
}

export const setDog = (dog) => {
    return async function(dispatch){
        return await axios.post(`${baseUrl}/dogs`, dog)
        .then(res => {
            dispatch({
                type: CREATE_DOG,
                payload: dog
            })
        })
        .catch(err => {console.log(err)})
    }
}

export const deletDog = (name) => {
    return function(dispatch){
        return dispatch({
            type: DELETE_DOG,
            payload: name
        })
    }
}

export const getAllTemperaments = () => {
    return async function(dispatch){
        return await axios.get(`${baseUrl}/temperaments`)
        .then(res => {
            dispatch({
                type: GET_ALL_TEMPERAMENTS,
                payload: res.data
            })
        })
        .catch(err => {console.log(err)})
    }
}

export const getDogsByTemperament = (name) => {
    return function(dispatch){
        return dispatch({
            type: GET_DOGS_BY_TEMPERAMENTS,
            payload: name
        })
    }
}

export const sortDogs= (method) => {
    return function(dispatch){
        return dispatch({
            type: SORT_DOGS,
            payload: method
        })
    }
}

export const getDogDetails = (id, db) => {
    console.log(db === "true")
    if(db === "true"){
        return async function(dispatch){
            return await axios.get(`${baseUrl}/dogs/${id}?db=${true}`)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: GET_DOG_DETAILS,
                     payload: [res.data]
                })
            })
            .catch(err => console.log(err))
        }
    } else if(db === "undefined" || db === "false") {
        return async function(dispatch){
            return await axios.get(`${baseUrl}/dogs/${id}?db=${false}`)
            .then(res => {
                dispatch({
                    type: GET_DOG_DETAILS,
                     payload: res.data
                })
            })
            .catch(err => console.log(err))
        }
    }
}
