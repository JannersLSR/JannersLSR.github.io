import { useEffect, useRef } from 'react';

// Canvas Matrix rain. Runs ~5s then calls onDone.
export default function MatrixRain({ onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let stopped = false;

    const chars = 'アカサタナハマヤラワabcdefghijklmnopqrstuvwxyz0123456789@#$%&'.split('');
    const fontSize = 16;
    let columns, drops;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#39ff14';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      if (!stopped) raf = requestAnimationFrame(draw);
    };
    draw();

    const timer = setTimeout(() => {
      stopped = true;
      onDone?.();
    }, 5000);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener('resize', resize);
    };
  }, [onDone]);

  return (
    <div className="matrix-overlay" onClick={onDone} role="presentation">
      <canvas ref={canvasRef} className="matrix-canvas" />
      <div className="matrix-hint">click to exit</div>
    </div>
  );
}
