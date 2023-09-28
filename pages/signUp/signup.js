import React, { useEffect, useState } from "react";
import "./signup.css";
import Waves from "../../public/waves";
import MiniLogo from "../../public/miniLogoBlacksvg";
import TouchHand from "../../public/handTouchsvg";
import ShareIcon from "../../public/shareIconsvg";
import { useRouter } from "next/navigation";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); //Sets message from backend

    const jwt = require("jsonwebtoken");

    var router = useRouter();

    //Checks if server is online-------
    useEffect(() => {
        try {
            fetch("http://localhost:8080/api/home")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((arr1) => {
                    console.log(arr1.message);
                });
        } catch (error) {
            console.log("error: ", error);
        }
    }, []);
    //--------

    //Shifts to signIn
    var shiftSignIn = () => {
        router.push("../signIns/signIn");
    };

    //Sends data and verifies user
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Send data to backend
        try {
            const res = await fetch("http://localhost:8080/api/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorMessage = await res.json();
                console.error("Error if:", errorMessage.error);
            } else {
                const response = await res.json();
                const token = response.token;
                console.log(token);
                if (token) {
                    const decodedMessage = jwt.decode(token);
                    setMessage("Welcome  " + decodedMessage.username);
                    console.log(message);
                } else {
                    setMessage("Something went wrong");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }

        router.push("../homePage/home");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="parent">
                <div className="centerIt">
                    <div className="aboutSectionHeading-signUp">
                        <div className="aboutSectiondiv">
                            <div className="aboutHeading-signUp">
                                One Platform!
                            </div>
                            <div className="aboutDescription-signUp">
                                For Finding Lost Pets!
                            </div>
                            <div className="OwnersSection-signUp">
                                <div className="parent-owner-signUp">
                                    <div className="owner-title-signUp">
                                        Owners!
                                    </div>
                                    <div className="ownerSubTitle-signUp">
                                        Find your lost pet
                                        <br />
                                        within a few clicks!
                                    </div>
                                </div>
                                <div className="hand-logo-signUp">
                                    <TouchHand />
                                </div>
                            </div>
                            <div className="LostPetsSection-signUp">
                                <div className="parent-owner-signUp">
                                    <div className="owner-title-signUp">
                                        Lost Pets!
                                    </div>
                                    <div className="ownerSubTitle-signUp">
                                        Register any lost pet
                                        <br />
                                        to find its owner!
                                    </div>
                                </div>
                                <div className="hand-logo-signUp">
                                    <ShareIcon />
                                </div>
                            </div>
                        </div>
                        <div className="signUpSectiondiv">
                            <div className="logo-parent-signUp">
                                <MiniLogo className="logo-signUp" />
                            </div>
                            <div className="signUpHeading-signUp">SignUp</div>
                            <div className="email-pass-confirm-section-signUp">
                                <div className="email-heading-signUp">
                                    Email
                                </div>
                                <input
                                    className="email-input-signUp"
                                    placeholder="Type Your Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="email-heading-signUp">
                                    Password
                                </div>
                                <input
                                    className="email-input-signUp"
                                    placeholder="Type Your Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <div className="email-heading-signUp">
                                    Confirm Password
                                </div>
                                <input
                                    className="email-input-signUp"
                                    placeholder="Type Your Password"
                                />
                            </div>
                            <div className="SeperatingLine-signUp"></div>
                            <button
                                className="singup-Button-signUp"
                                type="submit"
                            >
                                SignUp
                            </button>
                            <div className="parent-acc-signUp">
                                <div className="already-acc-signUp">
                                    Already have an account?
                                </div>
                                <div
                                    className="link-sign-signUp"
                                    onClick={shiftSignIn}
                                >
                                    SignIn
                                </div>
                            </div>
                        </div>
                    </div>
                    <Waves className="waves" />
                </div>
            </div>
        </form>
    );
}

export default SignUp;
