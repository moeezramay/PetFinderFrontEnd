import React from "react";
import "./signup.css";
import Waves from "../../public/waves";
import Logo from "../../public/signInlogo";
import TouchHand from "../../public/handTouchsvg";
import ShareIcon from "../../public/shareIconsvg";
import { useRouter } from "next/navigation";

function SignIn() {
    var router = useRouter();

    var shiftPage = (link) => {
        router.push(link);
    };
    //shiftPage("/signup");
    return (
        <div className="parent">
            <div>Bruhh</div>
        </div>
    );
}

export default SignIn;
