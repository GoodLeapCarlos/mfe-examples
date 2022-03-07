import { Link } from "react-router-dom";
// @ts-ignore // TODO: need to figure out typing so we dont need the ignore flags
import DisplayDates from 'mfea_app/displayDates';

export default function Home(){
    return (<div>
        MFEA - DATE: <DisplayDates></DisplayDates>
<br/><br/>
        Shell - Home!<br/>
        <Link to="/funding">Funding</Link>
    </div>)
}