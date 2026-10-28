import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import TrackList from "./components/TrackList";
import PlayerBar from "./components/PlayerBar";
import { tracks } from "./data/tracks";
import { usePlayer } from "./context/PlayerContext";
import "./App.css";

const albums = [
{ id: "album-1", title: "Midnight Memories", artist: "The Night Owls", cover: "linear-gradient(135deg,#28245c,#ba6bc4)" },
{ id: "album-2", title: "Golden Hour", artist: "Luna Grey", cover: "linear-gradient(135deg,#e9a23b,#8e443c)" },
{ id: "album-3", title: "Ocean Eyes", artist: "Blue Avenue", cover: "linear-gradient(135deg,#145a79,#63c5da)" },
{ id: "album-4", title: "After the Rain", artist: "Maya Rose", cover: "linear-gradient(135deg,#526d55,#b6c88b)" },
{ id: "album-5", title: "Electric Dreams", artist: "Neon Pulse", cover: "linear-gradient(135deg,#4b176d,#ed4e91)" },
{ id: "album-6", title: "Soft Horizons", artist: "Aria Wells", cover: "linear-gradient(135deg,#755b45,#d6b98c)" }
];

const radioStations = [
{ id: "radio-1", title: "Pop Radio", artist: "With today's pop hits", cover: "linear-gradient(135deg,#d83c71,#f4a261)" },
{ id: "radio-2", title: "Chill Radio", artist: "Relax and unwind", cover: "linear-gradient(135deg,#214e75,#80b8c8)" },
{ id: "radio-3", title: "Indie Radio", artist: "Discover indie sounds", cover: "linear-gradient(135deg,#315b45,#b7c979)" },
{ id: "radio-4", title: "Rock Radio", artist: "Classic and modern rock", cover: "linear-gradient(135deg,#5b2222,#d47b42)" },
{ id: "radio-5", title: "Focus Radio", artist: "Music for concentration", cover: "linear-gradient(135deg,#39345f,#9a8cda)" },
{ id: "radio-6", title: "Dance Radio", artist: "Keep the energy going", cover: "linear-gradient(135deg,#651b7c,#e45ac2)" }
];

const featuredCharts = [
{ id: "chart-1", title: "Top Songs - Global", artist: "The most played songs worldwide", cover: "linear-gradient(135deg,#147c48,#65d6a0)" },
{ id: "chart-2", title: "Top Songs - India", artist: "Popular songs in India", cover: "linear-gradient(135deg,#e88a24,#c52e49)" },
{ id: "chart-3", title: "Top 50 - Global", artist: "Your daily update of the most played tracks", cover: "linear-gradient(135deg,#153e7e,#4588df)" },
{ id: "chart-4", title: "Top 50 - India", artist: "The most played tracks in India", cover: "linear-gradient(135deg,#7a245b,#e66c9c)" },
{ id: "chart-5", title: "Viral 50 - Global", artist: "Trending songs around the world", cover: "linear-gradient(135deg,#473078,#a78bfa)" },
{ id: "chart-6", title: "Viral 50 - India", artist: "Songs gaining popularity in India", cover: "linear-gradient(135deg,#8b4a1b,#edbc61)" }
];

