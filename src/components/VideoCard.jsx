import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const VideoCard = (props) => {
  const videoArray = Object.values(props.videoList);

  return (
    <>
      <Stack
        direction={"row"}
        flexWrap="wrap"
        justifyContent="start"
        alignItems="start"
        gap={2}
      >
        {videoArray.map((video) => (
          <Card
            key={video.id}
            sx={{
              width: { xs: "100%", sm: "350px", md: "270px" },
              boxShadow: "none",
              borderRadius: "10px",
            }}
          >
            {/* passing the video path to the video page */}
            <Link to="/VideoPage" state={{ video_id: video.id, video_title: video.title }}>
              <CardMedia
                image={video.thumbnail}
                sx={{
                  width: { xs: "350px", sm: "350px", md: "270px" },
                  height: 180,
                }}
              />
            </Link>

            <CardContent
              sx={{ backgroundColor: "primary.main", height: "100px" }}
            >
              <Link
                to="/VideoPage"
                state={{ path: video.path, video_id: video.id }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary.dark"
                >
                  {/* The slice function is used to reduce the title length to 60 */}
                  {video.title.slice(0, 60)}
                </Typography>
              </Link>

              <Link
                to={{
                  pathname: "/VideoPage",
                  state: { path: video.path, video_id: video.id },
                }}
              >
                <Grid container paddingTop={1}>
                  <Typography
                    fontSize="0.75rem"
                    color="white"
                    backgroundColor="secondary.main"
                    padding="3px 10px"
                    borderRadius="5px"
                    marginRight={"10px"}
                  >
                    Described by AI
                  </Typography>
                </Grid>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default VideoCard;
