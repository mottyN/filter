import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Key } from '@mui/icons-material';



export default function SiteAdmin (props) {
    const [checked, setChecked] = React.useState([props.siteClosed]);
    // console.log(props.siteClosed);
      const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value.url);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value.url);
          props.setsiteClosed(value.id, 0)
        } else {
          newChecked.splice(currentIndex, 1);
          props.setsiteClosed(value.id, 1)

        }
    
        setChecked(newChecked);
        
        console.log(newChecked);
      };
      React.useEffect(() => {
        setChecked(props.siteClosed)
      }, [props.siteClosed])
  return (
    <Box sx={{ marginX: 'auto', display: 'flex', justifyContent: 'center'}}>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>רשימת אתרים</ListSubheader>}
    >
     
      {props.categories.map((c) => {
        return <div key={c.id}> 
        <ListItem>
        {/* <ListItemIcon>
          <BluetoothIcon />
        </ListItemIcon> */}
        {/* <Button variant="outlined">הצג </Button> */}
        <ListItemText id={c.id} primary={c.name} />
        <ListItemText id={c.id} primary={c.url} />
        <Switch
          edge="end"
          onChange={handleToggle(c)}
          checked={checked.indexOf(c.url) !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-bluetooth',
          }}
        />
      </ListItem>
      </div>
      })}
    </List>
    </Box>
  );
}
