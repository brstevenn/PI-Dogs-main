const numbers = "1234567890"
const letters = "abcdefghijklmnñopqrstuvwxyz"
const characters = "`\\'|¬°!@#$%&/()=?'¡¿¨*[];:_^~}{.,+´<>\""
const charactersDot = "`\\'|¬°!@#$%&/()=?'¡¿¨*[];:_^~}{,+´<>\""

const valid = (date, caracters) => {
	let newDate = "";
    for (var i = 0; i< date.length; i++) {
    	let caracter = date.charAt(i);
        for(let j = 0; j < caracters.length; j++){
         	let caracterTwo = caracters.charAt(j)
         		if( caracter == caracterTwo) {
         			newDate = ""
         			return ""
          		}
         	}
         newDate = date
    }
    if(newDate.length){
    	return newDate.charAt(0).toUpperCase() + newDate.slice(1)
    } else {
    	return newDate
    } 
}

const validImage = (date) => {
	const index = date[date.length - 4] + date[date.length - 3] + date[date.length - 2] + date[date.length - 1]
    if(index.includes('.jpg') || index.includes('.png')){
       	return date
    } else {
        return ""
    }
}

const validateDog = (name, height, weight, life_span, image) => {
	if(name && height && weight && life_span && image){
		name = name.toLowerCase()
		return {
			name: valid(name, numbers + characters), 
			height: valid(height, letters + charactersDot), 
			weight: valid(weight, letters + charactersDot), 
			life_span: valid(life_span, characters), 
			image: validImage(image)
		}
	} else {
		return 'Data is not valid'
	}
}

const dataSearch = (dataDB, dataAPI) => {
	const data = {
		database: [],
		api: []
	}
	if(dataDB.length > 0){
		data.database = dataDB
	}
	if(dataAPI.length > 0){
		data.api = dataAPI
	}
	return data
}

const temperamentValidate = (temperament) => {
	if(temperament){
    	return valid(temperament, characters + numbers)
	} else {
		return ""
	}
}

const validID = (id) => {
	if(id) {
		return valid(id, characters + letters + "-")
	} else {
		return undefined
	}
}

const validDB = (db) => {
	if(db === "true" || db === "false") {
		if(db === "true"){
			return true
		} else {
			return false
		}
	} else {
		throw new Error('Data is invalid')
	}
}

const validName = (name) => {
	return valid(name, characters + numbers)
}

const validNameSpace = (name) => {
	if(name.length){
		if(name.includes(" ") || name.includes("%20")){
			name = name.replace("%20", " ").split(" ")
			const newName = name.map((date) => { 
    			return date[0].toUpperCase() + date.substring(1); 
			}).join(" ");
			return newName
		} else {
			return name
		}
	} else {
		return ""
	}
}

module.exports = {
	validateDog,
	dataSearch,
	temperamentValidate,
	validID,
	validDB,
	validName,
	validNameSpace
}