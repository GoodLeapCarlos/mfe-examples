import { Link } from "react-router-dom";

export default function Home(){
    return (<div>
        MFEA - Home!<br/>
        <Link to="/funding/test">Funding Test Page</Link>
    </div>)
}