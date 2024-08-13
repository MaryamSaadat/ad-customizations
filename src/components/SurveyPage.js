import React, { useState, useEffect,useCallback } from "react";
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import {json} from '../data/jsonData'
import { useLocation } from "react-router-dom";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
} from "firebase/firestore";

const surveyJson = json

function SurveyPage() {
  const survey = new Model(surveyJson);
  const location = useLocation();
  const [watched, setWatched] = useState(location.state.watched);
  const [watchedID, setwatchedID] = useState(location.state.id);
  const navigate = useNavigate();

  const infoCollectionRef = collection(db, "questionnaire");

  const onSubmitInfo = async (info) => {
    var data = {
      videoID: watchedID,
      participantCode: localStorage.getItem('particpant-code'),
      anyQuestion: info.anyQuestion,
      summary: info.summary,
      efficient: info.efficient,
      effective: info.efficient,
      enjoyable: info.enjoyable,
    }
    console.log(data)
    navigate('/VideoPage', {state: { watched: watched}})
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

export default SurveyPage;
