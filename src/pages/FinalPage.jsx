import React, { useState } from "react";
import {
  Typography,
  Box,
} from "@mui/material";
import { Navbar } from "../components";

const FinalPage = () => {


  
    return (
      <>
        <Navbar text="Video viewing section complete" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          textAlign="left"
  
          padding={10}
        >
          <Typography variant="body1">
            You have completed the video viewing session, thank you for you time.
            <br/>
            You may close this tab.
          </Typography>
        </Box>
      </>
    );
}

export default FinalPage