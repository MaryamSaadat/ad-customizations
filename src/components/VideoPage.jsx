import React, { useState, useEffect } from "react";
import { Dropdown, VideoPlayer, VideoCard, Navbar } from "./index";
import complete_description from "../data/descriptions";
import { useLocation, Link , useNavigate} from "react-router-dom";
import { Grid, Stack, Box, Button } from "@mui/material";
import { db, auth, storage } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";

const VideoPage = () => {
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [descriptions, setDescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [watchingTimes, setWatchingTimes] = useState([]);
  const [watchedID, setwatchedID] = useState();
  const [isSummary, setIsSummary] = useState();
  const location = useLocation();
  const [watched, setWatched] = useState(location.state.watched);

  const navigate = useNavigate();

  console.log(watched)
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
        }))
        // Handle the data retrieved from Firestore
        // console.log("Document data:", filteredData);
        // console.log("type:", typeof(watched));
        const unwatchedVideos = filteredData.filter((item,index) => !watched.includes(item.identification));
        console.log("unwatched",unwatchedVideos)
        if (unwatchedVideos.length === 0){
          navigate('/End')
        }
  

        // setting a random value
        var keys = Object.keys(unwatchedVideos);
        var randomKey = keys.length * Math.random() << 0;
        // adding the watched video id to all the watched videos
        setWatched([...watched, unwatchedVideos[keys[randomKey]].identification]);
        setwatchedID(unwatchedVideos[keys[randomKey]].identification)
        console.log("randomkey",randomKey, unwatchedVideos[keys[randomKey]].identification) 
        setDescriptions(unwatchedVideos[keys[randomKey]])
        setIsSummary(unwatchedVideos[keys[randomKey]].summary)
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
    console.log("hello there", val)
    console.log("there are the requests",times)
    setWatchingTimes(...watchingTimes, times)
    setIsVideoCompleted(val);
  };

  const handleEnd = async () => {
    // console.log(localStorage.getItem('particpant-code'), watchingTimes, watchedID);
    // console.log("Is my summary thing true?", isSummary)
    const data = {
      participantCode: localStorage.getItem('particpant-code'),
      reqTimes: watchingTimes, 
      videoID: watchedID,
    }
    const timesRef = collection(db, "watchingTimes");
    try {
      await addDoc(timesRef, data);
      // If you need to navigate after adding the document, uncomment the line below
      if (isSummary){
        navigate('/Survey', {state: { watched: watched, id:watchedID}})
      }else{
        navigate('/SurveywoSummary', {state: { watched: watched, id:watchedID}})
      }
    } catch (err) {
      console.error("This is my error:", err);
    }
  }
  

  return (
    <>
    <Navbar/>
    <Box
      p={2}
      sx={{
        overflowY: "auto",
        height: "100vh",
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
          <Button disabled={!isVideoCompleted}
          sx={{
            backgroundColor: "secondary.main",
            color: "white",
            margin: "10px",
          }}
          className="category-btn"
          onClick={handleEnd}
        >
          Proceed to questionaire
        </Button>
        </Grid>

      </Grid>
    </Box>
    </>
  );
};

export default VideoPage;
