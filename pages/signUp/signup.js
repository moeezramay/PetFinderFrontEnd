import React, { useEffect, useState } from "react";
import "./signup.css";
import Waves from "../../public/waves";
import MiniLogo from "../../public/miniLogoBlacksvg";
import TouchHand from "../../public/handTouchsvg";
import ShareIcon from "../../public/shareIconsvg";
import { useRouter } from "next/navigation";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); //Sets message from backend
    const [isValid, setIsValid] = useState(Boolean);

    const jwt = require("jsonwebtoken");

    const usernamePattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regix = /^(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{7,14}$/;

    var router = useRouter();

    //Checks if server is online-------
    useEffect(() => {
        try {
            fetch("http://localhost:8080/sign/check")
                .then((response) => {
                    console.log("response: ", response.message);
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((res) => {
                    console.log(res.message);
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

    const checkpass = () => {
        setIsValid(regix.test(password));
        console.log("The state is ", isValid);
    };

    //updates check for pass (due to async nature of states)
    useEffect(() => {
        checkpass();
    }, [password]);
    //Sends data and verifies user
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("VALIDITY", isValid);
        //Send data to backend
        try {
            const res = await fetch("http://localhost:8080/sign/signUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
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
                    localStorage.setItem("token", token); //Sets token in local storage
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
                                    Username
                                </div>
                                <input
                                    className="email-input-signUp"
                                    placeholder="Type Your Username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
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
