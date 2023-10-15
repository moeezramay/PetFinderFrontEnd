import React, { useState, useEffect } from "react";
import Logo from "../../public/logosvg";
import "./loader.css";
import { useRouter } from "next/navigation";

function Loader() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const router = useRouter();
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(true);
        }, 600);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const NextPage = async () => {
        await delay(3000);
        router.push("../signUp/signup");
    };

    useEffect(() => {
        NextPage();
    }, []);

    return (
        <div className={`loader ${showLoader ? "visible" : "hidden"}`}>
            <div className="logo-container">
                <Logo style={{ display: "block", margin: "auto" }} />
            </div>
            <div className="loading-bar"></div>
        </div>
    );
}

export default Loader;
