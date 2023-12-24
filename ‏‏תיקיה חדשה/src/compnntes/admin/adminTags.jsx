import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import WifiIcon from "@mui/icons-material/Wifi";
import WebIcon from "@mui/icons-material/Web";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import { ListTags } from "./listTags";

export default function AdminTags(props) {
  const [checked, setChecked] = React.useState(["wifi"]);
  const [listTags, setListTags] = React.useState([]);
  const [tag, setTag] = React.useState(null)

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

  return (
    <Box
      sx={{
        width: "100vh",
        marginX: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        subheader={<ListSubheader>רשימת תגיות</ListSubheader>}
      >
        {props.tags &&
          props.tags.map((o) => {
            return (
              <ListItem key={o.id}>
                <IconButton onClick={() => setTag(o)}>
                  <PreviewIcon />
                </IconButton>
                <ListItemText id={o.id} primary={o.name} />
                <Switch
                  edge="end"
                  onChange={handleToggle(o.name)}
                  checked={checked.indexOf(o.name) !== -1}
                  inputProps={{
                    "aria-labelledby": "switch-list-label-wifi",
                  }}
                />
              </ListItem>
            );
          })}
      </List>
      {tag &&  <ListTags tag={tag}/>}
         
      
    </Box>
  );
}
