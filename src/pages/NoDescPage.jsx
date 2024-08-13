import React, { useState, useEffect } from "react";
import { Grid, Stack, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const TestingPage = () => {
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        // Retrieve the participant's video list from localStorage
        const participantVideoList = JSON.parse(localStorage.getItem("videostoWatch"));
        // Get the first unwatched video details
        const videoId = Object.keys(participantVideoList)[0];
        setID(videoId);

        // Query Firestore for the video data based on videoID and type
        const videoRef = collection(db, "videos");
        const q = query(videoRef, where("videoID", "==", Number(videoId)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const videoDoc = querySnapshot.docs[0].data();
          setVideoData(videoDoc);
        } else {
          console.error("No matching video document found!");
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching video data:", err);
      }
    };

    fetchVideoData();
  }, []);

  const handleEnd = () => {
    const participantVideoList = JSON.parse(localStorage.getItem("videostoWatch"));
    const arr = participantVideoList[id]; 
    
    if (arr && arr.length > 0) {
      // Remove the first item from the array
      participantVideoList[id] = arr.slice(1);
    
      // Update the localStorage with the modified list
      localStorage.setItem("videostoWatch", JSON.stringify(participantVideoList));
      navigate("/NoDescSurvey", { state: { id: id } });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <Stack
          direction="row"
          alignItems="center"
          p={2}
          sx={{
            position: "relative",
            background: "#fff",
            top: 0,
            justifyContent: "space-between",
            borderBottom: "3px solid #19b394",
          }}
        >
          <Typography variant="h6" color={"black"} tabIndex={0}>
            You will be watching a 1-2 minute long video, without any audio
            descriptions.
            <br />
            Once you are done watching the video, proceed to the next page.
            <br />
            On the next page, you will provide ratings and after that select a series of customizations for audio
            descriptions you want with the video you just watched.
          </Typography>
        </Stack>
      </header>
      <main>
        <Box
          p={2}
          sx={{
            overflowY: "auto",
            flex: 2,
          }}
        >
          <Grid container spacing={2} p={3}>
            <Grid item md={8}>
              <video
                id="video"
                controls
                width="100%"
                height="500px"
                onEnded={handleEnd}
                aria-label="Video playback area. Press play to watch the video."
              >
                <source src={videoData.videoUrl} type="video/mp4" />
              </video>
            </Grid>

            <Grid item md={4}>
              <Button
                variant="contained"
                sx={{
                  fontSize: "1rem",
                  marginTop: "1rem",
                  fontWeight: "bold",
                }}
                color="primary"
                onClick={handleEnd}
                aria-label="Proceed to ratings and then customization options for the video."
              >
                Proceed to Ratings
              </Button>
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  );
};

export default TestingPage;
