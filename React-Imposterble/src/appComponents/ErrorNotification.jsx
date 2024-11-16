// IMPIRTS 
// Styles 
import "./ErrorNotification.css"


// COMPOENENT 
export const ErrorNotification = ({message}) => { 
    return ( 
        <div className="ErrorNotification">
            {message}
        </div>
    )
}