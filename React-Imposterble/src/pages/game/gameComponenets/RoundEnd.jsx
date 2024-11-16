// IMPORTS 
// Styles 
import "./RoundEnd.css"
// React 
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

import { useNavigate } from "react-router-dom";




// COMPOINENT
export const RoundEnd = ({ clientGameOBJ, clientPlayerID, socketRef }) => {

    // Navigate 
    const navigate = useNavigate();



    const [view, setView] = useState('Results');
    const [finalRound, setFinalRound] = useState(false);
    useEffect(() => {
        if (clientGameOBJ.settings.rounds === clientGameOBJ.state.currentRound) {
            setFinalRound(true)
        }
    }, [clientGameOBJ.settings.rounds, clientGameOBJ.state.currentRound])


    // Initialize a vote count object
    const voteCounts = {};
    // Count votes for each player
    Object.values(clientGameOBJ.state.roundVotes).forEach(votedID => {
        if (votedID !== null) { // Only count non-null votes
            voteCounts[votedID] = (voteCounts[votedID] || 0) + 1;
        }
    });
    // Find the highest vote count
    const maxVotes = Math.max(...Object.values(voteCounts));
    // Get all players who have the max vote count
    const mostVotedPlayers = Object.keys(voteCounts).filter(playerID => voteCounts[playerID] === maxVotes);
    // Check if there's more than one player with the highest vote count
    if (mostVotedPlayers.length > 1) {
        // console.log("multiple losers");
    }
    // Find the player object using the most voted player ID (only one if there's no tie)
    const mostVotedPlayerID = mostVotedPlayers.length === 1 ? mostVotedPlayers[0] : null;
    const mostVotedPlayer = mostVotedPlayerID
        ? clientGameOBJ.players.find(player => player.id === mostVotedPlayerID)
        : null;
    // naimation useEffect
    const firstElementRef = useRef(null);
    const secondElementRef = useRef(null);
    const thirdElementRef = useRef(null);
    const fourthElementRef = useRef(null);
    useEffect(() => {
        // Sequentially increase opacity with a 1-second delay
        setTimeout(() => {
            if (firstElementRef.current) firstElementRef.current.style.opacity = 1;
        }, 1000);

        setTimeout(() => {
            if (secondElementRef.current) secondElementRef.current.style.opacity = 1;
        }, 2000);

        setTimeout(() => {
            if (thirdElementRef.current) thirdElementRef.current.style.opacity = 1;
        }, 5000);

        setTimeout(() => {
            if (fourthElementRef.current) fourthElementRef.current.style.opacity = 1;
        }, 8000);

        setTimeout(() => {
            if (mostVotedPlayer && mostVotedPlayer.id && clientGameOBJ.state.currentImposter) {
                if (mostVotedPlayer.id === clientGameOBJ.state.currentImposter.id) {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { x: 0.5, y: 0.5 }
                    });
                }
            }
        }, 8500);

        setTimeout(() => {
            setView("Scores")
            if (clientGameOBJ.settings.rounds === clientGameOBJ.state.currentRound) {
                const colors = ['#ffd700', '#daa520', '#b8860b']; // Gold color variations
                const end = Date.now() + (5 * 1000); // 15 seconds
                function frame() {
                    confetti({
                        particleCount: 2,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: colors
                    });
                    confetti({
                        particleCount: 2,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: colors
                    });
                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }
                frame();
            }
        }, 10000);
    }, []);

    // Button handlers 
    const startNextRound = () => {
        if (socketRef.current) {
            socketRef.current.emit('nextRound', { playerID: clientPlayerID, lobbyCode: clientGameOBJ.lobbyCode });
        }
    }

    // Winnder calulator 
    const topScore = Math.max(...clientGameOBJ.players.map(player => clientGameOBJ.state.totalScores[player.id]));
    const winners = clientGameOBJ.players.filter(
        player => clientGameOBJ.state.totalScores[player.id] === topScore
    );



    return (

        <>
            {view === "Results" ? (
                <div className="RoundEnd">
                    <div className="Header">
                        The results are in
                    </div>

                    <div className="Container">
                        {mostVotedPlayer ? (
                            <div className="Player" ref={firstElementRef} style={{ opacity: 0, transition: 'opacity 0.5s' }}>
                                <div className="Circle"
                                    style={{ background: `${mostVotedPlayer.color}` }}>
                                    {mostVotedPlayer.name.charAt(0)}
                                </div>
                                <div className="Name">
                                    {mostVotedPlayer.name}
                                </div>
                            </div>
                        ) : (
                            <h1 ref={firstElementRef} style={{ opacity: 0, transition: 'opacity 0.5s' }}>Nobody</h1>
                        )}

                        <h1 ref={secondElementRef} style={{ opacity: 0, transition: 'opacity 0.5s' }}>Received the majoity of votes</h1>
                    </div>
                    <div className="Container">
                        <h1 ref={thirdElementRef} style={{ opacity: 0, transition: 'opacity 0.5s' }}>The imposter was</h1>
                        <div className="Player"
                            ref={fourthElementRef}
                            style={{ opacity: 0, transition: 'opacity 2s' }}>
                            <div
                                className="Circle"
                                style={{ background: `${clientGameOBJ.state.currentImposter.color}` }}>
                                {clientGameOBJ.state.currentImposter.name.charAt(0)}
                            </div>
                            <div className="Name">
                                {clientGameOBJ.state.currentImposter.name}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="RoundEnd">

                    {finalRound ? (
                        <>
                            <div className="Header">
                                Game over
                                <button className="Next-Round-BTN" onClick={() => { navigate("../") }}>Leave</button>
                            </div>
                            <div className="Winner-Container">
                                <h1>{winners.length > 1 ? "The winners are" : "The winner is"}</h1>
                                {winners.map(player => (
                                    <div key={player.id} className="Player">
                                        <div className="Circle" style={{ background: `${player.color}` }}>
                                            {clientGameOBJ.state.totalScores[player.id]}
                                        </div>
                                        <div className="Name">
                                            {player.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="Header">
                                Scores
                                {clientPlayerID === clientGameOBJ.hostId && (
                                    <button className="Next-Round-BTN" onClick={startNextRound}>Next Round</button>
                                )}
                            </div>
                            Waiting for host to start next round
                            <div className="Scores-Container">
                                {clientGameOBJ.players
                                    .sort((a, b) => clientGameOBJ.state.totalScores[b.id] - clientGameOBJ.state.totalScores[a.id])  // Sort by score (high to low)
                                    .map((player) => (
                                        <div key={player.id} className="Player">
                                            <div className="Circle" style={{ background: `${player.color}` }}>
                                                {clientGameOBJ.state.totalScores[player.id]}
                                            </div>
                                            <div className="Name">
                                                {player.name}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    )}



                </div>
            )}

        </>
    );
}