import React, { useState, useEffect, useRef } from "react";
import { Button, Slider} from "@mui/material";
import axios from "axios"; // Import axios

const TextToSpeech = ({ text, parentCallback }) => {
  const [audioFile, setAudioFile] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0); // Default speed
  const audioRef = useRef();

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
  };

  useEffect(() => {
    handleTextToSpeech();
  }, [text]);

  const handleTextToSpeech = () => {
    const audioRecieved = {
      method: "GET",
      url: "https://ad-ai-study.onrender.com/speech",
      params: {textToConvert: text, speed: speed.toString(),}
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
          {/* <button onClick={togglePlay}>
            {isPlaying ? <p>Pause audio description</p> : <p>Play audio description</p>}
          </button> */}
        </div>
        <div>
          <Slider
            value={speed}
            min={0.5}
            max={2.0}
            step={0.1}
            onChange={handleSpeedChange}
            aria-labelledby="This slider allows you to adjust the speed of the description as it is played"
          />
          <p>Speed of audio description: {speed.toFixed(1)}x</p>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;