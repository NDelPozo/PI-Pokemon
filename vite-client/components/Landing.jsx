import { Link } from "react-router-dom"

export default function Landing() {
    console.log("holi");
    return(
        <div>
            <h1>Welcome</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}