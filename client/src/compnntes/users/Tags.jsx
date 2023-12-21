import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import WebIcon from '@mui/icons-material/Web';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Key } from '@mui/icons-material';
import { useParams } from 'react-router-dom';


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
  const [tags, setTags] = React.useState(props.tags);

  const  {id}  = useParams();


// console.log(props.tagsClosed);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.name);
    const newChecked = [...checked];
    console.log(value);
    if (currentIndex === -1) {
      newChecked.push(value);
      props.tagoeoe(value.id, true)

    } else {
      newChecked.splice(currentIndex, 1);
      props.tagoeoe(value.id, false)

    }

    setChecked(newChecked);
    props.setTagsClosed(newChecked)
    // try{
    //   const data = fetch(`http://localhost:4000/api/tagsUser/${id}`,
      
    //    {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ tagId : value.id}),
    //   })
    // }
    // catch(e){
    //   console.log(e);
    // }
    console.log(newChecked);
  };
  React.useEffect(() => {
    setChecked(props.tagsClosed)
    setTags(props.tags)
  }, [props.tagsClosed, props.tags])
  return (
    <Box sx={{width:'100vh', marginX: 'auto', display: 'flex', justifyContent: 'center'}}>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>רשימת תגיות</ListSubheader>}
    >
     
      {tags&& tags.map((c) => {
        return <div key={c.id}> 
        <ListItem>
        <ListItemIcon>
          <WebIcon />
        </ListItemIcon>
        <Button variant="outlined">הצג </Button>

        <ListItemText id={c.id} primary={c.name} />
        <Switch
          edge="end"
          onChange={handleToggle(c)}
          checked={checked.indexOf(c.name) !== -1}
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
