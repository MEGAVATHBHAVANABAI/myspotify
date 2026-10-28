
import { useState } from "react";
import { playlists } from "../data/tracks";
import "./Sidebar.css";

function Sidebar({ activeView = "home", onNavigate, onSelectPlaylist }) {
const [showPlaylists, setShowPlaylists] = useState(true);

return (
<aside className="music-sidebar">
<div className="library-heading">
<h2>Your Library</h2>
<button type="button" className="library-create" onClick={() => setShowPlaylists((value) => !value)} aria-expanded={showPlaylists}><span>＋</span> Create</button>
</div>
<div className="library-content">
<div className="library-prompt">
<h3>Create your first playlist</h3>
<p>It's easy, we'll help you</p>
<button type="button" onClick={() => setShowPlaylists(true)}>Create playlist</button>
</div>
<div className="library-prompt podcast-prompt">
<h3>Let's find some podcasts to follow</h3>
<p>We'll keep you updated on new episodes</p>
<button type="button" onClick={() => onNavigate?.("search")}>Browse podcasts</button>
</div>
</div>
{showPlaylists && <section className="library-playlists"><h3>Your playlists</h3>{playlists.map((playlist) => <button type="button" key={playlist.id} className={`library-playlist-item ${activeView === "library" ? "library-playlist-active" : ""}`} onClick={() => onSelectPlaylist?.(playlist)}><span className="library-playlist-cover" style={{ background: playlist.cover }} aria-hidden="true">♫</span><span className="library-playlist-name">{playlist.name}</span></button>)}</section>}
<footer className="library-footer">
<div className="library-footer-links"><a href="#legal">Legal</a><a href="#safety">Safety &amp; Privacy Center</a><a href="#privacy">Privacy Policy</a><a href="#cookies">Cookies</a><a href="#accessibility">Accessibility</a></div>
<button type="button" className="library-language" onClick={() => onNavigate?.("home")}>◎ English</button>
</footer>
</aside>
);
}

export default Sidebar;
