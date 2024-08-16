import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button, List, ListItem, IconButton, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";

const descriptionOptions = ["none", "control", "control + frequency", "custom"];

const AddParticipant = () => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([{ videoID: "", descriptions: [""] }]);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddVideo = () => {
    setVideos([...videos, { videoID: "", descriptions: [""] }]);
  };

  const handleVideoChange = (index, event) => {
    const newVideos = videos.map((video, i) => {
      if (i === index) {
        return { ...video, [event.target.name]: event.target.value };
      }
      return video;
    });
    setVideos(newVideos);
  };

  const handleDescriptionChange = (videoIndex, descriptionIndex, event) => {
    const newVideos = videos.map((video, i) => {
      if (i === videoIndex) {
        const newDescriptions = video.descriptions.map((desc, j) => {
          if (j === descriptionIndex) {
            return event.target.value;
          }
          return desc;
        });
        return { ...video, descriptions: newDescriptions };
      }
      return video;
    });
    setVideos(newVideos);
  };

  const handleAddDescription = (index) => {
    const newVideos = videos.map((video, i) => {
      if (i === index) {
        return { ...video, descriptions: [...video.descriptions, ""] };
      }
      return video;
    });
    setVideos(newVideos);
  };

  const handleRemoveVideo = (index) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
  };

  const handleRemoveDescription = (videoIndex, descriptionIndex) => {
    const newVideos = videos.map((video, i) => {
      if (i === videoIndex) {
        const newDescriptions = video.descriptions.filter((_, j) => j !== descriptionIndex);
        return { ...video, descriptions: newDescriptions };
      }
      return video;
    });
    setVideos(newVideos);
  };

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccessMessage("");

      if (!name || videos.some(video => !video.videoID || video.descriptions.some(desc => !desc))) {
        setError("All fields must be filled.");
        return;
      }

      const videoData = videos.reduce((acc, video) => {
        acc[video.videoID] = video.descriptions;
        return acc;
      }, {});

      const docData = {
        Name: name,
        video: videoData,
      };

      await addDoc(collection(db, "Participants"), docData); // Replace with your actual collection name

      setSuccessMessage("Document successfully created!");
      setName("");
      setVideos([{ videoID: "", descriptions: [""] }]);
    } catch (err) {
      setError("Error creating document: " + err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Create Video Order
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Enter name"
          margin="normal"
        />

        <List>
          {videos.map((video, index) => (
            <Box key={index} mb={4}>
              <TextField
                label={`Video ID ${index + 1}`}
                name="videoID"
                value={video.videoID}
                onChange={(e) => handleVideoChange(index, e)}
                variant="outlined"
                aria-label={`Enter video ID ${index + 1}`}
                margin="normal"
                fullWidth
              />
              <Typography variant="h6" gutterBottom>
                Descriptions:
              </Typography>
              {video.descriptions.map((description, descIndex) => (
                <ListItem key={descIndex}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id={`description-select-label-${index}-${descIndex}`}>
                      Description {descIndex + 1}
                    </InputLabel>
                    <Select
                      labelId={`description-select-label-${index}-${descIndex}`}
                      value={description}
                      onChange={(e) => handleDescriptionChange(index, descIndex, e)}
                      label={`Description ${descIndex + 1}`}
                      aria-label={`Select description ${descIndex + 1} for video ${index + 1}`}
                    >
                      {descriptionOptions.map((option, i) => (
                        <MenuItem key={i} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton
                    aria-label="delete description"
                    onClick={() => handleRemoveDescription(index, descIndex)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
              <Button variant="contained" onClick={() => handleAddDescription(index)} aria-label="Add another description">
                Add Description
              </Button>
              <Box mt={2}>
                <Button variant="contained" color="secondary" onClick={() => handleRemoveVideo(index)} aria-label="Remove video">
                  Remove Video
                </Button>
              </Box>
            </Box>
          ))}
        </List>
        <Button variant="contained" onClick={handleAddVideo} aria-label="Add another video">
          Add Video
        </Button>

        {error && (
          <Typography variant="body1" color="error" mt={2}>
            {error}
          </Typography>
        )}

        {successMessage && (
          <Typography variant="body1" color="primary" mt={2}>
            {successMessage}
          </Typography>
        )}

        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleSubmit} aria-label="Submit video order">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddParticipant;
