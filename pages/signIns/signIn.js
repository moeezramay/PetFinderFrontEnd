import React from "react";
import "./sign.css";
import Waves from "./../../public/waves";
import Logo from "./../../public/signInlogo";
import TouchHand from "./../../public/handTouchsvg";
import ShareIcon from "./../../public/shareIconsvg";
import MiniLogo from "../../public/miniLogoBlacksvg";
import { useRouter } from "next/navigation";

function signIn() {
    var router = useRouter();

    var shiftSignUp = () => {
        router.push("../signUp/signUp");
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
                                    Email
                                </div>
                                <input
                                    className="email-input-signIn"
                                    placeholder="Type Your Email"
                                />
                                <div className="email-heading-signIn">
                                    Password
                                </div>
                                <input
                                    className="email-input-signIn"
                                    placeholder="Type Your Password"
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

export default signIn;