const footerGroups = [
{
title: "Company",
links: [
["About", "https://www.spotify.com/in-en/about-us/contact/"],
["Jobs", "https://www.lifeatspotify.com/"],
["For the Record", "https://newsroom.spotify.com/"]
]
},
{
title: "Communities",
links: [
["For Artists", "https://artists.spotify.com/"],
["For Creators", "https://creators.spotify.com/"],
["For Authors", "https://authors.spotify.com/"],
["Developers", "https://developer.spotify.com/"],
["Advertising", "https://ads.spotify.com/"],
["Investors", "https://investors.spotify.com/"],
["Vendors", "https://spotifyforvendors.com/"]
]
},
{
title: "Useful links",
links: [
["Support", "https://support.spotify.com/"],
["Free Mobile App", "https://www.spotify.com/in-en/free/"],
["Popular by Country", "https://open.spotify.com/popular-in/in"],
["Top Song Lyrics", "https://open.spotify.com/playlist/37i9dQZF1CLcTo7UzL0sYK"],
["Import your music", "https://www.spotify.com/in-en/import-music/"]
]
},
{
title: "Spotify Plans",
links: [
["Premium Standard", "https://www.spotify.com/in-en/premium/#plans"],
["Premium Platinum", "https://www.spotify.com/in-en/platinum/#ref=spotifycom_footer_platinum"],
["Premium Student", "https://www.spotify.com/in-en/student/#ref=spotifycom_footer_premium_student"],
["Spotify Free", "https://www.spotify.com/in-en/free/#ref=spotifycom_footer_free"]
]
}
];

