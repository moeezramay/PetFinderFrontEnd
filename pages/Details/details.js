import React, { useState, useEffect } from "react";

export default function Details(detailData) {
    const [petData, setPetData] = useState(detailData);

    useEffect(() => {
        console.log("Initial Pet Data updated:", petData);
    }, [petData]);

    return (
        <form>
            <div>Hello</div>
        </form>
    );
}
