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

export default function Tags(props) {
  const [checked, setChecked] = React.useState([props.tagsClosed]);
// console.log(props.tagsClosed);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.setTagsClosed(newChecked)
    console.log(newChecked);
  };
  React.useEffect(() => {
    setChecked(props.tagsClosed)
  }, [props.tagsClosed])
  return (
    <Box sx={{width:'100vh', marginX: 'auto', display: 'flex', justifyContent: 'center'}}>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>רשימת תגיות</ListSubheader>}
    >
     
      {categories.map((c) => {
        return <div key={c}> 
        <ListItem>
        <ListItemIcon>
          <BluetoothIcon />
        </ListItemIcon>
        <Button variant="outlined">הצג </Button>

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
      </div>
      })}
    </List>
    </Box>
  );
}
