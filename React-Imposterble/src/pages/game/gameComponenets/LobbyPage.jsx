// IMPORTS 
// Styles 
import "./LobbyPage.css"
// Recat 
import { useState, useEffect } from "react"
// RRD 
import { useParams } from 'react-router-dom';
// Socket IO 
import { io } from 'socket.io-client'
// ENV
const backendURL = import.meta.env.VITE_BACKEND_URL;

// Componenets 
import { LobbyNav } from "./LobbyNav"






// COMPOENENT 
export const LobbyPage = ({ socketRef, clientGameOBJ, clientPlayerID, clientIsHost, }) => {
    // Params 
    const { lobbycode } = useParams();



    return (
        <>
            <div className="LobbyPage">
                <LobbyNav lobbycode={lobbycode} socketRef={socketRef} clientIsHost={clientIsHost} clientGameOBJ={clientGameOBJ} />
                {!clientIsHost && ( <>Waiting for host to start game</>)}
                <div className="Container Top">
                    <div className="Container-Name">
                        Players
                    </div>

                    {clientGameOBJ.players.map((player) => (
                        <div
                            key={player.id}
                            className={player.online ? "Player" : "Player-Offline"}>
                            <div 
                            className="Circle"
                            style={{background: `${player.color}`}}>
                                {player.name.charAt(0)}
                            </div>
                            <div className="Name">
                                {player.name}
                            </div>
                        </div>
                    ))}

                </div>

                <div className="Container Bottom">
                    <div className="Container-Name">
                        Lobby Code
                    </div>

                    <div className="Lobby-Code">
                        {lobbycode}
                    </div>
                </div>
            </div>
        </>
    )
}
