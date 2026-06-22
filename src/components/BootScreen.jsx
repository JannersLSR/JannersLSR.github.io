import { useEffect, useRef, useState } from 'react';
import { BOOT_SEQUENCE } from '../lib/bootSequence.js';

export default function BootScreen({ onComplete, onBootSound }) {
  const [shown, setShown] = useState([]);
  const doneRef = useRef(false);
  const timers = useRef([]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    timers.current.forEach(clearTimeout);
    onComplete();
  };

  const skip = () => {
    if (doneRef.current) return;
    timers.current.forEach(clearTimeout);
    setShown(BOOT_SEQUENCE);
    const t = setTimeout(finish, 350);
    timers.current.push(t);
  };

  useEffect(() => {
    onBootSound?.();
    let acc = 0;
    BOOT_SEQUENCE.forEach((line, i) => {
      acc += line.delay;
      const t = setTimeout(() => {
        setShown((prev) => [...prev, line]);
        if (i === BOOT_SEQUENCE.length - 1) {
          const f = setTimeout(finish, 600);
          timers.current.push(f);
        }
      }, acc);
      timers.current.push(t);
    });

    const onKey = () => skip();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="boot-screen" onClick={skip} role="presentation">
      <div className="boot-inner crt-on">
        {shown.map((line, i) => (
          <div key={i} className={`term-line type-${line.type || 'normal'}`}>
            {line.text || ' '}
          </div>
        ))}
      </div>
    </div>
  );
}
