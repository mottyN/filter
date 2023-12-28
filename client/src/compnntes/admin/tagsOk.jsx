import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';

import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



export function TagsOk(props) {
  const [name, setName] = React.useState('')
  const [url, setUrl] = React.useState('')

    console.log(props.list);
    
  return (
    <div style={{margin :'50px'}}>
      <ListItemText primary={'ממתין לאישור'} />
      <List sx={{border : '1px black solid'}}>
        {props.list.length && props.list.map((i) => {
          return (
            <ListItem key={i.users_sites_id}>
              <ListItemText id={i.users_sites_id} primary={i.name} sx={{marginRight : '40px'}}/>
              <ListItemText id={i.users_sites_id} primary={i.url} />
              <IconButton onClick={() => props.deleteListTags(i.users_sites_id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => props.putListTags(i.users_sites_id)}>
                  <DoneIcon />
                </IconButton>
            </ListItem>
            
          );
        })}
      </List>
     
    </div>
  );
}
