import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function SignIn() {
  const handleSubmit = async(event) => {
    event.preventDefault();
    // console.log();
    const domin = "http://localhost:4000";
    
    try {
        const dataFrom = new FormData(event.currentTarget);
        const response = await fetch(`${domin}/api/users `, {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Specify the content type if sending JSON data.
        },
        body: JSON.stringify({
            name : dataFrom.get("name"),
          email: dataFrom.get("email"),
          password: dataFrom.get("password"),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = "/login";
        alert("המשתמש נוצר בהצלחה");
   
      } else {
        // errMessage(data.message);
        console.error("Request failed with status:", response.status);
      }
      // console.log("Response from server:", data.message);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
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
            id="name"
            label="שם משתמש"
            name="name"
            autoComplete="name"
            autoFocus
          />
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
            <Grid item xs>
             
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}