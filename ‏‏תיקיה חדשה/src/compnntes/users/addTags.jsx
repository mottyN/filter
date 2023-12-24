import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Button from '@mui/material/Button';
import Autocomplete from "@mui/material/Autocomplete";

export default function AddTags(props) {
  return (
    <div>
        <Box sx={{display: 'flex', flexDirection : "row"}}>
      <Box sx={{display: 'flex', flexDirection : "column", width : '30%', margin : 'auto'}}>
        <h3>הוספת אתר לתגית</h3>
        <ComboBox />
        <TextField id="standard-basic" label="הוסף אתר" variant="standard" />
        <Button variant="contained">שלח הצעה</Button>

      </Box>
      <Box sx={{display: 'flex', flexDirection : "column", width : '30%', margin : 'auto'}}>
      <h3>הצעת תגית חדשה</h3>

      <TextField id="standard-basic" label="שם התגית" variant="standard" />
      <TextField id="standard-basic" label="הוסף אתר לדוגמא" variant="standard" />
        <Button variant="contained">שלח הצעה</Button>

      </Box>
      </Box>
    </div>
  );
}

 function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={categoriesWithObjects}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="תגיות" />}
    />
  );
}
var categoriesWithObjects = [
  { label: "חדשות ומידע", id: 1 },
  { label: "אוכל ובישול", id: 2 },
  { label: "תיירות ונסיעות", id: 3 },
  { label: "בריאות וטיפוח", id: 4 },
  { label: "אמנות ותרבות", id: 5 },
  { label: "טכנולוגיה ומחשבים", id: 6 },
  { label: "ספורט", id: 7 },
  { label: "תחבורה ורכב", id: 8 },
  { label: "סחר אלקטרוני וקניות", id: 9 },
  { label: "חינוך ולמידה", id: 10 },
  { label: "תקשורת ומדיה", id: 11 },
  { label: "אומנות ומוזיקה", id: 12 },
];
