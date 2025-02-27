// IMPORTS 
// Styles 
import "./GamePage.css"

// React 
import { useState, useEffect, useRef } from "react"

// RRD 
import { useParams, useNavigate } from 'react-router-dom';
// Socket IO 
import { io } from 'socket.io-client'
// ENV
const backendURL = import.meta.env.VITE_BACKEND_URL;

// Components
import { LobbyPage } from "./gameComponenets/LobbyPage";
import { LoadingScreen } from "../../appComponents/LoadingScreen"
import { PlayPage } from "./gameComponenets/PlayPage";
import { RoundEnd } from "./gameComponenets/RoundEnd";




// COMPONENET
export const GamePage = () => {

    // Navigate
    const navigate = useNavigate();

    // PARAMS 
    const { lobbycode } = useParams();
    // GAME STATE 
    const [clientGameOBJ, setClientGameOBJ] = useState(null);
    const [clientPlayerID, setClientPlayerID] = useState(null);
    const [clientIsHost, setClientIsHost] = useState(false);
    const [loading, setLoading] = useState(true);
    // REFS
    const socketRef = useRef(null);  // Store the socket instance


    // REMOVE MEEEEEEEEEEE
    useEffect(() => {
        console.log(clientGameOBJ)
    }, [clientGameOBJ])

    useEffect(() => {
        // Set Player ID 
        // Get stored player ID and lobby code from localStorage
        const storedPlayerID = localStorage.getItem('playerID');
        const storedLobbyCode = localStorage.getItem('currentSession');
        // If lobbycode or storedPlayerID is missing, return early
        if (!lobbycode || !storedPlayerID) {
            console.log("Missing lobbycode or playerID");
            return;
        }
        const socket = io(import.meta.env.VITE_BACKEND_URL, {
            transports: ['websocket'], // Ensure WebSocket transport is used
            query: { playerID: storedPlayerID, lobbyCode: storedLobbyCode }, // Send player info as query params to maintain state
        });

        socketRef.current = socket;
        socket.connect
        socket.emit('enterLobby', { lobbycode, storedPlayerID });

        socket.on('updatedGame', (game) => {
            setClientGameOBJ(game);
            localStorage.setItem('currentSession', game.lobbyCode)
            setClientPlayerID(storedPlayerID);
            if (game.hostId === storedPlayerID) {
                setClientIsHost(true)
            }
            setLoading(false)
        });
        socket.on('error', (error) => {
            console.log(error.message);
            alert(error.message);
            if (error.message === 'Game not found.') {
                localStorage.removeItem('currentSession')
                localStorage.removeItem('playerID')
            }
            navigate('../')
        });
        socket.on('gameDeleted', (message) => {
            console.log(message.message);
            alert(message.message);
            localStorage.removeItem('currentSession')
            localStorage.removeItem('playerID')
            navigate('../')
        });
        // Cleanup the socket connection if needed
        return () => {
            if (storedPlayerID && storedLobbyCode) {
                socket.emit('playerDisconnected', { playerID: storedPlayerID, lobbyCode: storedLobbyCode });
            }
            socket.disconnect(); // Disconnect from socket
        };
    }, []);


    return (
        <div className="GamePage">
            {!loading ? (
                <>
                    {clientGameOBJ.state.gameState === "Lobby" && (
                        <LobbyPage clientGameOBJ={clientGameOBJ} clientPlayerID={clientPlayerID} clientIsHost={clientIsHost} socketRef={socketRef} />
                    )}

                    {clientGameOBJ.state.gameState === "Game" && (
                        <PlayPage clientGameOBJ={clientGameOBJ} clientPlayerID={clientPlayerID} socketRef={socketRef} />
                    )}

                    {clientGameOBJ.state.gameState === "RoundEnd" && (
                        <RoundEnd clientGameOBJ={clientGameOBJ} clientPlayerID={clientPlayerID} socketRef={socketRef} />
                    )}


                </>
            ) : (
                <>
                    <LoadingScreen message={"Loading game"} />
                </>
            )}
        </div>
    )
}