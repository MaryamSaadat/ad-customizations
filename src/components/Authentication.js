import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormControl, InputLabel, Select, MenuItem, Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
    const [heading, setHeading] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
  
    const signIn = async (event) => {
        event.preventDefault();

        // Check if the passwords match
        if (password !== confirmPassword) {
          setHeading("Passwords do not match");
          return;
        }
        const data = new FormData(event.currentTarget);
        const email = data.get("email")
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/Info")

        } catch (err) {
          console.error(err);
          setHeading("Invalid Password")
        }
      };
    
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Typography variant="body">{heading}</Typography>
      <Box component="form" noValidate onSubmit={signIn} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Your email"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "secondary.main",
            color: "white",
          }}
          className="category-btn"
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  </Container>
  )
}

export default Authentication