import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { infoData } from "../data/infoData";
import { db, auth, storage } from "../config/firebase";
import {
  collection,
  addDoc,
  doc,
} from "firebase/firestore";
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";

const infoJson = infoData;

// const PersonalInfo = () => {
//   const survey = new Model(infoJson);
//   const navigate = useNavigate();
//   const infoCollectionRef = collection(db, "personalInfo");

//   // Define the surveyComplete callback function
//   const surveyComplete = (sender) => {
//     onSubmitInfo(sender.data);
//   };

//   // Conditionally add the callback to the survey
//   if (infoJson) {
//     survey.onComplete.add(surveyComplete);
//   }

//   const onSubmitInfo = async (info) => {
//     localStorage.setItem('particpant-code', info.participantCode);
//     navigate('/VideoPage', { state: { watched: [] } });
//     try {
//       await addDoc(infoCollectionRef, info);
//     } catch (err) {
//       console.error("This is my error:", err);
//     }
//   };

//   return <Survey model={survey} />;
// };


const PersonalInfo = () => {
  const survey = new Model(infoJson);
  const navigate = useNavigate();
  const infoCollectionRef = collection(db, "personalInfo");

  const onSubmitInfo = async (info) => {
    // console.log(info)
    // console.log(info.participantCode)
    localStorage.setItem('particpant-code', info.participantCode);
    navigate('/Testing')
    try {
      await addDoc(infoCollectionRef, info);
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
