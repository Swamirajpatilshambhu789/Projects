import React, { useState } from "react";
import "./LeftComponents.css";
import playimg from "./Assets/play.png";
import pauseimg from "./Assets/pause.png";
import TamdiChamdi from "./Assets/Music/TamdiChamdi.mp3";
import BigDawgs from "./Assets/Music/Big_Dawgs.mp3";

const LeftComponents = () => {
  const [songs] = useState([
    {
      name: "Tamdi Chamdi",
      id: 1,
      file: TamdiChamdi,
    },
    {
      name: "Big Dawgs",
      id: 2,
      file: BigDawgs,
    },
  ]);
  const [csong, setCsong] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const SongsListShow = ({ list }) => {
    return (
      <div className="songslistcompo">
        <div className="songlistcomponameandidshow">
          <div className="songnum">{list.id}.</div>
          <div className="songsshowlistpropname">{list.name}</div>
        </div>
        <button onClick={() => toggleMusic(list)} className="playsong">
          <img
            src={isPlaying && csong === list.name ? pauseimg : playimg}
            alt={isPlaying && csong === list.name ? "Pause" : "Play"}
            className="playsongbtnimg"
          />
        </button>
      </div>
    );
  };

  const toggleMusic = (song) => {
    if (audio) {
      if (csong === song.name && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.pause();
        const newAudio = new Audio(song.file);
        setAudio(newAudio);
        newAudio.play();
        setCsong(song.name);
        setIsPlaying(true);
      }
    } else {
      const newAudio = new Audio(song.file);
      setAudio(newAudio);
      newAudio.play();
      setCsong(song.name);
      setIsPlaying(true);
    }
  };

  return (
    <div className="leftcomponents">
      <div className="song">
        <div className="lshead">Songs</div>
        <div className="songcurrentbox">
          <div className="songcurrentdisplay">{csong}</div>
        </div>
        <div className="songslist">
          {songs.map((song) => (
            <SongsListShow key={song.id} list={song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftComponents;
