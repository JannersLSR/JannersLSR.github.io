// Fixed top-right audio toggle. Muted by default.
export default function SoundToggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={onToggle}
      tabIndex={-1}
      aria-label={enabled ? 'Mute sound' : 'Unmute sound'}
      title={enabled ? 'Sound on — click to mute' : 'Sound off — click to unmute'}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
