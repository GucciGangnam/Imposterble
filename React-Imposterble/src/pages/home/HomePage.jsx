// IMPORTS 
// Style 
import "./HomePage.css"
// React 
import { useState, useEffect } from "react"
// RRD 
import { useNavigate } from "react-router-dom"
// Componenets 


// ENV






// COMPONENET 
export const HomePage = () => {
    // Navigation
    const navigate = useNavigate();
    // States 

    return (
        <div className="HomePage">
            <div className="Header">Imposterble</div>
            <div className="Content">
                <button className="Main-BTN" onClick={() => { navigate('/hostgame')}}>Host game</button>
                <button className="Main-BTN" onClick={() => { navigate('/joingame')}}>Join game</button>
                <button className="Main-BTN" onClick={() => { navigate('/howtoplay')}}>How to play</button>
            </div>
        </div>
    )
}