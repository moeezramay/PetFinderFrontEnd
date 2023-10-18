import React, { useEffect, useState } from "react";
import "./found.css";
import { useRouter } from "next/navigation";
import BigLogoWhite from "../../public/bigWhiteLogosvg";

function Found() {
    const [radio, setRadio] = useState("No");
    var router = useRouter();

    //-------------------Storing data to be uploaded-------------
    const [catName, setCatName] = useState("");
    const [furColor1, setfurColor1] = useState("");
    const [furColor2, setfurColor2] = useState("");
    const [eyeColor1, setEyeColor1] = useState("");
    const [eyeColor2, setEyeColor2] = useState("");
    const [fullName, setFullName] = useState("");
    const [location, setLocation] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [validContact, setValidContact] = useState(false);
    const [checkUpload, setCheckUpload] = useState("");
    const [checkUpload2, setCheckUpload2] = useState("");

    //------------------^^^^^^^^^^^^^^^^-------------------------

    useEffect(() => {
        // Dynamically load ImageCompressor if needed (e.g., in the browser)
        if (typeof window !== "undefined") {
            import("image-compressor.js").then((module) => {
                // Store it in the window object for later use
                window.ImageCompressor = module.default || module;
            });
        }
    }, []);

    //Checks emai;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    useEffect(() => {
        checkEmail();
    }, [email]);

    const checkEmail = () => {
        if (emailPattern.test(email) || email === "" || email === " ") {
            console.log("Email is valid");
            setValidEmail(true);
        } else {
            console.log("Email is invalid");
            setValidEmail(false);
        }
    };

    //Checks contact number;
    const contactPattern = /^\+92\d{10}$/;

    useEffect(() => {
        checkContact();
    }, [contact]);

    const checkContact = () => {
        if (contactPattern.test(contact)) {
            console.log("Contact is valid");
            setValidContact(true);
        } else {
            console.log("Contact is invalid");
            setValidContact(false);
        }
    };

    //Image compression
    const handleImage = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            try {
                const compressedDataURL = await compressImage(selectedFile);

                console.log("Compressed dataURL: ", compressedDataURL);

                setImage(compressedDataURL);
            } catch (error) {
                console.error("Error compressing image:", error);
            }
        }
    };
    //Compressing images function
    const compressImage = async (file) => {
        return new Promise((resolve, reject) => {
            new ImageCompressor(file, {
                quality: 0.1, // Adjust the quality as needed
                success(result) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imageData = e.target.result;
                        resolve(`data:image/jpeg;base64,${btoa(imageData)}`);
                    };
                    reader.readAsBinaryString(result);
                },
                error(e) {
                    reject(e);
                },
            });
        });
    };

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

    //----------------Sending data to mongo----------------------
    const HandleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit pressed");
        if (validContact === false) {
            setCheckUpload2("Please enter a valid contact number");
            return;
        }

        if (validEmail === false) {
            setCheckUpload("Please enter a valid email address ");
            return;
        }

        try {
            const res = await fetch(
                "https://mern-backend-moeez-apis.onrender.com/upload/uploadedData",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        catName,
                        fullName,
                        image,
                        furColor1,
                        furColor2,
                        eyeColor1,
                        eyeColor2,
                        location,
                        contact,
                        email,
                    }),
                }
            );

            if (!res.ok) {
                const errorMessage = await res.json();
                console.error("Error if:", errorMessage.error);
                return;
            }
            const response = await res.json();
            console.log("Response message: ", response.message);
            const msg = response.message;
            /*if (token) {
                const decodedMessage = jwt.decode(token);
                localStorage.setItem("token", token); //Sets token in local storage
            }*/
        } catch (error) {
            console.error("Error:", error);
        }

        router.push("../homePage/home");
    };

    //------------------^^^^^^^^^^^^^^^^-------------------------

    return (
        <form onSubmit={HandleSubmit} encType="multipart/form-data">
            <div className="parent-div-found">
                <div className="top-title-container-found">
                    <div className="title-found">
                        Help Find Someones Pet <br />
                        Today <br />
                    </div>
                    <div className="title-notify-found">
                        We can Only take missing reports for cats right now
                    </div>
                </div>
                <div className="SeperatingLine-found"></div>
                <div className="pannel-container-found">
                    <div className="logo-found">
                        <BigLogoWhite />
                    </div>
                    <div className="panel-title-found">
                        <div className="panel-intro-found">
                            Please answer the questions below
                            <br />
                            <div className="panel-notify-found">
                                (Avoid any Spelling Mistakes)
                            </div>
                        </div>
                    </div>
                    <div className="parent-options-pannel-found">
                        <div className="option-pannel-subparent-found">
                            <div className="option-pannel-found1">
                                Does the cat have a name tag?
                            </div>
                            <div className="radio-container-found">
                                <div
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        marginLeft: "2px",
                                        marginBottom: "4px",
                                    }}
                                    className="radio-yes-found"
                                >
                                    <input
                                        type="radio"
                                        id="nameTagYes"
                                        name="GroupA"
                                        value="Yes"
                                        onClick={(e) => {
                                            setRadio(e.target.value);
                                        }}
                                    />
                                    Yes
                                </div>
                                <div
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        marginLeft: "2px",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        id="nameTagNo"
                                        name="GroupA"
                                        value="No"
                                        style={{
                                            marginLeft: "20px",
                                        }}
                                        onClick={(e) => {
                                            setRadio(e.target.value);
                                            setCatName("");
                                        }}
                                    />
                                    <span className="radio-no-found">No</span>
                                </div>
                            </div>
                            <input
                                placeholder="Enter cat name"
                                name="catName"
                                className={`radio-pannel-found ${
                                    radio.includes("Yes")
                                        ? "yes-radio-found"
                                        : "no-radio-found"
                                }`}
                                onChange={(e) => {
                                    setCatName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">Fur Color</div>

                            <input
                                placeholder="Enter Fur Color 1"
                                className="yes-radio-found2"
                                onChange={(e) => {
                                    setfurColor1(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Another Fur Color (Optional)
                            </div>

                            <input
                                placeholder="Enter Fur Color 2"
                                className="yes-radio-found2"
                                onChange={(e) => {
                                    setfurColor2(e.target.value);
                                }}
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">Eye Color</div>

                            <input
                                placeholder="Enter Eye Color 1"
                                className="yes-radio-found2"
                                onChange={(e) => {
                                    setEyeColor1(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Another Eye Color (Optional)
                            </div>

                            <input
                                placeholder="Enter Eye Color 2"
                                className="yes-radio-found2"
                                onChange={(e) => {
                                    setEyeColor2(e.target.value);
                                }}
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Your Full Name
                            </div>

                            <input
                                placeholder="Enter your name"
                                className="yes-radio-found2"
                                name="fullName"
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Location (City)
                            </div>

                            <input
                                placeholder="Enter city"
                                className="yes-radio-found2"
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Contact Number
                            </div>

                            <input
                                placeholder="+92...."
                                className="yes-radio-found2"
                                onChange={(e) => {
                                    setContact(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Email Address (Optional)
                            </div>

                            <input
                                placeholder="xyz@example.com"
                                className="yes-radio-found2"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Upload the picture of cat
                            </div>
                            <input
                                type="file"
                                id="imageInput"
                                name="petImage"
                                accept="image/jpeg,image/png"
                                onChange={handleImage}
                                className="file-upload-found"
                                style={{ color: "white" }}
                                required
                            />
                        </div>

                        {validEmail === false && (
                            <div className="email-validation-error-found">
                                {checkUpload}
                            </div>
                        )}
                        {validContact === false && (
                            <div className="email-validation-error-found">
                                {checkUpload2}
                            </div>
                        )}
                        <div className="save-button-parent-found">
                            <button type="submit" className="save-button-found">
                                Save & Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Found;
