import React from "react";
import { Link } from "react-router-dom";

import './Nav.css'

function Nav() {
  
  return (
    <div className="navBar" >
      <div className="navDivLiks">
        <Link  to="" className="navLiks">Home</Link>
      </div>
      <div className="navDivLiks">
        <Link  to="/dogs" className="navLiks">Dogs</Link>
      </div>
      <div className="navDivLiks">
        <Link  to="/form" className="navLiks">Form</Link>
      </div>
    </div>
  );
  
}

export default Nav