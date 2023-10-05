import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import "./find.css";

//write the starting code for react js new file with functional component
export default function Find() {
    let finalArrayMock = [
        {
            petName: "Smokey",
            furColor: "grey",
            eyeColor: "blue",
            location: "Lahore",
        },
        {
            petName: "Asher",
            furColor: "blue",
            eyeColor: "kali",
            location: "Islamabad",
        },
        {
            petName: "talal",
            furColor: "mental",
            eyeColor: "kali",
            location: "Islamabad",
        },
        {
            petName: "talal",
            furColor: "mental",
            eyeColor: "kali",
            location: "Islamabad",
        },
        {
            petName: "talal",
            furColor: "mental",
            eyeColor: "kali",
            location: "Islamabad",
        },
    ];

    const [petData, setPetData] = useState([]);
    const [encodedImageData, setEncodedImageData] = useState("");

    const petCards =
        petData.length > 0 ? (
            petData.map((pet, index) => (
                <div className="card-results-find" key={index}>
                    <div className="img-card-find">
                        <Image
                            src={decodeURIComponent(pet.imageSrc)}
                            alt={pet.petName}
                            layout="fill"
                            className="img-find"
                        />
                    </div>
                    <div className="line-box-find"></div>
                    <div
                        style={{
                            marginTop: "6%",
                            color: "white",
                            marginLeft: "8%",
                        }}
                    >
                        <div style={{ display: "flex" }}>
                            <div className="pet-info-find">Name Tag: </div>
                            <div className="pet-answer-find">{pet.catName}</div>
                        </div>
                        <div style={{ display: "flex", marginTop: "5%" }}>
                            <div className="pet-info-find">Fur Color:</div>
                            <div className="pet-answer-find">
                                {pet.furColor1}
                            </div>
                        </div>
                        <div style={{ display: "flex", marginTop: "5%" }}>
                            <div className="pet-info-find">Eye Color:</div>
                            <div className="pet-answer-find">
                                {pet.eyeColor1}
                            </div>
                        </div>
                        <div style={{ display: "flex", marginTop: "5%" }}>
                            <div className="pet-info-find">City:</div>
                            <div className="pet-answer-find">
                                {pet.location}
                            </div>
                        </div>
                    </div>

                    <div className="view-button-container-find">
                        <button className="view-button-find">
                            See Details
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <div className="No-data-find">[No Data To Show]</div>
        );

    //Checks for token
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token === null && !token) {
            console.log("token not found");
            router.push("../signUp/signup");
        } else {
            console.log("Token found!");
        }
    }, []);

    //Fetch Request to server asking for data
    useEffect(() => {
        fetch("http://localhost:8080/upload/recieve", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPetData(data);
                setEncodedImageData(data.imageSrc);
                console.log("Pet Data: ", petData);
            });
    }, []);

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
            <div className="pet-results-find">
                Showing Latest Results For Reported Pets:
            </div>
            <div className="results-parent-find">{petCards}</div>
        </form>
    );
}
