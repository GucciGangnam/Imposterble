// IMPORTS 
// Styles 
import "./PlayPage.css"
// States 
import { useState, useEffect } from "react"
// Param s
import { useParams } from "react-router-dom"

// componenet s
import { LoadingGame } from "./LoadingGame"
import { CategoriesPage } from "./CategoriesPage"



// COMPONENT 
export const PlayPage = ({ clientGameOBJ, clientPlayerID, socketRef }) => {
    // Params 
    const { lobbycode } = useParams();
    // Pre Page Loading Animations
    const [stage, setStage] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            setStage(1)
        }, 6000)
        setTimeout(() => {
            setStage(2)
        }, 12000)
    }, [])

    const [secretShowing, setSecretShowing] = useState(true);
    // Handle show/hide
    const toggleShow = () => {
        setSecretShowing((prev) => !prev)
    }

    // Game LOgic 
    const handleVoteForPlayer = (playerID) => {
        if (playerID === clientPlayerID) {
            return;
        }
        if (socketRef.current) {
            socketRef.current.emit('voteForPlayer', { lobbyCode: lobbycode, playerID: clientPlayerID, votedID: playerID });
        }
    }


    return (
        <>
            {stage === 0 && (
                <CategoriesPage clientGameOBJ={clientGameOBJ} />
            )}
            {stage === 1 && (
                <LoadingGame />
            )}
            {stage === 2 && (
                <div className="PlayPage">
                    <div className="Header">
                        <div className="Timer">
                            ∞
                        </div>
                        Impopsterble
                        <button onClick={toggleShow}>{secretShowing ? "Hide" : "Show"}</button>
                    </div>

                    {secretShowing && (
                        <div className="Container Top">
                            <div className="Container-Name">
                                {clientGameOBJ.state.currentCategory.name}
                            </div>
                            <div className="SecretWord">
                                {clientGameOBJ.state.currentImposter.id === clientPlayerID ? (
                                    <>You're the imposter</>
                                ) : (
                                    <>{clientGameOBJ.state.currentSecret}</>

                                )}

                            </div>
                        </div>
                    )}


                    <div className="Container Bottom">
                        <div className="Container-Name">
                            Click to vote
                        </div>

                        <div className="Votes-Ratio">
                            {
                                // Count the number of non-null values in roundVotes
                                Object.values(clientGameOBJ.state.roundVotes).filter(vote => vote !== null).length
                            }
                            {" / "}
                            {clientGameOBJ.players.length}
                        </div>


                        {clientGameOBJ.players.map((player) => {
                            // Calculate the number of votes this player has received
                            const voteCount = Object.values(clientGameOBJ.state.roundVotes).filter(
                                votedID => votedID === player.id
                            ).length;

                            return (
                                <div
                                    key={player.id}
                                    className="Player">
                                    <div
                                        onClick={() => { handleVoteForPlayer(player.id) }}
                                        className="Circle"
                                        style={
                                            {
                                                background: player.color,
                                                outline: clientGameOBJ.state.roundVotes[clientPlayerID] === player.id ? "2px solid red" : ""
                                            }
                                        }>
                                        {player.name.charAt(0)}
                                        <div
                                            className="Vote-Count"
                                            style={{ display: voteCount === 0 ? "none" : "flex" }}>{voteCount}</div>
                                    </div>
                                    <div className="Name">{player.name}</div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            )}

        </>




    )
}