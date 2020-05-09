import React from "react";
import {Link} from "react-router-dom";

const Instructions = () => {
  return (
    <div style={{margin: "10px auto"}}>
      <Link to="/">Go to Home</Link>
      <h3>Air Quality Data Site</h3>
      <h4> problem statement</h4>
    </div>
  );
};

export default Instructions;
