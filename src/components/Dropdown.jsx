// Import necessary components and styles from Material-UI
import React, { useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel, Container, Typography } from '@mui/material';

// Create a functional component
function Dropdown({ onSelectDescriptionType }) {
    const [selectedType, setSelectedType] = useState('');

    const handleDropdownChange = (event) => {
      const selectedType = event.target.value;
      setSelectedType(selectedType);
      onSelectDescriptionType(selectedType);
    };

  return (
    <Container sx={{
      borderRadius: "5px",
      padding: "40px 0"
    }}>
      {/* Material-UI FormControl to style the dropdown */}
      <FormControl fullWidth>
        {/* Material-UI InputLabel for the dropdown */}
        <InputLabel id="video-description-label">Select Video Description</InputLabel>

        {/* Material-UI Select component for the dropdown */}
        <Select
          labelId="video-description-label"
          id="video-description"
          value={selectedType}
          onChange={handleDropdownChange}
          label="Select Video Description"
        >
          {/* Menu items for different types of video descriptions */}
          <MenuItem value="concise">Concise Audio Descriptions</MenuItem>
          <MenuItem value="complete">Detailed audio description</MenuItem>
          <MenuItem value="prompt1">Detailed Prompt 1</MenuItem>
          <MenuItem value="human">Human Descriptions</MenuItem>
        </Select>
      </FormControl>

      {/* Display the selected video description type */}
      <Typography variant="body1" sx={{ color: "primary.light", paddingTop:"20px" }}>
        Selected Video Description Type: {selectedType}
        </Typography>
    </Container>
  );
}

// Export the component for use in other parts of your application
export default Dropdown;