function App() {
const [activeView, setActiveView] = useState("home");
const [searchQuery, setSearchQuery] = useState("");
const [selectedPlaylist, setSelectedPlaylist] = useState(null);
const { currentTrack, isPlaying, playTrack } = usePlayer();

const visibleTracks = useMemo(() => {
let collection = tracks;

if (activeView === "library" && selectedPlaylist) {
collection = tracks.filter((track) =>
selectedPlaylist.trackIds.includes(track.id)
);
}

const query = searchQuery.trim().toLowerCase();

if (query) {
collection = collection.filter((track) =>
`${track.title} ${track.artist} ${track.album}`
.toLowerCase()
.includes(query)
);
}

return collection;
}, [activeView, selectedPlaylist, searchQuery]);

function handleNavigate(view) {
setActiveView(view);

if (view !== "library") {
setSelectedPlaylist(null);
}

if (view === "home") {
setSearchQuery("");
}
}

function handleSelectPlaylist(playlist) {
setSelectedPlaylist(playlist);
setActiveView("library");
setSearchQuery("");
}

function handleSearchItem(title) {
setSearchQuery(title);
setActiveView("search");
setSelectedPlaylist(null);
}

const showHomeSections = activeView === "home" && !searchQuery.trim();

const pageTitle =
activeView === "search"
? "Explore music"
: activeView === "library"
? selectedPlaylist?.name || "Your Library"
: "Trending songs";

function renderCards(items, type) {
return (
<div className="trending-grid">
{items.map((item) => (
<button
className="trending-card"
key={item.id}
type="button"
onClick={() => {
if (type === "track") {
playTrack(item);
} else {
handleSearchItem(item.title);
}
}}
>
<span
className="trending-cover"
style={{ background: item.cover }}
aria-hidden="true"
>
♫
</span>
<span className="trending-title">{item.title}</span>
<span className="trending-artist">
{type === "album" ? `Album · ${item.artist}` : item.artist}
</span>
</button>
))}
</div>
);
}

return (
<div className="app-shell">
<header className="app-header">
<button className="app-logo" type="button" onClick={() => handleNavigate("home")} aria-label="Go to Home">♫</button>
<button className="app-home-button" type="button" onClick={() => handleNavigate("home")} aria-label="Home">⌂</button>
<div className="app-search">
<Topbar searchQuery={searchQuery} onSearch={setSearchQuery} onNavigate={handleNavigate} />
</div>
<div className="header-links">
<button type="button" onClick={() => handleNavigate("library")}>Premium</button>
<button type="button" onClick={() => handleNavigate("search")}>Support</button>
<button type="button" onClick={() => handleNavigate("search")}>Download</button>
<span className="header-divider"></span>
<button type="button" onClick={() => handleNavigate("library")}>Sign up</button>
<button className="header-login" type="button" onClick={() => handleNavigate("home")}>Log in</button>
</div>
</header>

<div className="app-workspace">
<Sidebar
activeView={activeView}
onNavigate={handleNavigate}
onSelectPlaylist={handleSelectPlaylist}
/>

<main className="app-main">
{showHomeSections && (
<>
<section className="music-section">
<div className="music-section-heading">
<h1>Trending songs</h1>
<button type="button" onClick={() => handleNavigate("search")}>Show all</button>
</div>
{renderCards(tracks.slice(0, 6), "track")}
</section>

<section className="music-section artist-section">
<div className="music-section-heading">
<h2>Popular artists</h2>
<button type="button" onClick={() => handleNavigate("search")}>Show all</button>
</div>
<div className="artist-grid">
{[...new Set(tracks.map((track) => track.artist))].map((artist, index) => (
<button className="artist-card" type="button" key={artist} onClick={() => handleSearchItem(artist)}>
<span className={`artist-avatar artist-avatar-${index % 4}`} aria-hidden="true">{artist.slice(0, 1)}</span>
<span>{artist}</span>
<small>Artist</small>
</button>
))}
</div>
</section>

<section className="music-section">
<div className="music-section-heading">
<h2>Popular albums</h2>
<button type="button" onClick={() => handleNavigate("search")}>Show all</button>
</div>
{renderCards(albums, "album")}
</section>

<section className="music-section">
<div className="music-section-heading">
<h2>Popular radio</h2>
<button type="button" onClick={() => handleNavigate("search")}>Show all</button>
</div>
{renderCards(radioStations, "radio")}
</section>

<section className="music-section">
<div className="music-section-heading">
<h2>Featured Charts</h2>
<button type="button" onClick={() => handleNavigate("search")}>Show all</button>
</div>
{renderCards(featuredCharts, "chart")}
</section>

<footer className="spotify-footer">
<div className="spotify-footer-columns">
{footerGroups.map((group) => (
<div className="spotify-footer-column" key={group.title}>
<h3>{group.title}</h3>
{group.links.map(([label, url]) => (
<a key={label} href={url} target="_blank" rel="noreferrer">
{label}
</a>
))}
</div>
))}
<div className="spotify-social-links">
<a href="https://www.instagram.com/spotify/" target="_blank" rel="noreferrer" aria-label="Spotify on Instagram">◎</a>
<a href="https://www.facebook.com/Spotify" target="_blank" rel="noreferrer" aria-label="Spotify on Facebook">f</a>
<a href="https://x.com/spotify" target="_blank" rel="noreferrer" aria-label="Spotify on X">𝕏</a>
</div>
</div>

<div className="spotify-footer-divider"></div>

<div className="spotify-footer-bottom">
<div className="spotify-legal-links">
<a href="https://www.spotify.com/in-en/legal/" target="_blank" rel="noreferrer">Legal</a>
<a href="https://www.spotify.com/in-en/safetyandprivacy/" target="_blank" rel="noreferrer">Safety &amp; Privacy Center</a>
<a href="https://www.spotify.com/in-en/legal/privacy-policy/" target="_blank" rel="noreferrer">Privacy Policy</a>
<a href="https://www.spotify.com/in-en/legal/cookies-policy/" target="_blank" rel="noreferrer">Cookies</a>
<a href="https://www.spotify.com/in-en/legal/privacy-policy/#s3" target="_blank" rel="noreferrer">About Ads</a>
<a href="https://www.spotify.com/in-en/accessibility/" target="_blank" rel="noreferrer">Accessibility</a>
</div>
<span>© 2026 Spotify Replica</span>
</div>
</footer>
</>
)}

<section className="music-section track-results">
<div className="music-section-heading">
<h2>
{searchQuery.trim()
? "Search results"
: activeView === "home"
? "Your music"
: pageTitle}
</h2>
<span className="results-count">{visibleTracks.length} tracks</span>
</div>
<TrackList
tracks={visibleTracks}
currentTrack={currentTrack}
isPlaying={isPlaying}
onPlayTrack={playTrack}
/>
</section>
</main>
</div>

<PlayerBar />
</div>
);
}

export default App;
