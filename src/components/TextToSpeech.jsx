import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import axios from "axios"; // Import axios

const TextToSpeech = ({ text, parentCallback }) => {
  const [audioFile, setAudioFile] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    handleTextToSpeech();
  }, [text]);

  const handleTextToSpeech = () => {
    const audioRecieved = {
      method: "GET",
      url: "https://ad-ai-study.onrender.com/speech",
      params: {textToConvert: text}
    };
    axios.request(audioRecieved).then((response) => {
      // console.log("Response:", response.data.data); 
      // console.log("Recieving data from backend", response.data.data)
      const blob = new Blob([new Uint8Array(response.data.data)], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(blob);
          setAudioFile(audioUrl);
          const audio = audioRef.current;
          audio.src = audioUrl;

          audio.addEventListener("ended", () => {
            parentCallback(); // Set isPlaying to false when audio playback ends
          });

          audio.play();

          return () => {
            URL.revokeObjectURL(audioUrl);
          };
    }).catch((error) => {
      console.log(error);
    });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <div>
        <audio ref={audioRef} />
        <div>
          <button onClick={togglePlay}>
            {isPlaying ? <p>Pause</p> : <p>Play</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;