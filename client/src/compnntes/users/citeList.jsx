import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import WebIcon from "@mui/icons-material/Web";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const pages = [
  "https://www.kore.co.il/",
  "https://www.kore.co.il/",
  "https://www.kore.co.il/",
];

export default function SwitchListSecondary(props) {
  const [checked, setChecked] = React.useState(["wifi"]);
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");

  const [list, setList] = React.useState(props.sites);

  React.useEffect(()=>{
    setList(props.sites)
  },[props.sites])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  console.log(checked);

  const hndelAdd = () => {
    if (name === "") {
      return;
    }
    props.addSite(url, name)
    setName("");
    setName('');
    setUrl('');
  };

  const hndeldelete = (p) => {
    let arr = [...list];
    arr = arr.filter(function (item) {
      return item !== p;
    });
    setList(arr);
  };
  return (
    <div>
      <Box
        sx={{
          width: "100vh",
          marginX: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems :'center',
          margin :'50px'
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" ,}}
          subheader={<ListSubheader>רשימת אתרים אישית</ListSubheader>}
        >
          <ListItem>
            <Stack direction="row" spacing={1}>
              {/* <TextField id="standard-basic" label="הוסף אתר" variant="standard" /> */}
              <TextField
                id="outlined-controlled"
                label="שם אתר"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
                <TextField
                id="outlined"
                label=" כתובת האתר"
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                }}
              />
              <Button variant="outlined" onClick={hndelAdd}>
                הוסף
              </Button>
            </Stack>
          </ListItem>
          {list.map((p) => {
            return (
              <ListItem>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" primary={p.url} />
                <Switch
                  edge="end"
                  onChange={handleToggle(p)}
                  checked={checked.indexOf(p) !== -1}
                  inputProps={{
                    "aria-labelledby": "switch-list-label-wifi",
                  }}
                />
                <IconButton onClick={() => hndeldelete(p)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
        <List subheader={<ListSubheader>רשימת תגיות סגורות</ListSubheader>} sx={{border :' 1px black solid', borderRadius: '10px'}}>
          {props.tagsClosed.map((t) => {
            return (
              <ListItem key={t}>
                <ListItemText id="switch-list-label-wifi" primary={t} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </div>
  );
}
