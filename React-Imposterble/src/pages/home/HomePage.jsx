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

    // Handler 
const reJoin = () => { 
    const sessionData = JSON.parse(localStorage.getItem('currentSession'));
    if (sessionData) {
        const createdAt = new Date(sessionData.createdAt); // Convert string to Date object
        const lobbyCode = sessionData.code;
        console.log('Created At:', createdAt); // Logs as a Date object
        console.log('Lobby Code:', lobbyCode);
        navigate(`../game/${lobbyCode}`)
    }

}



    return (
        <div className="HomePage">
            {localStorage.getItem('currentSession') ? (
                <div className="Header"><button onClick={reJoin}>Re-join game</button></div>
            ) : (
                <div className="Header">Imposterble</div>
            )
            }

            <div className="Content">
                <button className="Main-BTN" onClick={() => { navigate('/hostgame') }}>Host game</button>
                <button className="Main-BTN" onClick={() => { navigate('/joingame') }}>Join game</button>
                <button className="Main-BTN" onClick={() => { navigate('/howtoplay') }}>How to play</button>
            </div>
        </div>
    )
}
