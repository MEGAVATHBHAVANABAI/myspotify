import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import TrackList from "./components/TrackList";
import PlayerBar from "./components/PlayerBar";
import { tracks } from "./data/tracks";
import { usePlayer } from "./context/PlayerContext";
import "./App.css";

const albums = [
{id:"album-1",title:"Midnight Memories",artist:"The Night Owls",cover:"linear-gradient(135deg,#28245c,#ba6bc4)"},
{id:"album-2",title:"Golden Hour",artist:"Luna Grey",cover:"linear-gradient(135deg,#e9a23b,#8e443c)"},
{id:"album-3",title:"Ocean Eyes",artist:"Blue Avenue",cover:"linear-gradient(135deg,#145a79,#63c5da)"},
{id:"album-4",title:"After the Rain",artist:"Maya Rose",cover:"linear-gradient(135deg,#526d55,#b6c88b)"},
{id:"album-5",title:"Electric Dreams",artist:"Neon Pulse",cover:"linear-gradient(135deg,#4b176d,#ed4e91)"},
{id:"album-6",title:"Soft Horizons",artist:"Aria Wells",cover:"linear-gradient(135deg,#755b45,#d6b98c)"}
];

const radioStations = [
{id:"radio-1",title:"Pop Radio",artist:"With today's pop hits",cover:"linear-gradient(135deg,#d83c71,#f4a261)"},
{id:"radio-2",title:"Chill Radio",artist:"Relax and unwind",cover:"linear-gradient(135deg,#214e75,#80b8c8)"},
{id:"radio-3",title:"Indie Radio",artist:"Discover indie sounds",cover:"linear-gradient(135deg,#315b45,#b7c979)"},
{id:"radio-4",title:"Rock Radio",artist:"Classic and modern rock",cover:"linear-gradient(135deg,#5b2222,#d47b42)"},
{id:"radio-5",title:"Focus Radio",artist:"Music for concentration",cover:"linear-gradient(135deg,#39345f,#9a8cda)"},
{id:"radio-6",title:"Dance Radio",artist:"Keep the energy going",cover:"linear-gradient(135deg,#651b7c,#e45ac2)"}
];

const featuredCharts = [
{id:"chart-1",title:"Top Songs - Global",artist:"The most played songs worldwide",cover:"linear-gradient(135deg,#147c48,#65d6a0)"},
{id:"chart-2",title:"Top Songs - India",artist:"Popular songs in India",cover:"linear-gradient(135deg,#e88a24,#c52e49)"},
{id:"chart-3",title:"Top 50 - Global",artist:"Your daily update of the most played tracks",cover:"linear-gradient(135deg,#153e7e,#4588df)"},
{id:"chart-4",title:"Top 50 - India",artist:"The most played tracks in India",cover:"linear-gradient(135deg,#7a245b,#e66c9c)"},
{id:"chart-5",title:"Viral 50 - Global",artist:"Trending songs around the world",cover:"linear-gradient(135deg,#473078,#a78bfa)"},
{id:"chart-6",title:"Viral 50 - India",artist:"Songs gaining popularity in India",cover:"linear-gradient(135deg,#8b4a1b,#edbc61)"}
];

const footerGroups = [
{title:"Company",links:[["About","https://www.spotify.com/in-en/about-us/contact/"],["Jobs","https://www.lifeatspotify.com/"],["For the Record","https://newsroom.spotify.com/"]]},
{title:"Communities",links:[["For Artists","https://artists.spotify.com/"],["For Creators","https://creators.spotify.com/"],["For Authors","https://authors.spotify.com/"],["Developers","https://developer.spotify.com/"],["Advertising","https://ads.spotify.com/"],["Investors","https://investors.spotify.com/"],["Vendors","https://spotifyforvendors.com/"]]},
{title:"Useful links",links:[["Support","https://support.spotify.com/"],["Free Mobile App","https://www.spotify.com/in-en/free/"],["Popular by Country","https://open.spotify.com/popular-in/in"],["Top Song Lyrics","https://open.spotify.com/playlist/37i9dQZF1CLcTo7UzL0sYK"],["Import your music","https://www.spotify.com/in-en/import-music/"]]},
{title:"Spotify Plans",links:[["Premium Standard","https://www.spotify.com/in-en/premium/"],["Premium Platinum","https://www.spotify.com/in-en/premium/"],["Premium Student","https://www.spotify.com/in-en/student/"],["Spotify Free","https://www.spotify.com/in-en/free/"]]}
];

