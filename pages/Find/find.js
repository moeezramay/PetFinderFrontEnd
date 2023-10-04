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
            Add Filter's
          </button>
        </div>
        <div className="SepratingLine-find"></div>
      </div>
      <div className="pet-results-find">Showing Latest Results For Reported Pets:</div>
      <div className="results-parent-find">
        <div className="card-results-find">
          <div className="img-card-find"> Image </div>
          <div className="line-box-find"></div>
          <div style={{ marginTop:'6%',color:'white',marginLeft:'8%'}}>
            <div style={{display:'flex'}}>
              <div className="pet-info-find">Pet Name: </div>
              <div className="pet-answer-find">Smokey</div>
            </div>
            <div style={{display:'flex',marginTop:"5%"}}>
              <div className="pet-info-find">Fur Color:</div>
              <div className="pet-answer-find">Grey</div>
            </div>
            <div style={{display:'flex',marginTop:"5%"}}>
              <div className="pet-info-find">Eye Color:</div>
              <div className="pet-answer-find">Blue</div>
            </div>
            <div style={{display:'flex',marginTop:"5%"}}>
              <div className="pet-info-find">City:</div>
              <div className="pet-answer-find">Lahore</div>
            </div>
          </div>

          <div className="view-button-container-find">
            <button className="view-button-find">See Details</button>
          </div>
        </div>
        
      </div>
    </form>
  );
}
