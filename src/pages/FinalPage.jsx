import React from "react";
import {
  Typography,
  Box,
  Container,
} from "@mui/material";

const FinalPage = () => {
  return (
    <>
      <Container
        component="main" // Main content area
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          padding: 10,
          minHeight: "100vh", // Ensure it takes full screen height
          outline: "none", // Remove any default outline to avoid double borders when focusing
        }}
        role="region"
        aria-labelledby="final-page-heading"
        tabIndex={0} // Make the entire container focusable for screen readers
      >
        <Typography
          variant="h3"
          component="h1"
          id="final-page-heading"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          Survey Complete
        </Typography>
        <Typography
          variant="h6"
          sx={{ marginBottom: 4 }}
          tabIndex={0} // Ensure the text is focusable and readable by screen readers
        >
          You have completed the survey. Thank you for your time. We will reach out to your regarding the gift card via email.
          <br />
          You may close this tab.
        </Typography>
      </Container>
    </>
  );
};

export default FinalPage;