const premiumPlans = [
{name:"Standard",price:"₹139",period:"month",yearPrice:"₹799",yearPeriod:"year",description:"For everyday music lovers",features:["1 Premium account","Ad-free music listening","Download and listen offline","Very high audio quality","Play songs in any order","Cancel anytime"],highlight:true},
{name:"Student",price:"₹69",period:"month",yearPrice:"₹828",yearPeriod:"year estimate",description:"For eligible college students",features:["1 verified Premium account","Ad-free music listening","Download and listen offline","Very high audio quality","Cancel anytime"],highlight:false},
{name:"Platinum",price:"₹299",period:"month",yearPrice:"₹3,588",yearPeriod:"12-month estimate",description:"For listeners who want more",features:["Up to 3 accounts at the same address","Lossless audio quality","Download and listen offline","AI DJ and AI playlist creation","Mix your playlists","Connect your DJ software"],highlight:false}
];

const premiumCardStyle = {
background:"#242424",
border:"1px solid #444",
borderRadius:"12px",
padding:"25px",
display:"flex",
flexDirection:"column",
gap:"15px",
minWidth:0
};

function App() {
const [activeView,setActiveView] = useState("home");
const [searchQuery,setSearchQuery] = useState("");
const [selectedPlaylist,setSelectedPlaylist] = useState(null);
const [loginOpen,setLoginOpen] = useState(false);
const [loginMessage,setLoginMessage] = useState("");
const [billing,setBilling] = useState("monthly");
const {currentTrack,isPlaying,playTrack} = usePlayer();

const visibleTracks = useMemo(() => {
let collection = tracks;
if(activeView === "library" && selectedPlaylist) {
collection = tracks.filter(track => selectedPlaylist.trackIds.includes(track.id));
}
const query = searchQuery.trim().toLowerCase();
if(query) {
collection = collection.filter(track => `${track.title} ${track.artist} ${track.album}`.toLowerCase().includes(query));
}
return collection;
},[activeView,selectedPlaylist,searchQuery]);

function handleNavigate(view) {
setActiveView(view);
if(view !== "library") setSelectedPlaylist(null);
if(view === "home") setSearchQuery("");
if(view === "premium") setSearchQuery("");
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

function openLogin() {
setLoginMessage("");
setLoginOpen(true);
}

function handleLoginSubmit(event) {
event.preventDefault();
setLoginMessage("Your details have been submitted in this demo. Connect a backend to enable real login.");
}

const showHomeSections = activeView === "home" && !searchQuery.trim();
const pageTitle = activeView === "search" ? "Explore music" : activeView === "library" ? selectedPlaylist?.name || "Your Library" : "Trending songs";

function renderCards(items,type) {
return (
<div className="trending-grid">
{items.map(item => (
<button className="trending-card" key={item.id} type="button" onClick={() => type === "track" ? playTrack(item) : handleSearchItem(item.title)}>
<span className="trending-cover" style={{background:item.cover}} aria-hidden="true">♫</span>
<span className="trending-title">{item.title}</span>
<span className="trending-artist">{type === "album" ? `Album · ${item.artist}` : item.artist}</span>
</button>
))}
</div>
);
}

function renderPremiumPage() {
return (
<section style={{ padding: "10px 0 50px", color: "#fff" }}>

{/* Premium Header */}
<div style={{
textAlign: "center",
padding: "35px 15px 45px",
background: "linear-gradient(135deg,#202020,#302052)",
borderRadius: "14px",
marginBottom: "35px"
}}>

<p style={{
color: "#1ed760",
fontWeight: "700",
letterSpacing: "2px"
}}>
SPOTIFY PREMIUM
</p>

<h1 style={{
fontSize: "clamp(30px,5vw,52px)",
fontWeight: "900",
margin: "12px 0"
}}>
Listen without limits.
</h1>

<p style={{
color: "#ddd",
fontSize: "15px",
lineHeight: "1.7",
maxWidth: "600px",
margin: "0 auto"
}}>
Enjoy ad-free music, offline listening and more. Choose the Premium plan that fits your listening style.
</p>

{/* Monthly and Yearly Buttons */}
<div style={{
display: "flex",
justifyContent: "center",
gap: "10px",
marginTop: "25px",
flexWrap: "wrap"
}}>

<button
type="button"
onClick={() => setBilling("monthly")}
style={{
padding: "11px 22px",
borderRadius: "25px",
border: "1px solid #1ed760",
background: billing === "monthly" ? "#1ed760" : "transparent",
color: billing === "monthly" ? "#000" : "#fff",
fontWeight: "700",
cursor: "pointer"
}}>
Monthly
</button>

<button
type="button"
onClick={() => setBilling("yearly")}
style={{
padding: "11px 22px",
borderRadius: "25px",
border: "1px solid #1ed760",
background: billing === "yearly" ? "#1ed760" : "transparent",
color: billing === "yearly" ? "#000" : "#fff",
fontWeight: "700",
cursor: "pointer"
}}>
Yearly
</button>

</div>
</div>

{/* Premium Plans Heading */}
<h2 style={{
textAlign: "center",
fontSize: "28px",
marginBottom: "10px"
}}>
Choose your Premium plan
</h2>

<p style={{
textAlign: "center",
color: "#b3b3b3",
marginBottom: "30px"
}}>
All plans give you more ways to enjoy your music.
</p>

{/* Premium Plan Cards */}
<div style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,230px),1fr))",
gap: "18px"
}}>

