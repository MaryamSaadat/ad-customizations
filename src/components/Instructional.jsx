// Inside Home.js

import React, { useState } from 'react';
import { Dropdown, VideoPlayer, Sidebar , VideoCard} from './index';
import complete_description from '../data/descriptions';
import instructional from '../data/instructional';
import { Grid, Stack, Box, Typography } from '@mui/material';

const Instructional = () => {
const [selectedCategory, setSelectedCategory] = useState("Home");

return (
<Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box
          sx={{
            height: { xs: "auto", md: "100vh" },
            paddingRight: { xs: 0, md: 2 },
            marginBottom: 2,
          }}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Box>
        <Box
          p={2}
          sx={{
            overflowY: "auto",
            height: "90vh",
            flex: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={2} color="primary.light">
            Instructional Videos
          </Typography>
          <VideoCard videoList={instructional} />
        </Box>
      </Stack>
  );
};

export default Instructional;
