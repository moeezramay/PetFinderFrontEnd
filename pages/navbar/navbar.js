import "./navbar.css";
import React, { useEffect, useRef, useState } from "react";
import MiniLogoBlue from "../../public/miniLogoBluesvg";

function NavBar() {
    const [scrolling, setScrolling] = useState(false);

    const scrollPage = (x) => {
        const scrollDistance = x;

        window.scrollBy({
            top: scrollDistance,
            behavior: "smooth",
        });
    };
    return (
        <div className="nav-bar-parent">
            <div className="nav-center">
                <div className="nav-bar-logo">
                    <MiniLogoBlue />
                </div>
                <div className="contact-parent">
                    <div
                        className="nav-about"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            scrollPage(650);
                        }}
                    >
                        About
                    </div>
                    <div
                        className="nav-about"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            scrollPage(1400);
                        }}
                    >
                        Get Started
                    </div>
                    <div
                        className="nav-about"
                        style={{ cursor: "pointer", marginRight: "20px" }}
                        onClick={() => {
                            scrollPage(2000);
                        }}
                    >
                        Contact
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
