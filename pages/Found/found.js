import React, { useEffect, useState } from "react";
import "./found.css";
import { useRouter } from "next/navigation";
import BigLogoWhite from "../../public/bigWhiteLogosvg";

function Found() {
    const [radio, setRadio] = useState("No");

    return (
        <form>
            <div className="parent-div-found">
                <div className="top-title-container-found">
                    <div className="title-found">
                        Help Find Someone's Pet <br />
                        Today <br />
                    </div>
                    <div className="title-notify-found">
                        We can Only take missing reports for cats right now
                    </div>
                </div>
                <div className="SeperatingLine-found"></div>
                <div className="pannel-container-found">
                    <div className="logo-found">
                        <BigLogoWhite />
                    </div>
                    <div className="panel-title-found">
                        <div className="panel-intro-found">
                            Please answer the questions below
                            <br />
                            <div className="panel-notify-found">
                                (Avoid any Spelling Mistakes)
                            </div>
                        </div>
                    </div>
                    <div className="parent-options-pannel-found">
                        <div className="option-pannel-subparent-found">
                            <div className="option-pannel-found">
                                Does the cat have a name tag?
                            </div>
                            <div className="radio-container-found">
                                <div
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        marginLeft: "2px",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        id="nameTagYes"
                                        name="GroupA"
                                        value="Yes"
                                        onClick={(e) => {
                                            setRadio(e.target.value);
                                        }}
                                    />
                                    Yes
                                </div>
                                <div
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        marginLeft: "2px",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        id="nameTagNo"
                                        name="GroupA"
                                        value="No"
                                        style={{
                                            marginLeft: "20px",
                                        }}
                                        onClick={(e) => {
                                            setRadio(e.target.value);
                                        }}
                                    />
                                    No
                                </div>
                            </div>
                            <input
                                placeholder="Enter cat name"
                                className={`radio-pannel-found ${
                                    radio.includes("Yes")
                                        ? "yes-radio-found"
                                        : "no-radio-found"
                                }`}
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">Fur Color</div>

                            <input
                                placeholder="Enter Fur Color 1"
                                className="yes-radio-found2"
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Another Fur Color (Optional)
                            </div>

                            <input
                                placeholder="Enter Fur Color 2"
                                className="yes-radio-found2"
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">Eye Color</div>

                            <input
                                placeholder="Enter Eye Color 1"
                                className="yes-radio-found2"
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Another Eye Color (Optional)
                            </div>

                            <input
                                placeholder="Enter Eye Color 2"
                                className="yes-radio-found2"
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Your Full Name
                            </div>

                            <input
                                placeholder="Enter your name"
                                className="yes-radio-found2"
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Location (City)
                            </div>

                            <input
                                placeholder="Enter city"
                                className="yes-radio-found2"
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Contact Number
                            </div>

                            <input
                                placeholder="+92...."
                                className="yes-radio-found2"
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Email Address (Optional)
                            </div>

                            <input
                                placeholder="xyz@example.com"
                                className="yes-radio-found2"
                            />
                        </div>
                        <div className="option-pannel-subparent-found2">
                            <div className="option-pannel-found">
                                Upload the picture of cat
                            </div>

                            <button className="upload-button-found">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Found;
