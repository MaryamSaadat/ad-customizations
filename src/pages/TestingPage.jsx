import React, { useState, useEffect } from "react";
import { Dropdown, VideoPlayer, VideoCard, Navbar } from "../components/index";
import complete_description from "../data/descriptions";
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

  const formatData = (data) => {
    const formattedData = data.descriptions.map((description, index) => ({
      descriptions: description,
      time_stamp_start: data.time_stamp_start[index],
      time_stamp_end: data.time_stamp_end[index],
    }));
    return formattedData;
  };

  const handleCallback = (val, times) => {
    console.log("hello there", val);
  };

  const handleEnd = () => {
    navigate("/VideoPage", { state: { watched: [1] } });
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
        <Typography variant="body1" color={"black"}>
          You will be watching a series of 1-2 minute long videos. 
          <br/>
          Each video has an audio description, to request a concise description press "C" on your keypad.
          <br/>
          For a detailed audio description, press "D" on your keypad.
          <br/>
          Once you feel comfortable with the interface you can proceed with the study.
        </Typography>
      </Stack>
      <Box
        p={2}
        sx={{
          overflowY: "auto",
          height: "95vh",
          flex: 2,
        }}
      >
        <Grid container spacing={2} p={3}>
          <Grid item md={8}>
            {console.log("My descriptions: ", descriptions)}
            <VideoPlayer
              completeDescrip={formatData(
                descriptions.completeDescriptions["detailed"]
              )} // Pass the selected description type
              conciseDescrip={formatData(
                descriptions.completeDescriptions["concise"]
              )} // Pass the selected description type
              path={descriptions.videoPath}
              title={descriptions.title}
              parentCallback={handleCallback}
            />
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
              Start User Study
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TestingPage;
