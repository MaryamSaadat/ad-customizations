// import React, { useState, useEffect,useCallback } from "react";
// import 'survey-core/defaultV2.min.css';
// import { Model } from 'survey-core';
// import { Survey } from 'survey-react-ui';
// import {noDescData} from '../data/noDescData'
// import { themeJson } from "../data/theme";
// import { useLocation } from "react-router-dom";
// import { db } from "../config/firebase";
// import { useNavigate } from "react-router-dom";
// import {
//   collection,
//   addDoc,
// } from "firebase/firestore";

// const surveyJson =noDescData;

// const NoDescSurvey = () => {
//     const survey = new Model(surveyJson);
//     survey.applyTheme(themeJson);
//     const location = useLocation();
//     const [watchedID, setwatchedID] = useState(location.state.id);
//     const navigate = useNavigate();
  
//     const infoCollectionRef = collection(db, "no-desc-survey");
  
//     const onSubmitInfo = async (info) => {
//       console.log("info", info)
//       var data = {
//         participantCode: localStorage.getItem('participantCode'),
//         videoID: watchedID,
//         ...info,
//       }
//       console.log(data)
//       navigate('/Customize', { state: { id: watchedID }})
//       try {
//         await addDoc(infoCollectionRef, data);
//       } catch (err) {
//         console.error("This is my error:",err);
//       }
//     };
  
//     const surveyComplete = useCallback((sender) => {
//       onSubmitInfo(sender.data)
//     }, []);
  
//     survey.onComplete.add(surveyComplete);
  
//       // Render your component based on the survey state
//       if (!survey) {
//         return <div>Loading...</div>; // or any other loading indicator
//       }
    
  
//     return <Survey model={survey} />;
// }

// export default NoDescSurvey;

import React, { useState } from "react";
import { Container, Typography, Box, Button, Slider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const marks = [
  { value: 0, label: "Strongly disagree" },
  { value: 10, label: "Disagree" },
  { value: 20, label: "Neutral" },
  { value: 30, label: "Agree" },
  { value: 40, label: "Strongly Agree" },
];

const getLabelFromValue = (value) => {
  if (value % 10 === 0) {
    // If the value is exactly on a mark
    const mark = marks.find((mark) => mark.value === value);
    return mark ? mark.label : '';
  } else {
    // If the value is between marks
    const lowerMark = marks.find((mark) => mark.value < value && value < mark.value + 10);
    const higherMark = marks.find((mark) => mark.value > value && value < mark.value);
    
    return lowerMark && higherMark
      ? `Between ${lowerMark.label} and ${higherMark.label}`
      : '';
  }
};

const SliderSurvey = () => {
  const [responses, setResponses] = useState({
    question1: 20,
    question2: 20,
    question3: 20,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const infoCollectionRef = collection(db, "no-desc-survey");

  const handleSliderChange = (event, newValue, question) => {
    setResponses({ ...responses, [question]: newValue });
  };

  const handleSubmit = async () => {
    const data = {
      participantCode: localStorage.getItem("participantCode"),
      videoID: location.state.id,
      responses,
    };
    console.log("Submitted Data:", data);

    try {
      await addDoc(infoCollectionRef, data);
      navigate("/Customize", { state: { id: location.state.id } });
    } catch (err) {
      console.error("Error submitting survey:", err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box p={4}>
        <Typography variant="h3" gutterBottom component="h1" tabIndex={0}>
          Feedback
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="h2" tabIndex={0}>
          To what extent do you agree with the following statements?
        </Typography>

        <Box mt={4} role="group" aria-labelledby="slider-question1-label">
          <Typography
            variant="h6"
            gutterBottom
            component="h3"
            id="slider-question1-label"
            tabIndex={0}
          >
            1. I was able to grasp the main content of the video without audio descriptions.
          </Typography>
          <Slider
            value={responses.question1}
            onChange={(event, newValue) => handleSliderChange(event, newValue, "question1")}
            marks={marks}
            step={5}
            min={0}
            max={40}
            valueLabelDisplay="auto"
            aria-valuetext={`I was able to grasp the main content of the video without audio descriptions: ${getLabelFromValue(responses.question1)}`}
            aria-labelledby="slider-question1-label"
            tabIndex={0}
          />
        </Box>

        <Box mt={4} role="group" aria-labelledby="slider-question2-label">
          <Typography
            variant="h6"
            gutterBottom
            component="h3"
            id="slider-question2-label"
            tabIndex={0}
          >
            2. I was able to grasp the visual content of the video without audio descriptions.
          </Typography>
          <Slider
            value={responses.question2}
            onChange={(event, newValue) => handleSliderChange(event, newValue, "question2")}
            marks={marks}
            step={5}
            min={0}
            max={40}
            valueLabelDisplay="auto"
            aria-valuetext={`I was able to grasp the visual content of the video without audio descriptions: ${getLabelFromValue(responses.question2)}`}
            aria-labelledby="slider-question2-label"
            tabIndex={0}
          />
        </Box>

        <Box mt={4} role="group" aria-labelledby="slider-question3-label">
          <Typography
            variant="h6"
            gutterBottom
            component="h3"
            id="slider-question3-label"
            tabIndex={0}
          >
            3. I enjoyed watching the video without any audio descriptions.
          </Typography>
          <Slider
            value={responses.question3}
            onChange={(event, newValue) => handleSliderChange(event, newValue, "question3")}
            marks={marks}
            step={5}
            min={0}
            max={40}
            valueLabelDisplay="auto"
            aria-valuetext={`I enjoyed watching the video without any audio descriptions: ${getLabelFromValue(responses.question3)}`}
            aria-labelledby="slider-question3-label"
            tabIndex={0}
          />
        </Box>

        <Box mt={6}>
          <Button
            variant="contained"
            color="primary"
            sx={{
            fontSize: "1rem",
            fontWeight: "bold",
          }}
            onClick={handleSubmit}
            aria-label="Complete and submit the survey"
            tabIndex={0}
          >
            Complete
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SliderSurvey;
