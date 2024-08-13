import React, { useCallback } from "react";
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import "survey-core/defaultV2.min.css";
import { themeJson } from "../data/theme";
import { json } from '../data/jsonData';
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const surveyJson = json;

function SurveyPage() {
  const survey = new Model(surveyJson);
  survey.applyTheme(themeJson);
  const navigate = useNavigate();

  const infoCollectionRef = collection(db, "questionnaire");

  const onSubmitInfo = async (info) => {
    try {
      // Retrieve participantCode and videoID from local storage
      const participantCode = localStorage.getItem("participantCode");
      const participantVideoList = JSON.parse(localStorage.getItem("videostoWatch"));
      const videoID = Object.keys(participantVideoList)[0]; // Get the first video ID
      const videoType = participantVideoList[videoID][0]; // Get the first value for the videoID, which is the video type
  
      // Create the data object to be sent to Firestore
      const data = {
        participantCode: participantCode,
        videoID: videoID,
        videoType: videoType,
        ...info, // Spread the survey results into the data object
      };
  
      console.log("Data to be sent to Firestore:", data);
  
      // Add the data to Firestore
      await addDoc(infoCollectionRef, data);
      console.log("Data successfully added to Firestore");
  
      // Proceed with the logic
      const arr = participantVideoList[videoID]; 
      
      if (arr && arr.length > 0) {
        // Remove the first item from the array
        participantVideoList[videoID] = arr.slice(1);
        
        // If the array is empty after slicing, remove the entire videoID object
        if (participantVideoList[videoID].length === 0) {
          delete participantVideoList[videoID];
        }
  
        // If the entire `participantVideoList` is empty, proceed to the final survey
        if (Object.keys(participantVideoList).length === 0) {
          localStorage.setItem("videostoWatch", JSON.stringify(participantVideoList));
          navigate('/FinalSurvey'); // Navigate to the final survey page
        } else if (!participantVideoList[videoID]) {
          // If the videoID is removed and there are other video IDs, proceed to no description page
          localStorage.setItem("videostoWatch", JSON.stringify(participantVideoList));
          navigate('/NoDesc'); // Navigate to the no description page
        } else {
          // If the array is not empty, proceed to the video page
          localStorage.setItem("videostoWatch", JSON.stringify(participantVideoList));
          navigate('/VideoPage'); // Navigate to the video page
        }
      } else {
        console.error("Array for the videoID is not found or is already empty.");
      }
    } catch (err) {
      console.error("Error adding document to Firestore:", err);
    }
  };
  

  const surveyComplete = useCallback((sender) => {
    onSubmitInfo(sender.data);
  }, []);

  survey.onComplete.add(surveyComplete);

  // Render your component based on the survey state
  if (!survey) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return <Survey model={survey} />;
}

export default SurveyPage;
