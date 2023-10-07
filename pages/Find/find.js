import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import "./find.css";
import { useRouter } from "next/navigation";

//write the starting code for react js new file with functional component
export default function Find() {
    const [initialPetData, setInitialPetData] = useState([]);
    const [petData, setPetData] = useState([]);
    const [showButton, setShowButton] = useState(true);
    const [encodedImageData, setEncodedImageData] = useState("");
    const [filterLocation, setFilterLocation] = useState("");
    const [filterFurColor, setFilterFurColor] = useState("");
    const [filterEyeColor, setFilterEyeColor] = useState("");
    const [filterNameTag, setFilterNameTag] = useState("");
    const [detailData, setDetailData] = useState([]);
    var router = useRouter();

    //Loads images if they are not loaded
    useEffect(() => {
        console.log("Initial Pet Data updated:", initialPetData);
        setPetData(initialPetData);
    }, [initialPetData]);
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

    //Shift to details
    const shiftToDetails = (e) => {
        e.preventDefault();
        router.push({
            pathname: "../Details/details",
            query: { petData: JSON.stringify(detailData) }, // Convert the object to a string
        });
    };

    //Filter Pets
    const filterPets = () => {
        // Check if all filter fields are empty
        const allFiltersEmpty =
            filterLocation.trim() === "" &&
            filterFurColor.trim() === "" &&
            filterEyeColor.trim() === "" &&
            filterNameTag.trim() === "";

        // Filter pets based on entered criteria
        const filteredPets = initialPetData.filter((pet) => {
            const locationMatch =
                filterLocation.trim() === "" ||
                pet.location
                    .toLowerCase()
                    .includes(filterLocation.toLowerCase());

            const furColorMatch =
                filterFurColor.trim() === "" ||
                pet.furColor1
                    .toLowerCase()
                    .includes(filterFurColor.toLowerCase());

            const eyeColorMatch =
                filterEyeColor.trim() === "" ||
                pet.eyeColor1
                    .toLowerCase()
                    .includes(filterEyeColor.toLowerCase());

            const nameTagMatch =
                filterNameTag.trim() === "" ||
                pet.catName.toLowerCase().includes(filterNameTag.toLowerCase());

            return (
                allFiltersEmpty || // Return true if all filters are empty
                (locationMatch &&
                    furColorMatch &&
                    eyeColorMatch &&
                    nameTagMatch)
            );
        });

        // If all filters are empty, reset to show all initial data
        if (allFiltersEmpty) {
            setPetData(initialPetData);
        } else {
            setPetData(filteredPets);
        }
    };

    const handleFilterApply = (event) => {
        event.preventDefault();
        filterPets();
    };

    //Fetch Request to server asking for data
    useEffect(() => {
        setShowButton(true);
        try {
            fetch("http://localhost:8080/upload/recieve", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setInitialPetData(data);
                    console.log("Initial Pet Data: ", initialPetData);

                    setEncodedImageData(data.imageSrc);
                });
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }, []);

    const toggleDisplay = () => {
        setShowButton(!showButton);
    };

    const petCards =
        petData.length > 0 ? (
            petData.map((pet, index) => (
                <div className="card-results-find" key={index}>
                    <div className="img-card-find">
                        <Image
                            src={decodeURIComponent(pet.imageSrc)}
                            alt="cat"
                            layout="fill"
                            className="img-find"
                        />
                    </div>
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
                        <button
                            className="view-button-find"
                            onClick={(e) => {
                                e.preventDefault();
                                setDetailData(pet);
                                shiftToDetails(e);
                            }}
                        >
                            See Details
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <div className="No-data-find">[No Data To Show]</div>
        );

    return (
        <form>
            <div className="Parent-Div-Find">
                <div className="title-text-container-find">
                    Find Your Missing Pet Today!
                </div>
                <div className="SepratingLine-find"></div>
                <div class="filter-button-container-find">
                    {showButton ? (
                        <div class="filter-button-find" onClick={toggleDisplay}>
                            Add Filter's
                        </div>
                    ) : (
                        <div className="filter-panel-parent-find">
                            <div className="title-filter-container-find">
                                <div className="filter-title-find">
                                    Filter By
                                </div>
                            </div>
                            <div className="line-filter-find"></div>
                            <div className="filter-options-find">
                                <div className="filter-option-find">
                                    <div className="filter-div-find">City</div>
                                    <input
                                        className="filter-input-find"
                                        placeholder="Enter City"
                                        value={filterLocation}
                                        onChange={(e) =>
                                            setFilterLocation(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="filter-option-find">
                                    <div className="filter-div-find">
                                        Fur Color
                                    </div>
                                    <input
                                        className="filter-input-find"
                                        placeholder="Enter Fur Color"
                                        value={filterFurColor}
                                        onChange={(e) =>
                                            setFilterFurColor(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="filter-option-find">
                                    <div className="filter-div-find">
                                        Eye Color
                                    </div>
                                    <input
                                        className="filter-input-find"
                                        placeholder="Enter Eye Color"
                                        value={filterEyeColor}
                                        onChange={(e) =>
                                            setFilterEyeColor(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="filter-option-find">
                                    <div className="filter-div-find">
                                        Name Tag
                                    </div>
                                    <input
                                        className="filter-input-find"
                                        placeholder="Enter Name Tag"
                                        value={filterNameTag}
                                        onChange={(e) =>
                                            setFilterNameTag(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="filter-apply-button-find-container">
                                <button
                                    className="filter-apply-button-find"
                                    onClick={handleFilterApply}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="SepratingLine-find"></div>
                <div className="pet-results-find">
                    Showing Latest Results For Reported Pets:
                </div>
                <div className="results-parent-find">{petCards}</div>
            </div>
        </form>
    );
}
