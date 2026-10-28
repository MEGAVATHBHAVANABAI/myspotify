
import "./TrackList.css";

function TrackList({ tracks = [], currentTrack, isPlaying = false, onPlayTrack }) {
if (!tracks.length) {
return (
<section className="track-section">
<div className="track-section-heading"><p>YOUR COLLECTION</p><h2>No tracks found</h2></div>
<p className="track-empty-message">Try another search or choose a different playlist.</p>
</section>
);
}

return (
<section className="track-section">
<div className="track-section-heading">
<div><p>YOUR COLLECTION</p><h2>Made for your mood</h2></div>
<span className="track-count">{tracks.length} tracks</span>
</div>
<div className="track-table">
<div className="track-table-heading"><span>#</span><span>TRACK</span><span>ALBUM</span><span>TIME</span><span></span></div>
{tracks.map((track, index) => {
const selected = currentTrack?.id === track.id;
return (
<button className={`track-row ${selected ? "track-selected" : ""}`} key={track.id} type="button" onClick={() => onPlayTrack?.(track)} aria-label={`Play ${track.title} by ${track.artist}`}>
<span className="track-index">{selected && isPlaying ? "♫" : String(index + 1).padStart(2, "0")}</span>
<span className="track-main">
<span className="track-cover" style={{ background: track.cover }} aria-hidden="true">♪</span>
<span className="track-details">
<span className="track-title">{track.title}</span>
<span className="track-artist">{track.artist}</span>
</span>
</span>
<span className="track-album">{track.album}</span>
<span className="track-duration">{track.duration}</span>
<span className="track-play-icon" aria-hidden="true">{selected && isPlaying ? "Ⅱ" : "▶"}</span>
</button>
);
})}
</div>
</section>
);
}

export default TrackList;
