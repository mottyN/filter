import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



export function ListTags(props) {
    console.log();
  return (
    <div>
      <ListItemText primary={props.tag.name} />
      {/* <List>
        {props.list.map((i) => {
          return (
            <ListItem key={i.id}>
              <ListItemText id={i.id} primary={i.name} />
            </ListItem>
          );
        })}
      </List> */}
      <Button variant="text">הוסף</Button>
      <TextField id="standard-basic" label=" הוסף אתר לרשימה" variant="standard" />
    </div>
  );
}
