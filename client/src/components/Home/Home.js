import React from "react";
import { Link } from "react-router-dom";
import video from "./Perro.mp4"

import './Home.css'

const Home = () => {


	return (
		<div className="Home" >
			<video src={video} autoPlay={true} muted={true} loop={true} poster="./videoperro.mp4" style="z-index: -1;position: fixed;width: 100vw;left: 0;top: 0;"></video>
			<div className="divLink" >
				<Link  to="/dogs" className="linkDogs" >Dogs App</Link>
			</div>
		</div>
	)

}

export default Home