{premiumPlans.map((plan) => (

<div
key={plan.name}
style={{
...premiumCardStyle,
border: plan.highlight ? "2px solid #1ed760" : "1px solid #444"
}}>

{/* Plan Name */}
<div style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
gap: "8px"
}}>

<span style={{
fontSize: "21px",
fontWeight: "800"
}}>
{plan.name}
</span>

{plan.highlight && (
<span style={{
background: "#1ed760",
color: "#000",
padding: "5px 9px",
borderRadius: "15px",
fontSize: "10px",
fontWeight: "800"
}}>
POPULAR
</span>
)}

</div>

{/* Plan Description */}
<p style={{
color: "#b3b3b3",
fontSize: "13px",
margin: 0
}}>
{plan.description}
</p>

{/* Plan Price */}
<div>

<strong style={{ fontSize: "32px" }}>
{billing === "monthly" ? plan.price : plan.yearPrice}
</strong>

<span style={{
color: "#b3b3b3",
fontSize: "13px"
}}>
/ {billing === "monthly" ? plan.period : plan.yearPeriod}
</span>

</div>

{/* Payment Information */}
<p style={{
fontSize: "12px",
color: "#b3b3b3",
margin: 0
}}>
{billing === "yearly" && plan.name !== "Standard"
? "Estimated cost for 12 months, paid monthly."
: billing === "yearly"
? "Prepaid one-time payment. Does not auto-renew."
: "Subscription price. Terms and eligibility apply."}
</p>

<hr style={{
borderColor: "#555",
width: "100%"
}} />

{/* Plan Features */}
<ul style={{
listStyle: "none",
padding: 0,
margin: 0,
display: "flex",
flexDirection: "column",
gap: "13px",
flex: 1
}}>

{plan.features.map((feature) => (

<li
key={feature}
style={{
fontSize: "13px",
color: "#eee"
}}>
✓ &nbsp;{feature}
</li>

))}

</ul>

{/* Choose Plan Button */}
<button
type="button"
onClick={openLogin}
style={{
marginTop: "15px",
padding: "13px",
border: 0,
borderRadius: "25px",
background: "#1ed760",
color: "#000",
fontWeight: "800",
cursor: "pointer"
}}>
Choose {plan.name}
</button>

</div>

))}

</div>

{/* Footer Information */}
<p style={{
fontSize: "11px",
color: "#999",
textAlign: "center",
marginTop: "25px",
lineHeight: "1.7"
}}>
Prices are displayed for the India region and may change.
Student plan requires eligibility verification.
The yearly Student and Platinum amounts are estimates based on 12 monthly payments.
Check the official Spotify page for current offers and terms.
</p>

</section>
);
}

