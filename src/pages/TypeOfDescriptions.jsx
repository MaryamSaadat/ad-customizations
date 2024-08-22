import React, { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const TypeOfDescriptions = () => {
  const [descriptions, setDescriptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const docRef = doc(db, "test-video", "IUMKCU5yjaXxrmONUES2");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDescriptions(docSnap.data());
          console.log(docSnap.data())
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchDescriptions();
  }, []);

  const handleProceed = () => {
    navigate('/Instructions');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom tabIndex={0}>
        You will be watching a short video with a series of different types of customizations. 
        These are customizations that will be available to you for customizing audio descriptions for videos in the user study.
        Watch the video and browse through the customised descriptions to familiarise yourself with the differences between them.
      </Typography>
      <Box my={4}>
        <video height={"400px"} width={"50%"}controls aria-label="Test video for description types">
          <source src="https://firebasestorage.googleapis.com/v0/b/ad-customizations.appspot.com/o/test.mp4?alt=media&token=5a3ab078-3ae2-4e26-9e57-91f6e8a8d0e1" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
      <Typography variant="h5" gutterBottom tabIndex={0}>
        Types of Descriptions for the Video
      </Typography>
      <Box my={2}>
        <Typography variant="h6" tabIndex={0}>Concise customization: Brief descriptions</Typography>
        <Typography variant="body1" tabIndex={0}>
          {descriptions.concise}
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" tabIndex={0}>Detail customization: Longer descriptions with additional visual details</Typography>
        <Typography variant="body1" tabIndex={0}>
          {descriptions.detail}
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" tabIndex={0}>Main story customization: audio descriptions only focus on visual elements vital to understanding</Typography>
        <Typography variant="body1" tabIndex={0}>
          {descriptions.main}
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" tabIndex={0}>Character customization: Audio descriptions that provide additional details about character's visual details</Typography>
        <Typography variant="body1" tabIndex={0}>
          {descriptions.character}
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" tabIndex={0}>Environment customization: audio descriptions that provide additional details about the scenes</Typography>
        <Typography variant="body1" tabIndex={0}>
          {descriptions.environment}
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" tabIndex={0}>Interpretation customization: includes subjectivity in the audio descriptions</Typography>
        <Typography variant="body1" tabIndex={0}>
          {descriptions.interpretation}
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" tabIndex={0}>No interpretation customization: includes little to no subjectivity in the audio descriptions</Typography>
        <Typography variant="body1" tabIndex={0}>
          {descriptions.objective}
        </Typography>
      </Box>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "bold",
          }}
          onClick={handleProceed}
          aria-label="Proceed to video page for the user study"
        >
          Proceed to User study
        </Button>
      </Box>
    </Box>
  );
};

export default TypeOfDescriptions;
