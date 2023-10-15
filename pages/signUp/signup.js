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
    const [confrimPass, setConfirmPass] = useState("");
    const [isValid, setIsValid] = useState(Boolean); //For checking if pass is valid
    const [validUser, setValidUser] = useState(Boolean); //For checking if username is valid
    const [validConfirmPass, setValidConfirmPass] = useState(false);
    const [checkPass, setCheckPass] = useState(""); //For rendering Invalid password error
    const [checkUser, setCheckUser] = useState(""); //For rendering Invalid user error
    const [checkConfirmPass, setCheckConfirmPass] = useState(""); //For rendering Invalid confirm pass
    const [message, setMessage] = useState(""); //Sets message from backend
    const [userCreated, setUserCreated] = useState("");

    const jwt = require("jsonwebtoken");

    const usernamePattern = /^[a-zA-Z0-9]{5,15}$/;
    const regix = /^(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{7,14}$/;

    var router = useRouter();

    //------------------Checks if server is online---------------------
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

    //------------------^^^^^^^^^^^^^^^^^^^^^^^^^---------------------

    //Shifts to signIn
    var shiftSignIn = () => {
        router.push("../signIns/signIn");
    };

    //------------------Checks username and password and confirm password---------------------
    const checkpass = () => {
        setIsValid(regix.test(password));
        console.log("The state for password is ", isValid);
    };

    const checkusername = () => {
        setValidUser(usernamePattern.test(username));
        console.log("The state for username is: ", validUser);
    };

    const checkConfrimPassword = () => {
        if (
            password !== confrimPass ||
            confrimPass === "" ||
            confrimPass === " "
        ) {
            setValidConfirmPass(false);
        } else {
            setValidConfirmPass(true);
        }
        console.log("The state for confirm password is: ", validConfirmPass);
    };

    useEffect(() => {
        checkpass();
    }, [password]);

    useEffect(() => {
        checkusername();
    }, [username]);

    useEffect(() => {
        checkConfrimPassword();
    }, [confrimPass]);

    //------------------^^^^^^^^^^^^^^^^^^^^^^^^^---------------------

    //------------------Sends data and creates user---------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("VALIDITY", isValid);

        if (validUser === false) {
            setCheckUser(
                "Invalid Username (Must be of length 5-10, No special Characters)"
            );
            return;
        }
        setCheckUser("");

        if (isValid === false) {
            setCheckPass(
                "Invalid Password (No SC, Atleast 1 Capital Letter and 1 Digit)"
            );
            return;
        }
        setCheckPass("");
        console.log("confirm pass state: ", validConfirmPass);
        if (validConfirmPass === false) {
            setCheckConfirmPass("Password Does Not Match");
            return;
        }
        setCheckPass("");

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
                return;
            }
            const response = await res.json();
            const token = response.token;
            const msg = response.message;
            setUserCreated(msg);
            console.log("message: ", msg);
            if (token) {
                const decodedMessage = jwt.decode(token);
                setMessage(
                    "Welcome  " + decodedMessage.username + "Message: " + msg
                );
                localStorage.setItem("token", token); //Sets token in local storage
                console.log(message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        router.push("../homePage/home");
    };

    //------------------^^^^^^^^^^^^^^^^^^^^^^^^^---------------------

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
                                <div className="invalid-user-error-signUp">
                                    {checkUser}
                                </div>
                                <div className="email-heading-signUp">
                                    Password
                                </div>
                                <input
                                    className="email-input-signUp"
                                    placeholder="Type Your Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                />
                                <div className="invalid-pass-error-signUp">
                                    {checkPass}
                                </div>
                                <div className="email-heading-signUp">
                                    Confirm Password
                                </div>
                                <input
                                    className="email-input-signUp"
                                    placeholder="Type Your Password"
                                    type="password"
                                    onChange={(e) =>
                                        setConfirmPass(e.target.value)
                                    }
                                />
                                <div className="confirmPass-error-signUp">
                                    {checkConfirmPass}
                                </div>
                            </div>
                            <div className="SeperatingLine-signUp"></div>
                            <div
                                className={`userCreated-msg-signUp ${
                                    userCreated.includes("User already exists!")
                                        ? ".userAlreadyExists-signUp"
                                        : "userCreated-msg-signUp"
                                }`}
                            >
                                {userCreated}
                            </div>
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
