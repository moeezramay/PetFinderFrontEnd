export default function Waves() {
    return (
        <div
            style={{
                position: "fixed",
                bottom: -215,
                width: "100vw",
                zIndex: -1,
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                width="100%"
                height="auto"
            >
                <path
                    fill="#0099ff"
                    fillOpacity="1"
                    d="M0,32L48,48C96,64,192,96,288,96C384,96,480,64,576,48C672,32,768,32,864,48C960,64,1056,96,1152,112C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
        </div>
    );
}
