import React from "react";
import "./sign.css";
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
    return <div className="parent">Hello js</div>;
}

export default SignIn;
