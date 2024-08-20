import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Instructions = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/NoDesc');
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h2" component="h1" tabIndex="0">
          Instructions
        </Typography>
        <Typography variant="body1" component="p" mt={2} tabIndex="0">
          You will watch two different videos. Each video will be watched three times:
        </Typography>
        <ul>
          <li tabIndex="0">First, you will watch the video without any descriptions.</li>
          <li tabIndex="0">After watching, you will provide your ratings.</li>
          <li tabIndex="0">Next, you will select customizations, and you will watch the video again twice, once with your customizations, and once with control customizations.</li>
          <li tabIndex="0">The order of the customized and control variation will be randomized, so you will not know which variation includes your customizations.</li>
          <li tabIndex="0">After watching with the customizations, you will again provide your ratings.</li>
        </ul>
        <Typography variant="body1" component="p" mt={2} tabIndex="0">
          Please proceed by clicking the "Next" button when you are ready.
        </Typography>
          <Button
           variant="contained"
          color="primary"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "bold",
          }}
            onClick={handleNextClick}
            aria-label="Proceed to the first video without descriptions"
          >
            Next
          </Button>
      </Box>
    </Container>
  );
};

export default Instructions;
