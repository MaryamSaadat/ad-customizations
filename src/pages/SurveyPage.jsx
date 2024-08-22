import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Slider, TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
    const mark = marks.find((mark) => mark.value === value);
    return mark ? mark.label : '';
  } else {
    const lowerMark = marks.find((mark) => mark.value < value && value < mark.value + 10);
    const higherMark = marks.find((mark) => mark.value > value && value < mark.value);

    return lowerMark && higherMark
      ? `Between ${lowerMark.label} and ${higherMark.label}`
      : '';
  }
};

const SurveyPage = () => {
  const [responses, setResponses] = useState({
    question1: 20,
    question2: 20,
    question3: 20,
    preferredCustomization: "",  // New state for preferred customization
    reasonForPreference: "",     // New state for the reason for preference
  });

  const [compare, setCompare] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const participantVideoList = JSON.parse(localStorage.getItem("videostoWatch"));
    const videoID = Object.keys(participantVideoList)[0]; // Get the first video ID
    const videoArray = participantVideoList[videoID]; // Get the first value for the videoID, which is the video type

    if (videoArray.length === 1) {
      setCompare(true);
    }
  }, []); // Empty dependency array means this useEffect runs only once after the initial render

  const infoCollectionRef = collection(db, "questionnaire");

  const handleSliderChange = (event, newValue, question) => {
    setResponses({ ...responses, [question]: newValue });
  };

  const handleTextChange = (event) => {
    setResponses({ ...responses, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const participantCode = localStorage.getItem("participantCode");
      const participantVideoList = JSON.parse(localStorage.getItem("videostoWatch"));
      const videoID = Object.keys(participantVideoList)[0]; // Get the first video ID
      const videoType = participantVideoList[videoID][0]; // Get the first value for the videoID, which is the video type

      const data = {
        participantCode,
        videoID,
        videoType,
        responses,
      };

      console.log("Data to be sent to Firestore:", data);
      await addDoc(infoCollectionRef, data);

      const arr = participantVideoList[videoID];
      if (arr && arr.length > 0) {
        participantVideoList[videoID] = arr.slice(1);

        if (participantVideoList[videoID].length === 0) {
          delete participantVideoList[videoID];
        }

        if (Object.keys(participantVideoList).length === 0) {
          localStorage.setItem("videostoWatch", JSON.stringify(participantVideoList));
          navigate('/FinalSurvey');
        } else if (!participantVideoList[videoID]) {
          localStorage.setItem("videostoWatch", JSON.stringify(participantVideoList));
          navigate('/NoDesc');
        } else {
          localStorage.setItem("videostoWatch", JSON.stringify(participantVideoList));
          navigate('/VideoPage');
        }
      } else {
        console.error("Array for the videoID is not found or is already empty.");
      }
    } catch (err) {
      console.error("Error adding document to Firestore:", err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box padding={4}>
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
            1. AI-generated descriptions helped me grasp the main content of the video.
          </Typography>
          <Slider
            value={responses.question1}
            onChange={(event, newValue) => handleSliderChange(event, newValue, "question1")}
            marks={marks}
            step={5}
            min={0}
            max={40}
            valueLabelDisplay="auto"
            aria-valuetext={`AI-generated descriptions helped me grasp the main content of the video: ${getLabelFromValue(responses.question1)}`}
            aria-labelledby="slider-question1-label"
            aria-label="Slider for question 1"
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
            2. AI-generated descriptions helped me grasp the visual details of the video.
          </Typography>
          <Slider
            value={responses.question2}
            onChange={(event, newValue) => handleSliderChange(event, newValue, "question2")}
            marks={marks}
            step={5}
            min={0}
            max={40}
            valueLabelDisplay="auto"
            aria-valuetext={`AI-generated descriptions helped me grasp the visual details of the video: ${getLabelFromValue(responses.question2)}`}
            aria-labelledby="slider-question2-label"
            aria-label="Slider for question 2"
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
            3. AI-generated descriptions enhanced the overall enjoyment of the video.
          </Typography>
          <Slider
            value={responses.question3}
            onChange={(event, newValue) => handleSliderChange(event, newValue, "question3")}
            marks={marks}
            step={5}
            min={0}
            max={40}
            valueLabelDisplay="auto"
            aria-valuetext={`AI-generated descriptions enhanced the overall enjoyment of the video: ${getLabelFromValue(responses.question3)}`}
            aria-labelledby="slider-question3-label"
            aria-label="Slider for question 3"
            tabIndex={0}
          />
        </Box>

        {compare && (
          <>
            <Box mt={4} role="group" aria-labelledby="compare-question-label">
              <Typography
                variant="h6"
                gutterBottom
                component="h3"
                id="compare-question-label"
                tabIndex={0}
              >
                4. Which version of the video with audio descriptions did you prefer?
              </Typography>
              <RadioGroup
                aria-labelledby="compare-question-label"
                name="preferredCustomization"
                value={responses.preferredCustomization}
                onChange={handleTextChange}
                aria-label="Radio group for preferred customization"
                tabIndex={0}
              >
                <FormControlLabel value="customization1" control={<Radio />} label="Version 1 with descriptions" tabIndex={0} aria-label="Customization 1" />
                <FormControlLabel value="customization2" control={<Radio />} label="Version 2 with descriptions" tabIndex={0} aria-label="Customization 2" />
              </RadioGroup>
            </Box>

            <Box mt={4} role="group" aria-labelledby="reason-question-label">
              <Typography
                variant="h6"
                gutterBottom
                component="h3"
                id="reason-question-label"
                tabIndex={0}
              >
                5. Why did you prefer that customization?
              </Typography>
              <TextField
                fullWidth
                name="reasonForPreference"
                value={responses.reasonForPreference}
                onChange={handleTextChange}
                variant="outlined"
                multiline
                rows={4}
                aria-labelledby="reason-question-label"
                aria-label="Text field for reason why preferred customization"
                tabIndex={0}
              />
            </Box>
          </>
        )}

        <Box mt={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            aria-label="Complete and submit the survey"
            tabIndex={0}
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Complete
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SurveyPage;


// import React, { useCallback } from "react";
// import 'survey-core/defaultV2.min.css';
// import { Model } from 'survey-core';
// import { Survey } from 'survey-react-ui';
// import "survey-core/defaultV2.min.css";
// import { themeJson } from "../data/theme";
// import { json } from '../data/jsonData';
// import { db } from "../config/firebase";
// import { useNavigate } from "react-router-dom";
// import { collection, addDoc } from "firebase/firestore";

// const surveyJson = json;

// function SurveyPage() {
//   const survey = new Model(surveyJson);
//   survey.applyTheme(themeJson);
//   const navigate = useNavigate();

//   const infoCollectionRef = collection(db, "questionnaire");

//   const onSubmitInfo = async (info) => {
//     try {
//       // Retrieve participantCode and videoID from local storage
//       const participantCode = localStorage.getItem("participantCode");
//       const participantVideoList = JSON.parse(localStorage.getItem("videostoWatch"));
//       const videoID = Object.keys(participantVideoList)[0]; // Get the first video ID
//       const videoType = participantVideoList[videoID][0]; // Get the first value for the videoID, which is the video type
  
//       // Create the data object to be sent to Firestore
//       const data = {
//         participantCode: participantCode,
//         videoID: videoID,
//         videoType: videoType,
//         ...info, // Spread the survey results into the data object
//       };
  
//       console.log("Data to be sent to Firestore:", data);
  
//       // Add the data to Firestore
//       await addDoc(infoCollectionRef, data);
//       console.log("Data successfully added to Firestore");
  
//       // Proceed with the logic
//       const arr = participantVideoList[videoID]; 
      
//       if (arr && arr.length > 0) {
//         // Remove the first item from the array
//         participantVideoList[videoID] = arr.slice(1);
        
//         // If the array is empty after slicing, remove the entire videoID object
//         if (participantVideoList[videoID].length === 0) {
//           delete participantVideoList[videoID];
//         }
  
//         // If the entire `participantVideoList` is empty, proceed to the final survey
//         if (Object.keys(participantVideoList).length === 0) {
//           localStorage.setItem("videostoWatch", JSON.stringify(participantVideoList));
//           navigate('/FinalSurvey'); // Navigate to the final survey page
//         } else if (!participantVideoList[videoID]) {
//           // If the videoID is removed and there are other video IDs, proceed to no description page
//           localStorage.setItem("videostoWatch", JSON.stringify(participantVideoList));
//           navigate('/NoDesc'); // Navigate to the no description page
//         } else {
//           // If the array is not empty, proceed to the video page
//           localStorage.setItem("videostoWatch", JSON.stringify(participantVideoList));
//           navigate('/VideoPage'); // Navigate to the video page
//         }
//       } else {
//         console.error("Array for the videoID is not found or is already empty.");
//       }
//     } catch (err) {
//       console.error("Error adding document to Firestore:", err);
//     }
//   };
  

//   const surveyComplete = useCallback((sender) => {
//     onSubmitInfo(sender.data);
//   }, []);

//   survey.onComplete.add(surveyComplete);

//   // Render your component based on the survey state
//   if (!survey) {
//     return <div>Loading...</div>; // or any other loading indicator
//   }

//   return <Survey model={survey} />;
// }

// export default SurveyPage;
