import React, { useState } from "react";
import "./sign.css";
import Waves from "./../../public/waves";
import Logo from "./../../public/signInlogo";
import TouchHand from "./../../public/handTouchsvg";
import ShareIcon from "./../../public/shareIconsvg";
import MiniLogo from "../../public/miniLogoBlacksvg";
import { useRouter } from "next/navigation";

function SignIn() {
    const [userFound, setUserFound] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const jwt = require("jsonwebtoken");

    var router = useRouter();

    var shiftSignUp = (e) => {
        console.log("wfegaewgweagwea");
        e.preventDefault();
        router.push("../signUp/signup");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Add functionality here

        if (
            username === "" ||
            password === "" ||
            username === " " ||
            password === " "
        ) {
            return;
        }
        try {
            const res = await fetch("http://localhost:8080/sign/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const errorMessage = await res.json();
                console.error("Error if:", errorMessage.error);
                return;
            }
            const response = await res.json();
            console.log(
                "RESPONSE, TOKEN: " +
                    response.token +
                    " MESSAGE: " +
                    response.message
            );
            const token = response.token;
            const msg = response.message;
            setUserFound(msg);
            console.log("message: ", msg);
            if (token) {
                const decodedMessage = jwt.decode(token);
                localStorage.setItem("token", token); //Sets token in local storage
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
                    <div className="aboutSectionHeading-signIn">
                        <div className="aboutSectiondiv">
                            <div className="aboutHeading-signIn">
                                One Platform!
                            </div>
                            <div className="aboutDescription-signIn">
                                For Finding Lost Pets!
                            </div>
                            <div className="OwnersSection-signIn">
                                <div className="parent-owner-signIn">
                                    <div className="owner-title-signIn">
                                        Owners!
                                    </div>
                                    <div className="ownerSubTitle-signIn">
                                        Find your lost pet
                                        <br />
                                        within a few clicks!
                                    </div>
                                </div>
                                <div className="hand-logo-signIn">
                                    <TouchHand />
                                </div>
                            </div>
                            <div className="LostPetsSection-signIn">
                                <div className="parent-owner-signIn">
                                    <div className="owner-title-signIn">
                                        Lost Pets!
                                    </div>
                                    <div className="ownerSubTitle-signIn">
                                        Register any lost pet
                                        <br />
                                        to find its owner!
                                    </div>
                                </div>
                                <div className="hand-logo-signIn">
                                    <ShareIcon />
                                </div>
                            </div>
                        </div>
                        <div className="signInSectiondiv">
                            <div className="logo-parent-signIn">
                                <MiniLogo className="logo-signIn" />
                            </div>
                            <div className="signInHeading-signIn">SignIn</div>
                            <div className="email-pass-confirm-section-signIn">
                                <div className="email-heading-signIn">
                                    Username
                                </div>
                                <input
                                    className="email-input-signIn"
                                    placeholder="Type Your Username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                                <div className="email-heading-signIn">
                                    Password
                                </div>
                                <input
                                    className="email-input-signIn"
                                    placeholder="Type Your Password"
                                    type="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="forgotPass-signIn">
                                Forgot Password?
                            </div>
                            <div className="SeperatingLine-signIn"></div>
                            <button
                                className="singup-Button-signIn"
                                type="submit"
                            >
                                SignIn
                            </button>
                            <div className="parent-acc-signIn">
                                <div className="already-acc-signIn">
                                    Dont have an account?
                                </div>
                                <div
                                    className="link-sign-signIn"
                                    onClick={shiftSignUp}
                                >
                                    SignUp
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

export default SignIn;
