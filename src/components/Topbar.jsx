
import "./Topbar.css";

function Topbar({ searchQuery = "", onSearch, onNavigate }) {
function updateSearch(event) {
if (typeof onSearch === "function") onSearch(event.target.value);
}

return (
<header className="music-topbar">
<div className="topbar-welcome">
<p className="topbar-eyebrow">YOUR PERSONAL MUSIC SPACE</p>
<h1>Find your rhythm.</h1>
</div>
<div className="topbar-actions">
<label className="topbar-search">
<span className="search-symbol" aria-hidden="true">⌕</span>
<input type="search" placeholder="Search songs or artists..." value={searchQuery} onChange={updateSearch} aria-label="Search songs or artists" />
</label>
<button className="topbar-home-button" type="button" onClick={() => onNavigate?.("home")}>Home</button>
</div>
</header>
);
}

export default Topbar;
