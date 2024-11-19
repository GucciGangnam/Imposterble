// IMPORTS 
// Styles 
import "./App.css"
// React
import { useState, useEffect } from "react"
// RRD 
import { Routes, Route } from "react-router-dom"
// Pages
import { HomePage } from "./pages/home/HomePage"
import { HostGame } from "./pages/home/HostGame"
import { JoinGame } from "./pages/home/JoinGame"
import { Howtoplay } from "./pages/home/Howtoplay"
import { GamePage } from "./pages/game/GamePage"

// Components
import { Installer } from "./appComponents/Installer"



// COMPONENT
function App() {


  const [agent, setAgent] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false); 
  const [bypass, setBypass] = useState(false);

  const determinClientAgent = () => {
    
    if(bypass){ 
      return;
    }
    // Check if the app is running as a PWA (standalone mode)
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || (navigator.standalone === true);
    if (isPWA) {
      setShowInstallPrompt(false); // No install prompt if it's a PWA
      return;
    }

    // Detect if the user is on a desktop or mobile
    const isMobile = /iphone|ipod|android|windows phone/i.test(navigator.userAgent.toLowerCase());

    if (!isMobile) {
      // User is on desktop, do nothing
      setAgent('Desktop');
      setShowInstallPrompt(false); // No prompt for desktop users
      return;
    }

    // User is on a mobile device, check if Android or iPhone
    if (/iphone|ipod/i.test(navigator.userAgent.toLowerCase())) {
      setAgent('iPhone');
      setShowInstallPrompt(true); // Show prompt for iPhone users
    } else if (/android/i.test(navigator.userAgent.toLowerCase())) {
      setAgent('Android');
      setShowInstallPrompt(true); // Show prompt for Android users
    }
  };

  useEffect(() => {
    determinClientAgent();
  }, []);


  return (
    <div className="App">

      {showInstallPrompt ? (
        <Installer setBypass={setBypass} setShowInstallPrompt={setShowInstallPrompt} />
      ):(
      <Routes>
        {/* HomePages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/hostgame" element={<HostGame />} />
        <Route path="/joingame" element={<JoinGame />} />
        <Route path="/howtoplay" element={<Howtoplay />} />
        {/* GamePages */}
        <Route path="/game/:lobbycode" element={<GamePage />} />
      </Routes>
      )}




    </div>
  )
}

export default App


