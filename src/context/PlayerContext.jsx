
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { tracks } from "../data/tracks";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const soundRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(tracks[0] ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [playbackError, setPlaybackError] = useState("");

  useEffect(() => {
    const audio = soundRef.current;

    if (!audio || !currentTrack) return;

    const sourceChanged =
      audio.getAttribute("src") !== currentTrack.audio;

    if (sourceChanged) {
      audio.src = currentTrack.audio;
      audio.load();
      setCurrentTime(0);
      setDuration(0);
    }

    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
        setPlaybackError(
          "This track could not be played. Check your connection or try another track."
        );
      });
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying, volume]);

  const playTrack = useCallback((track) => {
    if (!track) return;
    setPlaybackError("");
    setCurrentTime(0);
    setDuration(0);
    setCurrentTrack(track);
    setIsPlaying(true);
 }, []);

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;

    setPlaybackError("");
    setIsPlaying((playing) => !playing);
  }, [currentTrack]);

  const playNext = useCallback(() => {
    if (!tracks.length) return;

    const index = tracks.findIndex(
      (track) => track.id === currentTrack?.id
    );

    const nextIndex = index < 0 ? 0 : (index + 1) % tracks.length;

    setPlaybackError("");
    setCurrentTime(0);
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  }, [currentTrack]);

  const playPrevious = useCallback(() => {
    const audio = soundRef.current;

    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    if (!tracks.length) return;

    const index = tracks.findIndex(
      (track) => track.id === currentTrack?.id
    );

    const previousIndex =
      index < 0
        ? tracks.length - 1
        : (index - 1 + tracks.length) % tracks.length;

    setPlaybackError("");
    setCurrentTime(0);
    setCurrentTrack(tracks[previousIndex]);
    setIsPlaying(true);
  }, [currentTrack]);

  const seekTo = useCallback((value) => {
    const audio = soundRef.current;
    if (!audio) return;

    const nextTime = Number(value);

    if (!Number.isFinite(nextTime)) return;

    audio.currentTime = Math.max(
      0,
      Math.min(nextTime, audio.duration || 0)
    );

    setCurrentTime(audio.currentTime);
  }, []);

  const changeVolume = useCallback((value) => {
    const nextVolume = Math.max(0, Math.min(1, Number(value)));

    if (!Number.isFinite(nextVolume)) return;

    setVolume(nextVolume);

    if (soundRef.current) {
      soundRef.current.volume = nextVolume;
    }
  }, []);

  const updateProgress = useCallback((event) => {
    setCurrentTime(event.currentTarget.currentTime);
  }, []);

  const updateDuration = useCallback((event) => {
    const audioDuration = event.currentTarget.duration;

    setDuration(Number.isFinite(audioDuration) ? audioDuration : 0);
  }, []);

  const handleTrackEnd = useCallback(() => {
    playNext();
  }, [playNext]);
  const handleAudioError = useCallback(() => {
    if (!soundRef.current?.src) return;
    setIsPlaying(false);
    setPlaybackError("Audio is unavailable right now. Please try another track.");
  }, []);
  
  const player = {
    tracks,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    playbackError,
    playTrack,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    changeVolume,
  };

  return (
    <PlayerContext.Provider value={player}>
      {children}

      <audio
        ref={soundRef}
        preload="metadata"
        onTimeUpdate={updateProgress}
        onLoadedMetadata={updateDuration}
        onDurationChange={updateDuration}
        onEnded={handleTrackEnd}
        onError={handleAudioError}/>
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const player = useContext(PlayerContext);

  if (!player) {
    throw new Error(
      "usePlayer must be used inside a PlayerProvider."
    );
  }

  return player;
}
