import React, { useState, useEffect } from "react";
import { Dropdown, VideoPlayer, VideoCard, Navbar } from "../components/index";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Grid, Stack, Box, Button, Typography } from "@mui/material";
import { db, auth, storage } from "../config/firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";

const TestingPage = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // console.log(
  //   "This is the description",
  //   complete_description[video_id],
  //   video_title,
  //   video_id
  // );

  useEffect(() => {
    const fetchVideoData = async () => {
      const videoRef = collection(db, "videos");
      try {
        const data = await getDocs(videoRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        // console.log("filtered data",filteredData)
        if (filteredData) {
          setDescriptions(filteredData[1]);
        } else {
          console.error("Document not found");
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    };

    fetchVideoData(); // Call the async function here

    // Make sure to include any cleanup logic if needed
    return () => {
      // Cleanup logic here if needed
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const handleEnd = () => {
    navigate("/Customize", { state: { watched: [1] } });
  };

  return (
    <>
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
        <Typography variant="h6" color={"black"}>
          You will be watching a 1-2 minute long video, without any audio descriptions.
          <br/>
          Once you are done watching the video, proceed to the next page
          <br/>
          Once you are on the next page, you will select a series of customizations for audio descriptions you want with the video you just watched.
        </Typography>
      </Stack>
      <Box
        p={2}
        sx={{
          overflowY: "auto",
          flex: 2,
        }}
      >
        <Grid container spacing={2} p={3}>
          <Grid item md={8}>
            {console.log("My descriptions: ", descriptions)}
            <video id="video" controls width="100%" height="500px">
        <source src={descriptions.videoPath} type="video/mp4" />
        </video>
          </Grid>

          <Grid item md={4}>
            <Button
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
                margin: "10px",
              }}
              className="category-btn"
              onClick={handleEnd}
            >
              Proceed to Customizations
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TestingPage;
