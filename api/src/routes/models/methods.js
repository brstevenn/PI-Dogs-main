const { Dog, Temperament } = require('../../db.js');
require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env;
const {validateDog, dataSearch, temperamentValidate, validID, validDB, validName, validNameSpace} = require('./validations.js')

const imageBaseUrl = "https://cdn2.thedogapi.com/images/"

const getDataApi = async () => {
	const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`) 
	if(api.data) {
		const data = api.data.map(item => {
			return {
				id: item.id,
				name: item.name,
				height: item.height.imperial,
				weight: item.weight.imperial,
				life_span: item.life_span,
				image: item.image.url,
				temperament: item.temperament
			}
		})
		return data
	} else {
		throw new Error('Data Api not found')
	}
}

const getDataDB = async () => {
	const dog = await Dog.findAll({
		include: {
			model: Temperament,
			attributes: ['name']
		}
	})
	if(dog){
		let dogData = dog
		dogData = dog.map(item => {
			return {
				id: item.id,
				name: item.name,
				height: item.height,
				weight: item.weight,
				life_span: item.life_span,
				image: item.image,
				temperament: item.temperaments.map(name => name.name)
			}
		})
		return dogData
	} else {
		throw new Error('Dog not found')
	}
}

const getAllData = async () => {
	const dataDB = await getDataDB()
	const dataApi = await getDataApi()
	const allData = dataSearch(dataDB, dataApi)
	if(allData){
		return allData
	} else {
		throw new Error('Data not found')
	}
}

const setDataDB = async (name, height, weight, life_span, image, temperament) => {
	const validateDates = validateDog(name, height, weight, life_span, image, temperament)
	const [dog, created] = await Dog.findOrCreate({
			where: {name: validateDates.name},
			defaults: {
				name: validateDates.name, 
				height: validateDates.height, 
				weight: validateDates.weight, 
				life_span: validateDates.life_span, 
				image: validateDates.image
			}
	})
	if(created){
		const allTemperaments = temperament.map(async item => {
			if(item[0].includes(' ')){
				item = item.replace(item[0], '')
			}
			const newItem = temperamentValidate(item)
			const [temperaments, created] = await Temperament.findOrCreate({
				where: {name: newItem},
				defaults: {name: newItem}
			})
			await dog.addTemperament(temperaments, {through: {temperaments}})
		})
		return `Dog ${name} is created success`
	} else {
		throw new Error(`Dog ${name} exist`)
	}
}

const getDogByName = async (name) => {
	name = validNameSpace(name)
	name = validName(name)

	let allDogs;

	const getDog = await Dog.findAll({
		include: {
			model: Temperament,
			attributes: ['name']
		}
	})
	//const getDogApi = await getDataApi()
	const getDogApiName = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
	//const filterDog = await getDogApi.filter(item => item.name === name) 
	if(getDog ||getDogApiName ) {
		let dogData = getDog.map(item => {
			return {
				id: item.id,
				name: item.name,
				height: item.height,
				weight: item.weight,
				life_span: item.life_span,
				image: item.image,
				temperament: item.temperaments.map(name => name.name)
			}
		})
		let dogFilter =  dogData.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
	
		let dogApiData = getDogApiName.data.map(data => {
			if(data.reference_image_id){
				return {
					id: data.id,
					name: data.name,
					height: data.height.imperial,
					weight: data.weight.imperial,
					life_span: data.life_span,
					image: `${imageBaseUrl}${data.reference_image_id}.jpg`,
					temperament: data.temperament
				}
			}
		})
		return dogApiData.concat(dogFilter)
	}else {
		throw new Error(`Dog ${name} not found`)
	}
}

const getDogById = async (id, db) => {
	console.log(db)
	id = parseInt(id)
	db = validDB(db)
	console.log(db)
	if(db) {
		const getDogDB = await Dog.findOne({
			where: {id},
			include: {
				model: Temperament,
				attributes: ['name']
			}
		})
		if(getDogDB) {
			let getDogByDB = {
				id: getDogDB.dataValues.id,
				name: getDogDB.dataValues.name,
				height: getDogDB.dataValues.height,
				weight: getDogDB.dataValues.weight,
				life_span: getDogDB.dataValues.life_span,
				image: getDogDB.dataValues.image,
				temperament: getDogDB.dataValues.temperaments.map(data => data.name)
			}
			return getDogByDB
		} else {
			throw new Error('Dog not found in DB')
		}
	} else {
		const getDogApi = await getDataApi()
		const filterDog = getDogApi.filter(item => item.id === id)
		if(filterDog.length) {
			return filterDog
		} else {
			throw new Error('Dog not found in Api')
		}
	}
}

const deleteDog = async (id) => {
	id = validID(id)
	if(parseInt(id)){
		const dog = await Dog.destroy({
			where: {id}
		})
		return 'Dog delete success'
	} else {
		throw new Error('Data is incomplete or invalid')
	}
}

const updateDog  = async (id, name, height, weight, life_span, image, temperament) => {
	const dogDates = validateDog(name, height, weight, life_span, image)
	if(id && dogDates !== 'Data is not valid'){
		const dog = await Dog.findByPk(id)
		if(dog) {
			const temperamentMap = temperament.map(async item => {
				item = temperamentValidate(item)
				const [temperaments, created] = await Temperament.findOrCreate({
					where: {name: item},
					defaults: {name: item}
				})
				await dog.addTemperament(temperaments, {through: {temperaments}})
			})
			dog.name = name
			dog.height = height
			dog.weight = weight 
			dog.life_span = life_span
			dog.image = image
			await dog.save()
			return `Dog ${dog.name} is update`
		} else {
			throw new Error(`Dog ${name} is not found`)
		}
	} else {
		throw new Error('Data is insuficient')
	}
}

const getTemperaments = async () => {
	const getDataFromApi = await getDataApi()
	let newDate = []
	let data = getDataFromApi.map(item => {
		if(item.temperament){
			const values = item.temperament.split(',')
			if(values){
				values.map(temperament => {
					if(temperament[0].includes(' ')){
						temperament = temperament.replace(' ', '')
					}
					newDate.push(temperament)
				})
			}
		}
	})
	if(newDate){
		let result = newDate.filter((item,index)=>{
      		return newDate.indexOf(item) === index;
    	})
		result.map(async value => {
			if(value){
				const [temperament, created] = await Temperament.findOrCreate({
					where: {name: value},
					defaults: {name: value}
				})
			}
		})
		const getTemperamentsByDB = await Temperament.findAll()
		getTemperamentsByDB
		return getTemperamentsByDB
	} else {
		throw new Error('Internal server error')
	}
}

const setTemperament = async (name) => {
	name = temperamentValidate(name)
	if(name){
		const [temperaments, created] = await Temperament.findOrCreate({
			where: {name},
			defaults: {name}
		})
		if(created) {
			return `Temperament ${name} is created success`
		} else {
			return `Temperament ${name} exist`
		}
	} else {
		throw new Error('Data is incomplete or invalid')
	}
}

const getTemperamentByID = async (id) => {
	id = validID(id)
	if(parseInt(id)){
			const getTemperamentByDB = await Temperament.findOne({
				where: {id},
				attributes: ['name'],
				include: {
					model: Dog
				}
			})
			if(getTemperamentByDB){
				const getTemperamentByApi = await getDataApi()
				const findTemperament = getTemperamentByApi.filter(item => {
					if(item.temperament){
						if(item.temperament.includes(getTemperamentByDB.name)){
							return item
						}
					}
				})
				const mapTemperamentDB = getTemperamentByDB.dogs.map(date => {
					return {
						id: date.id,
						name: date.name
					}
				})
				const mapTemperament = findTemperament.map(data => {
					return {
						id: data.id,
						name: data.name
					}
				})
				return {
					temperament: getTemperamentByDB.name,
					dogs: {
						database: 	mapTemperamentDB, 
						api: mapTemperament
					}
				}
			} else {
				throw new Error('Temperament is not found')
			}
	} else {
		throw new Error('Data is incomplete or invalid')
	}
}

const getTemperamentByName = async (name) => {
	name = validNameSpace(name)
	name = validName(name)
	if(name.length){
		const getTemperament = await Temperament.findOne({
			where: {name},
			attributes: ['name'],
			include: {
				model: Dog,
			}
		})
		if(getTemperament) {
			const getTemperamentName = await getDataApi()
			const findTemperament = getTemperamentName.filter(item => {
				if(item.temperament){
					if(item.temperament.includes(name)){
						return item
					}
				}
			})
			const mapTemperamentDB = getTemperament.dogs.map(date => {
				return {
					id: date.id,
					name: date.name
				}
			})
			const mapTemperament = findTemperament.map(data => {
				return {
					id: data.id,
					name: data.name
				}
			})
			return {
				temperament: name,
				dogs: {
					database: 	mapTemperamentDB,
					api: mapTemperament
				}
			}
		}
	} else {
		throw new Error(`Temperament ${name} not found`)
	}
}

const deleteTemperament = async (id) => {
	id = validID(id)
	if(parseInt(id)){
		const temperament = await Temperament.destroy({
			where: {id}
		})
		return 'Temperament delete success'
	} else {
		throw new Error('Data is incomplete or invalid')
	}
}

const updateTemperament = async (id, name) => {
	id = validID(id)
	name = validName(name)
	if(parseInt(id) && name){
		const temperament = await Temperament.findByPk(id)
		if(temperament){
			temperament.name = name
			await temperament.save()
			return `Temperament ${name} is update`
		} else {
			throw new Error('Temperament is not found')
		}
	} else {
		throw new Error('Data is incomplete or invalid')
	}
}

module.exports = { 
	getDataApi, 
	getDataDB, 
	getAllData, 
	setDataDB, 
	getDogByName, 
	getDogById,
	deleteDog, 
	updateDog,
	getTemperaments,
	getTemperamentByID,
	getTemperamentByName,
	setTemperament,
	deleteTemperament,
	updateTemperament
}