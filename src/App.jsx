import { useState } from 'react';
import CRTOverlay from './components/CRTOverlay.jsx';
import BootScreen from './components/BootScreen.jsx';
import Terminal from './components/Terminal.jsx';
import SoundToggle from './components/SoundToggle.jsx';
import TuiWindow from './components/TuiWindow.jsx';
import { useSound } from './hooks/useSound.js';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [gui, setGui] = useState(false);
  const sound = useSound();

  return (
    <main className="page">
      <div className="crt-screen">
        {!booted && (
          <BootScreen onComplete={() => setBooted(true)} onBootSound={sound.boot} />
        )}
        <Terminal
          active={booted}
          onRequestGui={() => setGui(true)}
          onKeyFeedback={sound.keypress}
        />
        <CRTOverlay />
      </div>
      <SoundToggle enabled={sound.enabled} onToggle={sound.toggle} />
      {gui && <TuiWindow onClose={() => setGui(false)} />}
    </main>
  );
}
