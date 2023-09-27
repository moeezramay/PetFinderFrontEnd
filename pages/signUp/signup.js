import React, { useEffect } from "react";
import "./signup.css";
import Waves from "../../public/waves";
import MiniLogo from "../../public/miniLogoBlacksvg";
import TouchHand from "../../public/handTouchsvg";
import ShareIcon from "../../public/shareIconsvg";
import { useRouter } from "next/navigation";

function SignUp() {
    useEffect(() => {
        fetch("http://localhost:8080/api/home")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, []);

    var router = useRouter();

    var shiftSignIn = () => {
        router.push("../signIns/signIn");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //Add functionality here
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
                                />
                                <div className="email-heading-signUp">
                                    Password
                                </div>
                                <input
                                    className="email-input-signUp"
                                    placeholder="Type Your Password"
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
