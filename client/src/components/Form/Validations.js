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
         		if( caracter === caracterTwo) {
         			newDate = ""
         			return false
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
	let dataSplit = date.split(".").length
    if((date.includes("http") && dataSplit > 2 && dataSplit < 5) && (date.includes('.jpg') || date.includes('.png')) ){
       	return date
    } else {
        return false
    }
}

const temperamentValidate = (temperament) => {
	if(temperament){
    	return valid(temperament, characters + numbers)
	} else {
		return false
	}
}
const temperamentValidateTwo = (temperament) => {
	if(temperament){
    	return valid(temperament, characters + numbers)
	} else {
		return false
	}
}

const validateDog = (name, height, weight, life_span, image, temperament) => {
	name = name.toLowerCase()
	name = valid(name, numbers + characters)
	height = valid(height, letters + charactersDot)
	weight = valid(weight, letters + charactersDot)
	life_span = valid(life_span, characters)
	image = validImage(image)
	temperament = temperament.map(item => temperamentValidate(item))
	if(name && height && weight && life_span && image && temperament){
		if(height.length > 4 && weight.length > 4 && life_span.length > 10){
			return {
				name: name, 
				height: height, 
				weight: weight, 
				life_span: life_span, 
				image: image,
				temperament: temperament
			}
		} else {
			return false
		}
	} else {
		return false
	}
}

const validNum = (num) => {
	if(isNaN(num) === false){
		return num
	} else {
		return false
	}
}

const validName = (name) => {
	const dataName = valid(name, numbers + characters)
	if(dataName){
		return dataName
	} else {
		return ""
	}
}

module.exports = {
	validateDog,
	temperamentValidateTwo,
	validNum,
	validName
}