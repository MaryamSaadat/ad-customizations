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
