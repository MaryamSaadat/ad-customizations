import React, { useState, useEffect,useCallback } from "react";
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import {customize} from '../data/customize'
import { themeJson } from "../data/theme";
import { useLocation } from "react-router-dom";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
} from "firebase/firestore";

const surveyJson = customize;

const CustomizePage = () => {
    const survey = new Model(surveyJson);
    survey.applyTheme(themeJson);
    const location = useLocation();
    const [watchedID, setwatchedID] = useState(location.state.id);
    const navigate = useNavigate();
  
    const infoCollectionRef = collection(db, "asked-customizations");
  
    const onSubmitInfo = async (info) => {
      console.log("info", info)
      var data = {
        videoID: watchedID,
        participantCode: localStorage.getItem('participantCode'),
        frequency: info.frequency,
        type: info.type,
        focus: info.focus,
        interpretation: info.interpretation,
      }
      console.log(data)
      navigate('/VideoPage', {state: { watched: watchedID}})
      try {
        await addDoc(infoCollectionRef, data);
      } catch (err) {
        console.error("This is my error:",err);
      }
    };
  
    const surveyComplete = useCallback((sender) => {
      onSubmitInfo(sender.data)
    }, []);
  
    survey.onComplete.add(surveyComplete);
  
      // Render your component based on the survey state
      if (!survey) {
        return <div>Loading...</div>; // or any other loading indicator
      }
    
  
    return <Survey model={survey} />;
}

export default CustomizePage