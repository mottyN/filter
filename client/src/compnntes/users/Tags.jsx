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
import Button from "@mui/material/Button";
import { Key } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import PreviewIcon from "@mui/icons-material/Preview";
import { IconButton } from "@mui/material";

var categories = [
  "חדשות ומידע",
  "אוכל ובישול",
  "תיירות ונסיעות",
  "בריאות וטיפוח",
  "אמנות ותרבות",
  "טכנולוגיה ומחשבים",
  "ספורט",
  "תחבורה ורכב",
  "סחר אלקטרוני וקניות",
  "חינוך ולמידה",
  "תקשורת ומדיה",
  "אומנות ומוזיקה",
];

export default function Tags(props) {
  const [checked, setChecked] = React.useState([props.tagsClosed]);
  const [tags, setTags] = React.useState(props.tags);
  const [listTagsite, setListTagsite] = React.useState({});

  const { id } = useParams();
  var storedUserData = JSON.parse(localStorage.getItem("userData"));

  // console.log(props.tagsClosed);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.name);
    const newChecked = [...checked];
    console.log(value);
    if (currentIndex === -1) {
      newChecked.push(value);
      props.tagoeoe(value.id, true);
    } else {
      newChecked.splice(currentIndex, 1);
      props.tagoeoe(value.id, false);
    }

    setChecked(newChecked);
    props.setTagsClosed(newChecked);
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
    setChecked(props.tagsClosed);
    setTags(props.tags);
  }, [props.tagsClosed, props.tags]);

  const reqListTags = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`http://localhost:4000/api/tagSite/${id}`, {
        headers: { authorization: storedUserData.accessToken },
      });
      const data = await res.json();
      console.log(data);
      let arr = [];
      let arrOk = [];

      data.forEach((o) => {
        if (o.statusOk === 1) {
          arr.push(o);
        } else {
          arrOk.push(o);
        }
      });
      setListTagsite(arr);
      // setListTagsiteok(arrOk);

      // console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const shwoSiteTags = (obj) => {
    reqListTags(obj.id);
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
        {tags &&
          tags.map((c) => {
            return (
              <div key={c.id}>
                <ListItem>
                  <IconButton onClick={()=>shwoSiteTags(c)}>
                    <PreviewIcon />
                  </IconButton>
                  <ListItemText id={c.id} primary={c.name} />
                  <Switch
                    edge="end"
                    onChange={handleToggle(c)}
                    checked={checked.indexOf(c.name) !== -1}
                    inputProps={{
                      "aria-labelledby": "switch-list-label-bluetooth",
                    }}
                  />
                </ListItem>
              </div>
            );
          })}
      </List>
      <List   sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        subheader={<ListSubheader>רשימת אתרים בתגית</ListSubheader>}>
        {listTagsite.length &&
          listTagsite.map((o) => {
            return (
              <ListItem key={o.users_sites_id}>
                <ListItemText id={o.name} primary={o.name} />
                <ListItemText id={o.url} primary={o.url} />

              </ListItem>
            );
          })}
      </List>
    </Box>
  );
}
