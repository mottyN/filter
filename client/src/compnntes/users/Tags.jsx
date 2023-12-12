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

var categories = [
    'חדשות ומידע',
    'אוכל ובישול',
    'תיירות ונסיעות',
    'בריאות וטיפוח',
    'אמנות ותרבות',
    'טכנולוגיה ומחשבים',
    'ספורט',
    'תחבורה ורכב',
    'סחר אלקטרוני וקניות',
    'חינוך ולמידה',
    'תקשורת ומדיה',
    'אומנות ומוזיקה'
];

export default function Tags() {
  const [checked, setChecked] = React.useState(['wifi']);

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
    <Box sx={{width:'100vh', marginX: 'auto', display: 'flex', justifyContent: 'center'}}>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
     
      {categories.map((c) => {
        return <> 
        <ListItem>
        <ListItemIcon>
          <BluetoothIcon />
        </ListItemIcon>
        <ListItemText id={c} primary={c} />
        <Switch
          edge="end"
          onChange={handleToggle(c)}
          checked={checked.indexOf(c) !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-bluetooth',
          }}
        />
      </ListItem>
      </>
      })}
    </List>
    </Box>
  );
}
