import { useState } from "react";
import { TextField, Button, Typography, Grid, Box } from "@mui/material";


export function Support(props) {
  return (
    <div>
      <h2>תמיכה</h2>
      <ContactForm/>
    </div>
  );
}



 function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const domin = "http://localhost:4000";

        const response = await fetch(`${domin}/api/email `, {
            method: "post",
            headers: {
              "Content-Type": "application/json", // Specify the content type if sending JSON data.
            },
            body: JSON.stringify({
                subject: name+" "+ email,
              text: message,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            // window.location.href = "/login";
            alert("הפניה נשלחה בהצלחה");
       
          } else {
            // errMessage(data.message);
            console.error("Request failed with status:", response.status);
          }
    }
    catch(e){
        console.log(e);
    }
    setEmail('')
    setMessage('')
    setName("")
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" align="center" mb={2}>
              צור קשר
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src="https://cdn.pixabay.com/photo/2023/04/24/03/16/camping-7947056__340.jpg"
                      alt="Contact"
                      style={{ maxWidth: "100%" }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="שם"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                    type="email"
                  />
                  <TextField
                    fullWidth
                    label="הודעה"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
                    required
                    multiline
                    rows={4}
                  />
                  <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    שלח
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}