import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/index";
import Nav from "../Nav/Nav";
import {
	validateDog,
	temperamentValidateTwo,
	validNum,
	validName,
} from "./Validations";
import video from "../Home/Perro.mp4";

import "./Form.css";

const Form = () => {
	const dispatch = useDispatch();
	const [temperament, setTemperament] = useState({ value: "" });
	const [temperaments, setTemperaments] = useState([]);
	const [height, setHeight] = useState({ min: "", max: "" });
	const [weight, setWeight] = useState({ min: "", max: "" });
	const [life_span, setLife_span] = useState({ min: "", max: "" });
	const [valueDog, setValueDog] = useState({
		name: "",
		image: "",
	});

	function changeTemp(event) {
		event.preventDefault();
		temperamentValidateTwo(event.target.value)
			? setTemperament({
					value: temperamentValidateTwo(event.target.value),
			  })
			: setTemperament({ value: "" });
	}
	function addTemperament(event) {
		event.preventDefault();
		setTemperaments([
			...temperaments,
			[...temperament.value].join().replaceAll(",", ""),
		]);
		setTemperament({ value: "" });
	}
	function deleteTemp(event) {
		event.preventDefault();
		setTemperaments(
			[...temperaments].filter((n) => n !== event.target.name)
		);
	}
	function handleChange(event) {
		event.preventDefault();
		if (
			event.target.name === "heightMin" ||
			event.target.name === "heightMax"
		) {
			if (validNum(event.target.value)) {
				event.target.name === "heightMin"
					? setHeight({ ...height, min: event.target.value })
					: setHeight({ ...height, max: event.target.value });
			} else {
				event.target.name === "heightMin"
					? setHeight({ ...height, min: "" })
					: setHeight({ ...height, max: "" });
			}
		}
		if (
			event.target.name === "weightMin" ||
			event.target.name === "weightMax"
		) {
			if (validNum(event.target.value)) {
				event.target.name === "weightMin"
					? setWeight({ ...weight, min: event.target.value })
					: setWeight({ ...weight, max: event.target.value });
			} else {
				event.target.name === "weightMin"
					? setWeight({ ...weight, min: "" })
					: setWeight({ ...weight, max: "" });
			}
		}
		if (
			event.target.name === "life_spanMin" ||
			event.target.name === "life_spanMax"
		) {
			if (validNum(event.target.value)) {
				event.target.name === "life_spanMin"
					? setLife_span({ ...life_span, min: event.target.value })
					: setLife_span({ ...life_span, max: event.target.value });
			} else {
				event.target.name === "life_spanMin"
					? setLife_span({ ...life_span, min: "" })
					: setLife_span({ ...life_span, max: "" });
			}
		}
		if (event.target.name === "name") {
			if (validName(event.target.value)) {
				setValueDog({
					...valueDog,
					[event.target.name]: validName(event.target.value),
				});
			} else {
				setValueDog({ ...valueDog, [event.target.name]: "" });
			}
		} else {
			setValueDog({
				...valueDog,
				[event.target.name]: event.target.value,
			});
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		const newDog = {
			...valueDog,
			temperament: [...temperaments],
			height: `${height.min} - ${height.max}`,
			weight: `${weight.min} - ${weight.max}`,
			life_span: `${life_span.min} - ${life_span.max} years`,
		};
		const dogValid = validateDog(
			newDog.name,
			newDog.height,
			newDog.weight,
			newDog.life_span,
			newDog.image,
			newDog.temperament
		);
		if (dogValid) {
			dispatch(actions.setDog(dogValid));
			setValueDog({
				name: "",
				image: "",
			});
			setTemperaments([]);
			setHeight({ min: "", max: "" });
			setWeight({ min: "", max: "" });
			setLife_span({ min: "", max: "" });
		} else {
			return window.alert("Data is invalid");
		}
	}

	let keyTemp = 0;

	return (
		<div className="form">
			<video
				src={video}
				autoPlay={true}
				muted={true}
				loop={true}
				poster="./videoperro.mp4"
				Style={"z-index: -1;position: fixed;width: 100vw;left: 0;top: 0;"}
			></video>
			<div className="divNav">
				<Nav />
			</div>
			<form className="Form" onSubmit={handleSubmit}>
				<label className="labelNameImage">
					Breed:{" "}
					<input
						className="inputNameImage"
						type="text"
						name="name"
						value={valueDog.name}
						onChange={handleChange}
					/>
				</label>
				<label className="labelNameImage">
					Image (Only URL .png or .jpg):{" "}
					<input
						className="inputNameImage"
						type="text"
						name="image"
						value={valueDog.image}
						onChange={handleChange}
					/>
				</label>
				<div className="divHeightWeight">
					<label className="labelHeightWeight">
						Height: <br></br>
						Min:{" "}
						<input
							className="inputHeightWeight"
							type="text"
							name="heightMin"
							value={height.min}
							onChange={handleChange}
						/>
						<br></br>
						Max:{" "}
						<input
							className="inputHeightWeight"
							type="text"
							name="heightMax"
							value={height.max}
							onChange={handleChange}
						/>
					</label>
					<label className="labelHeightWeight">
						Weight: <br></br>
						Min:{" "}
						<input
							className="inputHeightWeight"
							type="text"
							name="weightMin"
							value={weight.min}
							onChange={handleChange}
						/>
						<br></br>
						Max:{" "}
						<input
							className="inputHeightWeight"
							type="text"
							name="weightMax"
							value={weight.max}
							onChange={handleChange}
						/>
					</label>
					<label className="labelHeightWeight">
						Life Span on years: <br></br>
						Min:{" "}
						<input
							className="inputHeightWeight"
							type="text"
							name="life_spanMin"
							value={life_span.min}
							onChange={handleChange}
						/>
						<br></br>
						Max:{" "}
						<input
							className="inputHeightWeight"
							type="text"
							name="life_spanMax"
							value={life_span.max}
							onChange={handleChange}
						/>
					</label>
				</div>
				<label className="labelTemperaments">
					Temperaments:
					<div>
						<input
							className="inputNameImage"
							type="text"
							value={temperament.value}
							onChange={changeTemp}
						/>
						<button
							className="addTemperaments"
							type="submit"
							onClick={addTemperament}
						>
							Add
						</button>
					</div>
					<div className="containerDivTemperaments">
						{temperaments &&
							temperaments.map((data) => {
								keyTemp = keyTemp + 1;
								return (
									<div
										className="divTemperaments"
										key={keyTemp}
									>
										<button
											className="deleteTemperaments"
											onClick={deleteTemp}
											name={data}
										>
											x
										</button>
										<p className="dataTemperaments">
											{data}
										</p>
									</div>
								);
							})}
					</div>
				</label>
				<button className="submitDog" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Form;
