import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LogIn() {
  const [data, setData] = useState("");
//   const [con, setCon] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
  const [admin, setAdmin] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isadmin = queryParams.get("admin");

  useEffect(() => {
    if (isadmin == "1") {
      setAdmin(true);
    }
  }, []);
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
      const email = data.get("email")
      const password = data.get("password")
   
      //קוד לשרת
      const domin = "http://localhost:4000";

      try {
        const response = await fetch(`${domin}/api/login?admin=${admin} `, {
          method: "post",
          headers: {
            "Content-Type": "application/json", // Specify the content type if sending JSON data.
          },
          body: JSON.stringify({
            name: email,
            password: password,
          }),
        });
        const data = await response.json();
        setData(data);
        if (response.ok) {
          // setCon(true)
          var userDataJSON = JSON.stringify(data);
          localStorage.setItem("userData", userDataJSON);
          // console.log(data);
          if (admin) {
            window.location.href = `/admin`;
  
          }
          else{
  
            window.location.href = `/users/${data.id}`;
          }
          // alert("הצלחה");
        } else {
          console.log(data.massenge);
          // errMessage(data.message)
          console.error("Request failed with status:", response.status);
          alert(data.massenge);
        }
        // console.log("Response from server:", data.message);
      } catch (error) {
        console.error("An error occurred:", error);
        alert("שגיאה-");
      }
  };

  return (
    <Container component="main" maxWidth="sm">
        <h1>פילטר</h1>
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
