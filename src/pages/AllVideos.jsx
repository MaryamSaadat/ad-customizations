import React from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../config/firebase";
import data from '../data/1.json'; // Import your JSON data

const allVideos = () => {

  const uploadData = async () => {
    try {
      const videosCollection = collection(db, "videos");

      for (let item of data) {
        await addDoc(videosCollection, {
          frequency: item.frequency,
          type: item.type,
          focus: item.focus,
          interpretation: item.interpretation,
          descriptions: item.descriptions,
          time_stamp_start: item.time_stamp_start,
          videoID: item.videoID,
          videoUrl: item.videoUrl,
          videoTitle: item.videoTitle,
        });
        console.log(`Document ${item.videoTitle} added successfully`);
      }
      alert("Data uploaded successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error uploading data. Check console for details.");
    }
  };

  return (
    <div>
      <h1>Upload Data to Firestore</h1>
      <button onClick={uploadData}>
        Upload Data
      </button>
    </div>
  );
};

export default allVideos;


// import React, { useState, useEffect } from "react";
// import { Button } from "@mui/material";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { db } from "../config/firebase";

// const AllVideos = () => {
//   const [descriptions, setDescriptions] = useState([]);

//   useEffect(() => {
//     const fetchVideoData = async () => {
//       const videoRef = collection(db, "videos");
//       try {
//         const data = await getDocs(videoRef);
//         setDescriptions(data.docs.map((doc) => doc.data()));
//       } catch (err) {
//         console.error("Error fetching document:", err);
//       }
//     };

//     fetchVideoData();

//     // Cleanup logic if needed
//     return () => {
//       // Cleanup logic here if needed
//     };
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       const allVideosRef = collection(db, "allVideos");
//       descriptions.forEach(async (description) => {
//         await addDoc(allVideosRef, description);
//       });
//       console.log("Videos info submitted successfully");
//     } catch (err) {
//       console.error("Error submitting video info:", err);
//     }
//   };

//   return (
//     <>
//       <Button
//         onClick={handleSubmit}
//         variant="contained"
//         color="primary"
//         fullWidth
//       >
//         Submit videos
//       </Button>
//     </>
//   );
// };

// export default AllVideos;
