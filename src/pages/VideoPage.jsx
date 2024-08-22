import React, { useState, useEffect } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import VideoPlayer from "../components/VideoPlayer"; // Assuming this is your video player component

const VideoPage = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const participantCode = localStorage.getItem("participantCode");
        const participantVideoList = JSON.parse(
          localStorage.getItem("videostoWatch")
        );
        const videoID = Object.keys(participantVideoList)[0]; // Get the first video ID
        const videoType = participantVideoList[videoID][0]; // Get the first video type

        let videoDoc;
        console.log("This is the videoType:", videoType);

        if (videoType === "custom") {
          // Query for customizations based on participantCode and videoID
          const customizationsRef = collection(db, "asked-customizations");
          const customQuery = query(
            customizationsRef,
            where("participantCode", "==", participantCode),
            where("videoID", "==", videoID)
          );
          const customQuerySnapshot = await getDocs(customQuery);

          if (!customQuerySnapshot.empty) {
            const customizationData = customQuerySnapshot.docs[0].data();
            console.log("Customization Data:", customizationData);

            const videosRef = collection(db, "videos");
            const videoQuery = query(
              videosRef,
              where("videoID", "==", Number(videoID)),
              where("type", "==", customizationData.type),
              where("focus", "==", customizationData.focus),
              where("interpretation", "==", customizationData.interpretation),
              where("frequency", "==", customizationData.frequency)
            );
            const videoSnapshot = await getDocs(videoQuery);

            if (!videoSnapshot.empty) {
              videoDoc = videoSnapshot.docs[0].data();
              console.log("Video Document Data:", videoDoc);
            } else {
              console.error("No matching video found for the customization.");
            }
          } else {
            console.error("No customizations found for this participant.");
          }
        } else if (videoType === "control") {
          // Handle the case where the video type is "control"
          const customizationsRef = collection(db, "asked-customizations");
          const customQuery = query(
            customizationsRef,
            where("participantCode", "==", participantCode),
            where("videoID", "==", videoID)
          );
          const customQuerySnapshot = await getDocs(customQuery);

          if (!customQuerySnapshot.empty) {
            const customizationData = customQuerySnapshot.docs[0].data();
            console.log("Customization Data:", customizationData);

            const videosRef = collection(db, "videos");
            const possibleFrequencies = ["seven", "fifteen", "thirty"].filter(
              (f) => f !== customizationData.frequency
            );

            const videoQuery = query(
              videosRef,
              where("videoID", "==", Number(videoID)),
              where("type", "==", ""),
              where("focus", "==", ""),
              where("interpretation", "==", ""),
              where("frequency", "in", possibleFrequencies) // `in` operator used to handle multiple possible frequencies
            );
            const videoSnapshot = await getDocs(videoQuery);

            if (!videoSnapshot.empty) {
              videoDoc = videoSnapshot.docs[0].data();
              console.log("Video Document Data:", videoDoc);
            } else {
              console.error("No matching video found for the customization.");
            }
          } else {
            console.error("No customizations found for this participant.");
          }
        } else if (videoType === "control + frequency") {
          // Handle the case where the video type is "control"
          console.log("Coming here?")
          const customizationsRef = collection(db, "asked-customizations");
          const customQuery = query(
            customizationsRef,
            where("participantCode", "==", participantCode),
            where("videoID", "==", videoID)
          );
          const customQuerySnapshot = await getDocs(customQuery);

          if (!customQuerySnapshot.empty) {
            const customizationData = customQuerySnapshot.docs[0].data();
            console.log("Customization Data:", customizationData);

            const videosRef = collection(db, "videos");

            const videoQuery = query(
              videosRef,
              where("videoID", "==", Number(videoID)),
              where("type", "==", ""),
              where("focus", "==", ""),
              where("interpretation", "==", ""),
              where("frequency", "==", customizationData.frequency)
            );
            const videoSnapshot = await getDocs(videoQuery);

            if (!videoSnapshot.empty) {
              videoDoc = videoSnapshot.docs[0].data();
              console.log("Video Document Data:", videoDoc);
            } else {
              console.error("No matching video found for the customization.");
            }
          } else {
            console.error("No customizations found for this participant.");
          }
        } else {
          // If not custom or control, just fetch the video directly
          const videosRef = collection(db, "videos");
          const videoQuery = query(
            videosRef,
            where("videoID", "==", videoID),
            where("type", "==", videoType)
          );
          const videoSnapshot = await getDocs(videoQuery);

          if (!videoSnapshot.empty) {
            videoDoc = videoSnapshot.docs[0].data();
            console.log("Default Video Document Data:", videoDoc);
          } else {
            console.error("No matching video found.");
          }
        }

        if (videoDoc) {
          setDescriptions(videoDoc);
        } else {
          console.error("No matching video document found.");
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching video data:", err);
      }
    };

    fetchVideoData();
  }, []);

  const handleEnd = async () => {
    // Logic to handle what happens when the video ends
    navigate('/Survey');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formatData = (data) => {
    return data.descriptions.map((description, index) => ({
      descriptions: description,
      time_stamp_start: data.time_stamp_start[index],
    }));
  };

  return (
    <>
      <Box p={2} sx={{ overflowY: "auto", height: "100vh", flex: 2 }}>
        {/* Screen reader announcement */}
        <Typography
          variant="h6"
          aria-live="polite"
          sx={{
            position: "absolute",
            width: "1px",
            height: "1px",
            margin: "-1px",
            padding: "0",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            border: "0",
          }}
        >
          You will now watch the video with audio descriptions. The audio
          descriptions may or may not have your customizations applied to it.
          You are to watch the video with the customizations and rate them on
          the next page. You can also adjust the speed of the audio description text to speech.
        </Typography>

        {/* Visible text instructions */}
        <Grid container spacing={2} p={3}>
          <Grid item xs={12}>
            <Typography variant="h6" aria-hidden="true">
              You will now watch the video with audio descriptions. The audio
              descriptions may or may not have your customizations applied to
              it. You are to watch the video with the customizations and rate
              them on the next page. You can also adjust the speed of the audio description text to speech.
            </Typography>
          </Grid>
          <Grid item md={8}>
            <VideoPlayer
              completeDescrip={formatData(descriptions)}
              path={descriptions.videoUrl}
              title={descriptions.videoTitle}
            />
          </Grid>

          <Grid item md={4}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: "1rem",
                marginTop: "1rem",
                fontWeight: "bold",
              }}
              onClick={handleEnd}
            >
              Proceed to ratings
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default VideoPage;
