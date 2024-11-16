// IMPORTS 
// Style 
import "./LoadingGame.css";
// React 
import { useState, useEffect } from "react";

// COMPONENT 
export const LoadingGame = () => { 
    // States 
    const [count, setCount] = useState(5);

    useEffect(() => {
        // Only set the interval if count is above 0
        if (count > 0) {
            const countdown = setInterval(() => {
                setCount(prevCount => prevCount - 1);
            }, 1000);

            // Cleanup interval on component unmount or when count changes
            return () => clearInterval(countdown);
        }
    }, [count]); // Dependency array includes count

    return ( 
        <div className="LoadingGame">
            <div className="Circle"></div>
            <div className="Number">{count}</div>
        </div>
    );
};