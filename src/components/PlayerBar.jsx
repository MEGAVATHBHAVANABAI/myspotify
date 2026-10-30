import { usePlayer } from "../context/PlayerContext";
import "./PlayerBar.css";

function formatTime(seconds) {
if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
const minutes = Math.floor(seconds / 60);
const remainingSeconds = Math.floor(seconds % 60);
return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function PlayerBar() {
const { currentTrack, isPlaying, currentTime, 
    duration, volume, playbackError, togglePlay, playNext, 
    playPrevious, seekTo, changeVolume } = usePlayer();
const hasTrack = Boolean(currentTrack);
const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

return (
<footer className="player-bar">
<div className="player-track-info">
{hasTrack ? (
<>
<div className="player-cover" style={{ background: currentTrack.cover }} aria-hidden="true">♫</div>
<div className="player-track-text">
<span className="player-track-title">{currentTrack.title}</span>
<span className="player-track-artist">{currentTrack.artist}</span>
</div>
</>
) : (
<div className="player-track-text">
<span className="player-track-title">Nothing playing</span>
<span className="player-track-artist">Choose a track to begin</span>
</div>
)}
</div>
<div className="player-center">
<div className="player-buttons">
<button className="player-control-button" type="button" 
   onClick={playPrevious} disabled={!hasTrack} aria-label="Previous track" 
   title="Previous track">|◀
</button>
<button className="player-main-button" type="button"
   onClick={togglePlay} disabled={!hasTrack} aria-label={isPlaying ? "Pause" : "Play"} 
   title={isPlaying ? "Pause" : "Play"}>{isPlaying ? "Ⅱ" : "▶"}
</button>
<button className="player-control-button" type="button" 
    onClick={playNext} disabled={!hasTrack} aria-label="Next track" title="Next track">▶|
</button>
</div>
<div className="player-progress">
<span className="player-time">{formatTime(currentTime)}</span>
<input className="progress-slider" 
   type="range" min="0" max={duration || 0} step="1" 
   value={Math.min(currentTime, duration || 0)} 
   onChange={(event) => seekTo(event.target.value)} style={{ "--progress": `${progress}%` }} 
   aria-label="Seek through track" disabled={!hasTrack || duration <= 0} />
<span className="player-time">{formatTime(duration)}</span>
</div>
{playbackError && <p className="player-error" role="status">{playbackError}</p>}
</div>
<div className="player-volume">
<span aria-hidden="true">♫</span>
<input type="range" min="0" max="1" step="0.05" 
   value={volume} onChange={(event) => changeVolume(event.target.value)} 
   aria-label="Volume" className="volume-slider" 
   style={{ "--volume": `${volume * 100}%` }} />
</div>
</footer>
);
}

export default PlayerBar;