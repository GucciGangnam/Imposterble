// IMPORTS 
// Style 
import "./HostGame.css"
// React 
import { useState, useEffect } from "react"
// RRD 
import { Link, useNavigate } from "react-router-dom"
// Componenets 
import { LoadingScreen } from "../../appComponents/LoadingScreen"
import { ErrorNotification } from "../../appComponents/ErrorNotification"
// ENV
const backendURL = import.meta.env.VITE_BACKEND_URL;


// COMPONENT
export const HostGame = () => {
    // Navigateion 
    const navigate = useNavigate();

    // States 
    const [loading, setLoading] = useState(false);
    const [nameValue, setNameValue] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    // Handlers
    const handleChangeNameValue = (e) => {
        let input = e.target.value;
        input = input.replace(/[^a-zA-Z]/g, '');
        if (input.length > 10) {
            input = input.slice(0, 10);
        }
        input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        setNameValue(input);
    }

    // Handle Create Game 
    const handleCreateGame = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (nameValue === '') {
            return;
        }
        try {
            // console.log("posting to create gae")
            const response = await fetch(`${backendURL}/game/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: nameValue })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message)
            }
            // on success - get json data redirect to 
            const data = await response.json();
            // console.log(data)
            localStorage.setItem('playerID', data.playerID);
            navigate(`/game/${data.lobbyCode}`)

        } catch (err) {
            setErrorMessage('Server error.  Please try again.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000)
            console.log(err)
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            {loading ? (
                <>
                    <LoadingScreen message={"Creating Game"} />
                </>
            ) : (
                <div className="HostGame">
                    <div className="Header">
                        <svg
                            onClick={() => { navigate('/') }}
                            cursor="pointer"
                            width="64px"
                            height="64px"
                            viewBox="0 0 1024 1024"
                            fill="#000000"
                            className="icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <g
                                id="SVGRepo_bgCarrier"
                                strokeWidth="0" />
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round" />
                            <g
                                id="SVGRepo_iconCarrier">
                                <path
                                    d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                                    fill="" />
                            </g>
                        </svg>
                        Imposterble
                    </div>
                    <div className="Content">
                        {errorMessage && (
                            <ErrorNotification message={"Error creating game.  Please try again."} />
                        )}
                        <input
                            value={nameValue}
                            onChange={handleChangeNameValue}
                            placeholder="Type your name"
                            maxLength={10}
                            className="NameInput"
                        />
                        <button
                            onClick={handleCreateGame}
                            style={{ opacity: nameValue.length < 1 ? "0.2" : "1" }}
                            className="Main-BTN">Create game</button>
                    </div>
                </div>
            )}
        </>
    )
}