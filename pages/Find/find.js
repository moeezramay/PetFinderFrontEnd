import React, { useEffect, useContext } from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import "./find.css";
import { useRouter } from "next/navigation";
import BigLogoWhite from "../../public/bigWhiteLogosvg";

export default function Find() {
    const [initialPetData, setInitialPetData] = useState([]);
    const [petData, setPetData] = useState([]);
    const [showButton, setShowButton] = useState(true);
    const [encodedImageData, setEncodedImageData] = useState("");
    const [filterLocation, setFilterLocation] = useState("");
    const [filterFurColor, setFilterFurColor] = useState("");
    const [filterEyeColor, setFilterEyeColor] = useState("");
    const [filterNameTag, setFilterNameTag] = useState("");
    const [detailData, setDetailData] = useState({});
    const [showDetails, setShowDetails] = useState(false);

    var router = useRouter();

    const toggleDisplay = () => {
        setShowButton(!showButton);
    };

    //Loads images if they are not loaded
    useEffect(() => {
        console.log("Initial Pet Data updated:", initialPetData);
        setPetData(initialPetData);
        setShowDetails(false);
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

    //Display data if not loaded
    const handleFilterApply = (event) => {
        event.preventDefault();
        filterPets();
    };

    //Fetch Request to server asking for data
    useEffect(() => {
        setShowButton(true);
        try {
            fetch("https://mern-backend-moeez-apis.onrender.com/upload/recieve", {
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

    //Shift to details
    // const shiftToDetails = (e) => {
    //     e.preventDefault();
    //     console.log("before detail: ", detailData);
    //     router.push("./Details/details");
    // };

    //Filter Data Function
    const filterPets = () => {
        const allFiltersEmpty =
            filterLocation.trim() === "" &&
            filterFurColor.trim() === "" &&
            filterEyeColor.trim() === "" &&
            filterNameTag.trim() === "";

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
                allFiltersEmpty ||
                (locationMatch &&
                    furColorMatch &&
                    eyeColorMatch &&
                    nameTagMatch)
            );
        });

        if (allFiltersEmpty) {
            setPetData(initialPetData);
        } else {
            setPetData(filteredPets);
        }
    };

    //Display Pet Cards
    const displayPetCards =
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
                                setShowDetails(true);
                            }}
                        >
                            See Details
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <div className="No-data-find">Loading Data</div>
        );

    //Display card details
    const CardDetails = () => {
        console.log("Show state", showDetails);
        return (
            <div className="parent-container-details">
                <div className="shade-container-details"></div>
                <div className="card-details-containers-details">
                    <div className="details-icon-container-details">
                        <BigLogoWhite />
                    </div>
                    <div className="subDetails-container-details">
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "26px",
                                color: "white",
                                fontWeight: "bold",
                                marginTop: "5%",
                            }}
                        >
                            Details
                        </div>
                        <div style={{ marginLeft: "5%", paddingBottom: "5%" }}>
                            <div className="container-details-heading">
                                <div>Catname:</div>
                                <div className="ans-text-details">
                                    {detailData.catName}
                                </div>
                            </div>
                            <div className="container-details-heading">
                                <div>Eye Color:</div>
                                <div className="ans-text-details">
                                    {detailData.eyeColor1}
                                </div>
                            </div>
                            {detailData.eyeColor2 !== "" && (
                                <div className="container-details-heading">
                                    <div>Eye Color 2:</div>
                                    <div className="ans-text-details">
                                        {detailData.eyeColor2}
                                    </div>
                                </div>
                            )}
                            <div className="container-details-heading">
                                <div>Fur Color:</div>
                                <div className="ans-text-details">
                                    {detailData.furColor1}
                                </div>
                            </div>
                            {detailData.furColor2 !== "" && (
                                <div className="container-details-heading">
                                    <div>Fur Color 2:</div>
                                    <div className="ans-text-details">
                                        {detailData.furColor2}
                                    </div>
                                </div>
                            )}
                            <div className="container-details-heading">
                                <div>Location:</div>
                                <div className="ans-text-details">
                                    {detailData.location}
                                </div>
                            </div>
                            <div className="container-details-heading">
                                <div>Uploader Name:</div>
                                <div className="ans-text-details">
                                    {detailData.fullname}
                                </div>
                            </div>
                            {detailData.email !== "" && (
                                <div className="container-details-heading">
                                    <div>Email:</div>
                                    <div className="ans-text-details">
                                        {detailData.email}
                                    </div>
                                </div>
                            )}
                            <div className="container-details-heading">
                                <div>Phone Number:</div>
                                <div className="ans-text-details">
                                    {detailData.contact}
                                </div>
                            </div>
                            <div className="filter-container-close-button ">
                                <button
                                    className="details-button-close"
                                    onClick={() => setShowDetails(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    //-------------------RETURN-------------------->

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
                            Add Filters
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
                <div className="results-parent-find">{displayPetCards}</div>
                <div>{showDetails ? <CardDetails /> : <div>f</div>}</div>
            </div>
        </form>
    );
}
