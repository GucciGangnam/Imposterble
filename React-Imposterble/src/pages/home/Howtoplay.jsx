// IMPORTS
// Styles 
import "./Howtoplay.css"

// rrd
import { useNavigate } from "react-router-dom"



// COMPONENT 
export const Howtoplay = () => { 
    const navigate = useNavigate();

    return ( 
        <div className="Howtoplay">
            <h1>House rules apply!</h1>
            <h1>Ask the host</h1>
            <button className="Main-BTN" onClick={() => { navigate("../")}}>Great</button>

        </div>
    )
}