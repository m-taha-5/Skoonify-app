import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import './App.css';

// We define our track list right inside the component
const tracks = [
    { trackName: "Fasiloon ko takaluf", filepath: "/1.mp3", coverpath: "/cover1.jpg" },
    { trackName: "Zahemuqaddar", filepath: "/2.mp3", coverpath: "/cover2.jpeg" },
    { trackName: "Har waqt tasawur", filepath: "/3.mp3", coverpath: "/cover3.jpg" },
    { trackName: "Illahi teri chokhat", filepath: "/4.mp3", coverpath: "/cover4.jpeg" },
    { trackName: "Lam yati nazeero", filepath: "/5.mp3", coverpath: "/cover5.jpeg" },
    { trackName: "Y dunia chood", filepath: "/6.mp3", coverpath: "/cover6.jpg" },
];

function SkoonPage() {
    // === STATE MANAGEMENT ===
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // === REFS ===
    const audioRef = useRef(null);
    const trackGifRef = useRef(null);

    // === EFFECTS ===
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            trackGifRef.current.style.opacity = 1;
        } else {
            audioRef.current.pause();
            trackGifRef.current.style.opacity = 0;
        }
    }, [isPlaying, trackIndex]);

    // === HANDLER FUNCTIONS ===
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        const nextIndex = (trackIndex + 1) % tracks.length;
        setTrackIndex(nextIndex);
        setIsPlaying(true);
    };

    const handlePrevious = () => {
        const prevIndex = (trackIndex - 1 + tracks.length) % tracks.length;
        setTrackIndex(prevIndex);
        setIsPlaying(true);
    };

    const onTimeUpdate = () => {
        const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(newProgress);
    };

    const onScrub = (value) => {
        audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
        setProgress(value);
    }

    // This is the JSX that gets rendered to the page
    return (
        <>
            <Helmet>
                <body className="player-page-body" />
            </Helmet>

            <audio
                ref={audioRef}
                src={tracks[trackIndex].filepath}
                onTimeUpdate={onTimeUpdate}
                onEnded={handleNext}
            />
            {/* The old 'id' is no longer needed because we style the body tag directly */}
            <div className="container">
                <div className="naatlist">
                    <h1>PeaceFul Vibes</h1>
                    <div>
                        {tracks.map((track, index) => (
                            <div className="naatitem" key={index} onClick={() => { setTrackIndex(index); setIsPlaying(true); }}>
                                <img src={track.coverpath} alt={track.trackName} />
                                <span className="trackName">{track.trackName}</span>
                                <span className="naatplaylist">
                                    <i className={`fa-solid ${trackIndex === index && isPlaying ? 'fa-circle-pause' : 'fa-circle-play'} trackitemplay`}></i>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="banner" style={{ backgroundImage: `url(${tracks[trackIndex].coverpath})` }}></div>
            </div>

            <div className="bottom">
                <input
                    type="range"
                    id="myprogressbar"
                    min="0"
                    max={100}
                    value={progress || 0}
                    onChange={(e) => onScrub(e.target.value)}
                />
                <div className="icons">
                    <i className="fa-solid fa-3x fa-backward-step" id="previous" onClick={handlePrevious}></i>
                    <i className={`fa-solid fa-3x ${isPlaying ? 'fa-circle-pause' : 'fa-circle-play'}`} id="masterplay" onClick={handlePlayPause}></i>
                    <i className="fa-solid fa-3x fa-forward-step" id="next" onClick={handleNext}></i>
                </div>
                <div className="naatinfo">
                    <img ref={trackGifRef} src="/gif.gif" alt="" width="120px" height="35px" id="trackgif" style={{ opacity: 0 }} />
                    <span className="track-title">{tracks[trackIndex].trackName}</span>
                </div>
            </div>
        </>
    );
}

export default SkoonPage;