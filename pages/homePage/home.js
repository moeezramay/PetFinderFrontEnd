import "./home.css";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "./home.css";
import Image from "next/image";
import NavBar from "../navbar/navbar";
import MessageCorner from "../../public/messageCornersvg";
import MiniLogoWhite from "../../public/miniLogoWhitesvg";
import Footer from "./footer/footer";

function Home() {
    var router = useRouter();
    const titleTextRef = useRef(null);

    var shiftToFind = (e) => {
        e.preventDefault();
        router.push("../Find/find");
    };

    const shiftToFound = (e) => {
        e.preventDefault();
        router.push("../Found/found");
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

    //Fade Effect for title text
    useEffect(() => {
        if (titleTextRef.current) {
            titleTextRef.current.style.opacity = "1";
        }
    }, []);

    return (
        <form>
            <div>
                <div className="homePage-top-parent">
                    <NavBar />
                    {/* Image ------- */}
                    <div className="img-container-homePage">
                        <Image src="/images/catI.jpg" alt="Cat" layout="fill" />
                    </div>
                    {/* Image ------- */}
                    <div className="nav-bar-parent-home"></div>
                    {/* Title Text --- */}
                    <div className="HomePage-Title-Text" ref={titleTextRef}>
                        Connecting Hearts
                        <div style={{ marginLeft: "20%", display: "flex" }}>
                            and
                            <div style={{ marginLeft: "4%", color: "#2758BB" }}>
                                Paws
                            </div>
                        </div>
                    </div>
                    {/* Title Text --- */}
                </div>
                <div className="aboutus-home-parent">
                    <div className="Aboutus-homePage">
                        About <span style={{ color: "#2758BB" }}>Us</span>
                    </div>
                </div>
                <div className="homePage-message-section">
                    <div className="message-corner-homePage">
                        <MessageCorner />
                    </div>
                    <div className="message-box-homePage">
                        <div className="atPetfinder-home-text1">
                            At PetFinder,
                        </div>
                        <div className="description-messagebox-homepage">
                            <span className="message-span-homepage">
                                We are committed to helping people find their
                                lost pets by assisting
                            </span>
                            those in search of their missing furry friends. We
                            offer a comprehensive pet-finding database and a
                            range of resources to aid in search process. Our
                            Mission extends beyond the digital realm, as we
                            strive to create a strong sense of community
                            engagement, encouraging neighbors to support one
                            another during these challenging times.
                        </div>
                    </div>
                </div>
                <div className="line-homePage"></div>
                <div className="getStarted-title-text-homePage-parent">
                    <div className="getStarted-title-text-homePage">
                        Get{" "}
                        <span className="span-getStarted-homePage">
                            Started
                        </span>
                    </div>
                </div>
                <div className="getStated-homePage-section-Parent">
                    <div className="lostPet-card-homePage">
                        <div className="lostPet-card-title">Lost your pet?</div>
                        <div className="miniLogoWhite-lostPet-home">
                            <MiniLogoWhite />
                        </div>
                        <div className="lostPet-card-descrip">
                            Find your pet in
                            <br /> our mission section
                        </div>
                        <button
                            className="lostPet-card-button"
                            onClick={(e) => shiftToFind(e)}
                        >
                            Find My Pet
                        </button>
                    </div>
                    <div className="cards-or-homepage">
                        O
                        <span style={{ color: "#2758BB", cursor: "default" }}>
                            R
                        </span>
                    </div>
                    <div className="foundPet-card-homePage">
                        <div className="foundPet-card-title">Found a pet?</div>
                        <div className="miniLogoWhite-foundPet-home">
                            <MiniLogoWhite />
                        </div>
                        <div className="foundPet-card-descrip">
                            Help others find
                            <br /> their missing pet
                        </div>
                        <button
                            className="foundPet-card-button"
                            onClick={(e) => shiftToFound(e)}
                        >
                            Found A Pet
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </form>
    );
}
export default Home;
