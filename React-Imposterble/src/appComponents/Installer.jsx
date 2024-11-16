// IMPORTS 
// Styles 
import "./Installer.css"
// React 
import { useState, useEffect } from "react"


// COMPIOENENT 
export const Installer = ({ setBypass, setShowInstallPrompt }) => {

    const [bannerShowing, setBannerShowing] = useState(true);

    // Handler
    const changeBannerState = () => {
        setBannerShowing((prev) => !prev)
    }

    // bypass
    const bypass = (() => {
        let clickCount = 0;  // This state will persist across invocations of the closure
        return () => {
            clickCount++;  // Increment the click count on each click
            console.log(`Clicked ${clickCount} times`);

            if (clickCount === 5) {
                setBypass(true)
                alert("bypass true")
                setShowInstallPrompt(false)
                // Here you would trigger any action (e.g., setShowInstallPrompt(false))
            }
        };
    })();


    return (
        <div className="Installer">

            <div className="Banner" style={{ transform: bannerShowing ? "translateY(-0%)" : "translateY(-70%)" }}>
                <div className="Banner-Top">
                    <div>Imposterble</div>
                    <div>Install the app!</div>
                </div>

                <button className="Main-BTN" onClick={changeBannerState}>Install now</button>

            </div>

            <div className="Top">
                No app store download needed
            </div>

            <div className="Mid">
                <div className="White-Box">
                    <div className="Icon"><img src="/Share.png" /></div>
                    <div className="Text" style={{ borderBottom: "1px solid #ebebed" }}>Tap the share icon</div>

                    <div className="Icon"><img src="/Add.png" style={{ width: "35px" }} /></div>
                    <div className="Text" style={{ borderBottom: "1px solid #ebebed" }}>Tap add to homescreen</div>

                    <div className="Icon">Add</div>
                    <div className="Text">Tap Add</div>
                </div>
            </div>

            <div className="Bot">
                <img onClick={bypass} src="/VF_Icon96.png" />
                imposterble
            </div>

        </div>
    )
}