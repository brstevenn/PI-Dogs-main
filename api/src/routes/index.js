const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const {
	getDataApi, 
	getDataDB, 
	getAllData, 
	setDataDB, 
	getDogByName, 
	getDogById,
	updateDog,
	deleteDog,
	getTemperaments, 
	getTemperamentsDB,
	getTemperamentByID,
	getTemperamentByName,
	setTemperament,
	updateTemperament,
	deleteTemperament
} = require('./models/methods.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
	const {name} = req.query
	if(name){
		try {
			const getDog = await getDogByName(name)
			res.status(200).json(getDog)
		} catch(err) {
			res.status(404).json(err.message)
		}
	} else {
		try {
			const response = await getAllData()
			res.status(200).json(response)
		} catch(err) {
			res.status(500).json(err.message)
		}
	}
})

router.get('/dogs/:idRaza', async (req, res) => {
	const {idRaza} = req.params
	const {db} = req.query
	try {
		const response = await getDogById(idRaza, db)
		res.status(200).json(response)
	} catch(err) {
		res.status(404).json(err.message)
	}
})
router.post('/dogs', async (req, res) => {
	const {name, height, weight, life_span, image, temperament} = req.body
	try {
		const dog = await setDataDB(name, height, weight, life_span, image, temperament)
		res.status(200).json(dog)
	} catch(err) {
		res.status(400).json(err.message)
	}
})

router.put("/dogs/:idRaza", async (req, res) => {
	const {idRaza} = req.params
	const {name, height, weight, life_span, image, temperament} = req.body
	try {
		const response = await updateDog(idRaza, name, height, weight, life_span, image, temperament)
		res.status(200).json(response)
	} catch(err) {
		res.status(400).json(err.message)
	}
})

router.delete("/dogs/:idRaza", async (req, res) => {
	const {idRaza} = req.params
	try {
		const response = await deleteDog(idRaza)
		res.status(200).json(response)
	} catch(err) {
		res.status(400).json(err.message)
	}
})

router.get('/temperaments', async (req, res) => {
	const {name} = req.query
	if(name){
		try {
			const getTemperament = await getTemperamentByName(name)
			res.status(200).json(getTemperament)
		} catch(err) {
			res.status(404).json(err.message)
		}
	} else {
		try {
			const temperaments = await getTemperaments()
			res.status(200).json(temperaments)
		} catch(err) {
			res.status(400).json(err.message)
		}
	}
})

router.get('/temperaments/:idTemp', async (req, res) => {
	const {idTemp} = req.params
	try {
		const temperament = await getTemperamentByID(idTemp)
		res.status(200).json(temperament)
	} catch(err) {
		res.status(400).json(err.message)
	}
})

router.post('/temperaments', async (req, res) => {
	const name = req.body.name
	try {
		const response = await setTemperament(name)
		res.status(200).json(response)
	} catch(err) {
		res.status(400).json(err.message)
	}
})

router.put("/temperaments/:idTemp", async (req, res) => {
	const {idTemp} = req.params
	const {name} = req.body
	try {
		const response = await updateTemperament(idTemp, name)
		res.status(200).json(response)
	} catch(err) {
		res.status(400).json(err.message)
	}
})

router.delete("/temperaments/:idTemp", async (req, res) => {
	const {idTemp} = req.params
	try {
		const response = await deleteTemperament(idTemp)
		res.status(200).json(response)
	} catch(err) {
		res.status(400).json(err.message)
	}
})


module.exports = router;
