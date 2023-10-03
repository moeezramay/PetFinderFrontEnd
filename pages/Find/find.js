//write the starting code for reactjs new file with functional component
import React from "react";
import { useState } from "react";
import "./find.css";

//write the starting code for react js new file with functional component
export default function Find() {
  return (
    <form>
      <div className="Parent-Div-Find">
        <div className="title-text-container-find">
          Find Your Missing Pet Today!
        </div>
        <div className="SepratingLine-find"></div>
        <div className="filter-button-container-find">
        <button className="filter-button-find" type="submit">
          Filter
        </button>
        </div>
        <div className="SepratingLine-find"></div>
      </div>
      <div className="pet-results-find">Showing Latest Results For Reported Pets:</div>
    </form>
  );
}
