import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const Responses = () => {
  const [conciseTimes, setConciseTimes] = useState([]);
  const [detailedTimes, setDetailedTimes] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      const citiesRef = collection(db, "questionnaire");
      const q = query(
        citiesRef,
        where("participantCode", "==", "P5"),
        where("videoID", "==", 14)
      );

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setResponse(doc.data());
          });
        // querySnapshot.forEach((doc) => {

        // //   const reqTimes = doc.data().reqTimes;
        // //   const conciseTimes = [];
        // //   const detailedTimes = [];
        // //   reqTimes.forEach((entry) => {
        // //     const [type, time] = entry.split(": ");
        // //     if (type.includes("Concise")) {
        // //       conciseTimes.push(time);
        // //     } else if (type.includes("Detailed")) {
        // //       detailedTimes.push(time);
        // //     }
        // //   });
        //   console.log(doc.data())
        // //   setConciseTimes(conciseTimes);
        // //   setDetailedTimes(detailedTimes);
        // });
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchResponses();
  }, []); // Empty dependency array means this effect will run once after the first render

  return (
    // <div>
    //   <div>
    //     <h2>Concise description times:</h2>
    //     {conciseTimes.map((time, index) => (
    //       <p key={index}>{time}</p>
    //     ))}
    //   </div>
    //   <div>
    //     <h2>Detailed description times:</h2>
    //     {detailedTimes.map((time, index) => (
    //       <p key={index}>{time}</p>
    //     ))}
    //   </div>
    // </div>
    <div>
      {response && (
        <div>
          <h2>Questionnaire Response</h2>
          <p>Video ID: {response.videoID}</p>
          <p>Any Question: {response.anyQuestion}</p>
          <p>Effective: {response.effective}</p>
          <p>Efficient: {response.efficient}</p>
          <p>Enjoyable: {response.enjoyable}</p>
          <p>Summary: {response.summary}</p>
        </div>
      )}
    </div>
  );
};

export default Responses;
