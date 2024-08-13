import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { infoData } from "../data/infoData";
import { themeJson } from "../data/theme";
import { db, auth, storage } from "../config/firebase";
import {
  collection,
  addDoc,
  doc,
} from "firebase/firestore";
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";

const infoJson = infoData;


const PersonalInfo = () => {
  const survey = new Model(infoJson);
  const navigate = useNavigate();
  survey.applyTheme(themeJson);
  const infoCollectionRef = collection(db, "demographic-info");

  const onSubmitInfo = async (info) => {
    const participantCode = localStorage.getItem('participantCode');
    const updatedInfo = { ...info, participantCode };
    navigate('/Type')
    try {
      await addDoc(infoCollectionRef, updatedInfo);
    } catch (err) {
      console.error("This is my error:",err);
    }
  };

  const surveyComplete = useCallback((sender) => {
    onSubmitInfo(sender.data)
  }, []);

  survey.onComplete.add(surveyComplete);

  return <Survey model={survey} />;
};

export default PersonalInfo;
