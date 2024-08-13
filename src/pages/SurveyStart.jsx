import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  FormControl,
  FormHelperText,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const SurveyStart = () => {
  const [participantCode, setParticipantCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const participantRef = collection(db, "Participants");

  const handleProceed = async () => {
    try {
      const q = query(participantRef, where("Name", "==", participantCode));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 1) {
        // Participant code exists
        console.log(querySnapshot.docs[0].data());
        localStorage.setItem("participantCode", participantCode);
        localStorage.setItem(
          "videostoWatch",
          JSON.stringify(querySnapshot.docs[0].data().video)
        );
        navigate("/Consent");
      } else {
        // Participant code does not exist
        setErrorMessage(
          "The participant code does not exist. Please contact mcheema2@asu.edu for further clarification."
        );
      }
    } catch (error) {
      console.error("Error checking participant code: ", error);
      setErrorMessage(
        "An error occurred while checking the participant code. Please try again later."
      );
    }
  };

  const handleInputChange = (e) => {
    setParticipantCode(e.target.value);
    setErrorMessage(""); // Clear error message on new input
  };

  return (
    <Container maxWidth="sm">
      <Box paddingTop={10} paddingBottom={10}>
        <Typography variant="h4" component="h1" gutterBottom tabIndex={0}>
          Welcome to the Survey
        </Typography>
        <Typography variant="body1" component="p" gutterBottom tabIndex={0}>
          Please enter your participant code to start the survey.
        </Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            id="participant-code"
            label="Participant Code"
            variant="outlined"
            value={participantCode}
            onChange={handleInputChange}
            inputProps={{ "aria-label": "Participant Code" }}
            required
          />
          <FormHelperText id="participant-code-helper-text" tabIndex={0}>
            Enter the code shared with you via email.
          </FormHelperText>
        </FormControl>
        {errorMessage && (
          <Alert severity="error" tabIndex={0}>
            {errorMessage}
          </Alert>
        )}
        <Typography variant="body2" component="p" gutterBottom tabIndex={0}>
          Disclaimer: Once you start the survey, please complete it. Otherwise,
          your responses won't be recorded, and you won't be compensated for
          your time.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceed}
          aria-label="Proceed to consent page"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "bold",
          }}
          tabIndex={0}
        >
          Proceed
        </Button>
      </Box>
    </Container>
  );
};

export default SurveyStart;
