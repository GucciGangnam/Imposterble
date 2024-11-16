// IMPORTS 
// Style
import "./JoinGame.css"
// React
import { useState, useEffect } from "react";
// RRD 
import { useNavigate } from "react-router-dom"
// Componenets 
import { LoadingScreen } from "../../appComponents/LoadingSCreen";
import { ErrorNotification } from "../../appComponents/ErrorNotification"
// ENV
const backendURL = import.meta.env.VITE_BACKEND_URL;



// COMPONENT
export const JoinGame = () => {
    // Navigation 
    const navigate = useNavigate();
    // States 
    const [step, setStep] = useState(1);
    const [inputCode, setInputCode] = useState(Array(6).fill(''));
    const [nameValue, setNameValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)

    // STEP 1 // LOBBY CODE 
    // Handler to focus the next input
    const handleInputChange = (event, index) => {
        const value = event.target.value;
        // Update the state for the specific input
        const updatedCode = [...inputCode];
        updatedCode[index] = value; // Set the current input value
        // Update the state with the new input code
        setInputCode(updatedCode);
        // If input is filled, focus the next input
        if (value.length === 1 && index < 5) {
            const nextInput = document.getElementById(`input-${index + 1}`);
            nextInput.focus();
        }
        // If input is empty, focus the previous input
        else if (value.length === 0 && index > 0) {
            const prevInput = document.getElementById(`input-${index - 1}`);
            prevInput.focus();
        }
    };
    // Check for is valid 
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        const hasEmptyString = inputCode.some(item => item === "");
        setIsFormValid(!hasEmptyString);
    }, [inputCode]);

    // STEP 2 // NAME INPUT
    // Handle change name 
    const handleChangeNameValue = (e) => {
        let input = e.target.value;
        // Remove non-alphabet characters
        input = input.replace(/[^a-zA-Z]/g, '');
        // Trim the input to 10 characters
        if (input.length > 10) {
            input = input.slice(0, 10);
        }
        // Convert to lowercase and then capitalize the first letter
        input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        // Update the state
        setNameValue(input);
    }

    // Join Game function
    const handleJoinGame = async () => {
        setLoading(true);
        if (nameValue === '') {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const response = await fetch(`${backendURL}/game/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: nameValue, lobbyCode: inputCode })
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
                <LoadingScreen message={"Joining Game"} />
            ) : (
                <div className="JoinGame">
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
                            <ErrorNotification message={"Lobby doesn't exist"} />
                        )}
                        {step === 1 && (
                            <>
                                Enter lobby code
                                <div className="Input-Container">
                                    {[...Array(6)].map((_, index) => (
                                        <input
                                            key={index}
                                            id={`input-${index}`} // Unique ID for each input
                                            type="tel"
                                            minLength={1}
                                            maxLength={1}
                                            onChange={(e) => handleInputChange(e, index)} // Call handler on change
                                        />
                                    ))}
                                </div>
                                <button className="Main-BTN" style={{ opacity: isFormValid ? "1" : "0.2" }} onClick={() => { setStep(2) }}>Next</button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <input
                                    value={nameValue}
                                    onChange={handleChangeNameValue}
                                    placeholder="Type your name"
                                    maxLength={10}
                                    className="NameInput"
                                />
                                <button
                                    onClick={handleJoinGame}
                                    style={{ opacity: nameValue.length < 1 ? "0.2" : "1" }}
                                    className="Main-BTN">Join game</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}