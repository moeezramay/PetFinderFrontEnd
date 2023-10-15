import "./navbar.css";
import React, { useEffect, useRef, useState } from "react";
import MiniLogoBlue from "../../public/miniLogoBluesvg";
import { useRouter } from "next/navigation";

function NavBar() {
    var router = useRouter();
    const [scrolling, setScrolling] = useState(false);

    const scrollPage = (x) => {
        const scrollDistance = x;

        window.scrollBy({
            top: scrollDistance,
            behavior: "smooth",
        });
    };
    const logout = () => {
        localStorage.removeItem("token");
        router.push("/Loader/loader");
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
                    <div
                        className="nav-about"
                        style={{
                            cursor: "pointer",
                            marginRight: "20px",
                            color: "#2758bb",
                            marginLeft: "-20px",
                        }}
                        onClick={logout}
                    >
                        Logout
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
