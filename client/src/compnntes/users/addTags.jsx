import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

export default function AddTags({ tags }) {
  // console.log(props.tags.changeKeyNameToLabel);
  const [value, setValue] = React.useState('');
  const [nameAdd, setNameAdd] = React.useState('');
  const [urlAdd, setUrlAdd] = React.useState('');
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');


  console.log(value);
  const addsiteTag = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/tagSite/`,

        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tagId: value.id, url: urlAdd, name : nameAdd, status: 0 }),
        }
      );
      let data = await res.json()
      if(data.status){
        alert('ההצעה נשלחה')
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            margin: "auto",
          }}
        >
          <h3>הוספת אתר לתגית</h3>

          <Autocomplete
           value={value}
           onChange={(event, newValue) => {
             setValue(newValue);
           }}
            disablePortal
            id="combo-box-demo"
            options={changeKeyNameToLabel(tags)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="תגיות" />}
          />

          <TextField id="standard-basic" label="כתובת אתר" variant="standard" value={urlAdd} onChange={(e) => setUrlAdd(e.target.value)}/>
          <TextField id="standard-basic" label="שם האתר " variant="standard" value={nameAdd} onChange={(e) => setNameAdd(e.target.value)}/>

          <Button variant="contained" onClick={addsiteTag}>שלח הצעה</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            margin: "auto",
          }}
        >
          <h3>הצעת תגית חדשה</h3>

          <TextField id="standard-basic" label="שם התגית" variant="standard" />
          <TextField
            id="standard-basic"
            label="כתובת אתר לדוגמא"
            variant="standard"
          />
          <TextField id="standard-basic" label="שם האתר " variant="standard" />

          <Button variant="contained">
            שלח הצעה
          </Button>
        </Box>
      </Box>
    </div>
  );
}

function ComboBox({ tags }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={changeKeyNameToLabel(tags)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="תגיות" />}
    />
  );
}

function changeKeyNameToLabel(data) {
  return data.map((item) => {
    return { ...item, label: item.name, name: undefined };
  });
}
