import React, { useState, useEffect, useCallback  } from "react";
import { Typography, Box, Chip, Button, Grid } from "@mui/material";
import { TextToSpeech } from ".";
import formatTime from "../utils/functions";
import videoPaths from "../data/paths";

const VideoPlayer = (props) => {
  console.log("Coming in props", props)
  const video = props.path;

  const defaultDescription = {
    descriptions: "",
    time_stamp_start: "-",
    time_stamp_end: "-",
  };
  const [videoDescriptions, setVideoDescriptions] = useState([
    defaultDescription,
  ]);
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const [prevDescriptionIndex, setPrevDescriptionIndex] = useState(0);
  const [isSpeechPlaying, setIsSpeechPlaying] = useState(false);
  const [playSpeech, setPlaySpeech] = useState(true);

  useEffect(() => {
    const updatedDescriptions = [defaultDescription, ...(props.completeDescrip || [])];
    // console.log("Updated descriptions", updatedDescriptions)
    setCurrentDescriptionIndex(0);
    setVideoDescriptions(updatedDescriptions);
  }, [props.descrip]);

  const debouncedHandleTimeUpdate = useCallback(() => {
    const videoElement = document.getElementById("video");
    if (!videoElement) return;

    const currentTime = Math.floor(videoElement.currentTime);
    // props.parentCallback(Math.floor(currentTime));

    if (videoDescriptions.length > 0) {
      const index = videoDescriptions.findIndex(
        (description) => parseInt(description.time_stamp_start) === currentTime
      );
      console.log("Coming here yall with my index", index)

      if (index !== -1 && index !== currentDescriptionIndex) {
        console.log("Coming here yall")
        setCurrentDescriptionIndex(index);
        videoElement.pause();
      }
    }
  }, [currentDescriptionIndex, videoDescriptions, props.parentCallback]);

  useEffect(() => {
    const videoElement = document.getElementById("video");
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      debouncedHandleTimeUpdate();
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [debouncedHandleTimeUpdate]);

  const handleCallback = () => {
    const videoElement = document.getElementById("video");
    videoElement.play();
  };

  const currentDescription =
    videoDescriptions[currentDescriptionIndex] || defaultDescription;

  // console.log("my description",currentDescription);

  return (
    <div>
      <video id="video" controls width="100%" height="500px">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* {console.log("My current index and previous index", currentDescriptionIndex, prevDescriptionIndex)} */}
      {/* {props.yesDesc && ( */}
        <Grid mt={2}>
          {/* <h4>{currentDescription.descriptions}</h4> */}
          {currentDescriptionIndex !== -1 && (
              <TextToSpeech
                text={currentDescription.descriptions}
                parentCallback={handleCallback}
              />
            )}
        </Grid>
      {/* )} */}
    </div>
  );
};

export default VideoPlayer;
