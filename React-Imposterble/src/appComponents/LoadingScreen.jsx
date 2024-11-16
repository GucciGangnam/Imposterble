// IMPORTS 
// Styles 
import "./LoadingScreen.css"

// COMPONENENT 
export const LoadingScreen = ({message}) => {
    return (
        <div className="LoadingScreen">

            {message}
            <div className="Container">
                <div className="Dot"/>
                <div className="Dot"/>
                <div className="Dot"/>
                <div className="Dot"/>
                <div className="Dot"/>
            </div>

        </div>
    )
}