return (
<div className="app-shell">
<header className="app-header">
<button className="app-logo" type="button" onClick={() => handleNavigate("home")} aria-label="Go to Home">♫</button>
<button className="app-home-button" type="button" onClick={() => handleNavigate("home")} aria-label="Home">⌂</button>
<div className="app-search">
<Topbar searchQuery={searchQuery} onSearch={setSearchQuery} onNavigate={handleNavigate}/>
</div>
<div className="header-links">
<button type="button" onClick={() => handleNavigate("premium")}>Premium</button>
<button type="button" onClick={() => handleNavigate("search")}>Support</button>
<button type="button" onClick={() => handleNavigate("search")}>Download</button>
<span className="header-divider"></span>
<button type="button" onClick={openLogin}>Sign up</button>
<button className="header-login" type="button" onClick={openLogin}>Log in</button>
</div>
</header>

<div className="app-workspace">
<Sidebar activeView={activeView} onNavigate={handleNavigate} onSelectPlaylist={handleSelectPlaylist}/>
<main className="app-main">
{activeView === "premium" && renderPremiumPage()}

{showHomeSections && (
<>
<section className="music-section">
<div className="music-section-heading">
<h1>Trending songs</h1>
<button type="button" onClick={() => handleNavigate("search")}>Show all</button>
</div>
{renderCards(tracks.slice(0,6),"track")}
</section>

<section className="music-section artist-section">
<div className="music-section-heading">
<h2>Popular artists</h2>
<button type="button" onClick={() => handleNavigate("search")}>Show all</button>
</div>
<div className="artist-grid">
{[...new Set(tracks.map(track => track.artist))].map((artist,index) => (
<button className="artist-card" type="button" key={artist} onClick={() => handleSearchItem(artist)}>
<span className={`artist-avatar artist-avatar-${index % 4}`} aria-hidden="true">{artist.slice(0,1)}</span>
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
{renderCards(albums,"album")}
</section>

<section className="music-section">
<div className="music-section-heading">
<h2>Popular radio</h2>
<button type="button" onClick={() => handleNavigate("search")}>Show all</button>
</div>
{renderCards(radioStations,"radio")}
</section>

<section className="music-section">
<div className="music-section-heading">
<h2>Featured Charts</h2>
<button type="button" onClick={() => handleNavigate("search")}>Show all</button>
</div>
{renderCards(featuredCharts,"chart")}
</section>

<footer className="spotify-footer">
<div className="spotify-footer-columns">
{footerGroups.map(group => (
<div className="spotify-footer-column" key={group.title}>
<h3>{group.title}</h3>
{group.links.map(([label,url]) => <a key={label} href={url} target="_blank" rel="noreferrer">{label}</a>)}
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

{activeView !== "home" && activeView !== "premium" && (
<section className="music-section">
<div className="music-section-heading">
<h2>{pageTitle}</h2>
<span style={{color:"#b3b3b3",fontSize:"13px"}}>{visibleTracks.length} tracks</span>
</div>
<TrackList tracks={visibleTracks} currentTrack={currentTrack} isPlaying={isPlaying} onPlayTrack={playTrack}/>
{visibleTracks.length === 0 && <p style={{color:"#b3b3b3",padding:"20px 0"}}>No tracks found. Try another search.</p>}
</section>
)}
</main>
</div>

<PlayerBar/>

{loginOpen && (
<div onClick={() => setLoginOpen(false)} 
style={{position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,.82)",
display:"flex",alignItems:"center",justifyContent:"center",padding:"15px",overflowY:"auto"}}>

<div onClick={event => event.stopPropagation()} 
style={{position:"relative",width:"100%",maxWidth:"430px",
background:"#181818",borderRadius:"14px",padding:"35px 28px",
color:"#fff",boxShadow:"0 15px 50px rgba(0,0,0,.6)",margin:"auto"}}>
<button type="button" onClick={() => setLoginOpen(false)} aria-label="Close login form"
 style={{position:"absolute",right:"15px",top:"12px",border:0,
 background:"transparent",color:"#fff",fontSize:"27px",cursor:"pointer"}}>×</button>
<div style={{textAlign:"center",marginBottom:"25px"}}>
<div style={{fontSize:"38px",fontWeight:"900"}}>♫</div>
<h2 style={{fontSize:"25px",margin:"8px 0"}}>Welcome to Spotify</h2>
<p style={{color:"#b3b3b3",fontSize:"13px"}}>Enter your details to continue</p>
</div>
<form onSubmit={handleLoginSubmit} style={{display:"flex",flexDirection:"column",gap:"15px"}}>
<label style={{fontSize:"13px",fontWeight:"700"}}>Full Name
<input type="text" name="fullname" 
placeholder="Enter your full name" 
autoComplete="name" required style={loginInputStyle}/>
</label>
<label style={{fontSize:"13px",fontWeight:"700"}}>Phone Number
<input type="tel" name="phone" 
placeholder="Enter 10-digit phone number" 
pattern="[0-9]{10}" maxLength="10" autoComplete="tel" required style={loginInputStyle}/>
</label>
<label style={{fontSize:"13px",fontWeight:"700"}}>Email Address
<input type="email" name="email"
 placeholder="Enter your email address" 
 autoComplete="email" required style={loginInputStyle}/>
</label>
<button type="submit" style={{marginTop:"8px",
    padding:"14px",border:0,borderRadius:"25px",background:"#1ed760",
    color:"#000",fontWeight:"900",fontSize:"15px",cursor:"pointer"}}>
    Log in
</button>
{loginMessage && <p role="status" style={{color:"#1ed760",fontSize:"12px",lineHeight:"1.5",textAlign:"center"}}>{loginMessage}</p>}
</form>
<p style={{color:"#999",fontSize:"11px",
    textAlign:"center",marginTop:"20px"}}>
    This is a demo form. Account login requires backend authentication.
</p>
</div>
</div>
)}
</div>
);
}

const loginInputStyle = {
display:"block",
width:"100%",
boxSizing:"border-box",
marginTop:"7px",
padding:"13px",
border:"1px solid #555",
borderRadius:"7px",
background:"#242424",
color:"#fff",
fontSize:"14px",
outline:"none"
};

export default App;