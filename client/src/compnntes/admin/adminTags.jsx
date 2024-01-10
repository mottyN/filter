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
import { useSearchParams } from "react-router-dom";
import { TagsOk } from "./tagsOk";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

export default function AdminTags(props) {
  const [checked, setChecked] = React.useState(["wifi"]);
  const [listTags, setListTags] = React.useState([]);
  const [tag, setTag] = React.useState(null);
  const [listTagsite, setListTagsite] = React.useState({});
  const [listTagsiteok, setListTagsiteok] = React.useState({});
  var storedUserData = JSON.parse(localStorage.getItem("userData"));

  React.useEffect(() => {
    let arr = []
    props.tags.map((o) => {
      if(o.status === 0){
        arr.push(o.name)
      }
    })
    setChecked(arr)
  },[props.tags])
  const handleToggle = (value, id) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      statusTag(id, 0)
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      statusTag(id, 1)

    }

    setChecked(newChecked);
    // props.reqTags()
  };
  const statusTag = async(id, status) => {
    try {
      const res = await fetch(`http://localhost:4000/api/tags/admin`, {
        method: "put",
        headers: {
          authorization: storedUserData.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, status: status }),
      });
      const data = await res.json();
      // setListTagsite(data);
      props.reqTags()
      console.log(data);

      // reqListTags(tagId);
    } catch (e) {
      console.log(e);
    }
  }
  const reqListTags = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`http://localhost:4000/api/tagSite/${id}`, {
        headers: { authorization: storedUserData.accessToken },
      });
      const data = await res.json();
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
      setListTagsiteok(arrOk);

      // console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const addListTags = async (tagId, url, name) => {
    // console.log(obj);
    try {
      const res = await fetch(`http://localhost:4000/api/tagSite/`, {
        method: "post",
        headers: {
          authorization: storedUserData.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tagId: tagId, url, name }),
      });
      const data = await res.json();
      // setListTagsite(data);
      console.log(data);

      reqListTags(tagId);
    } catch (e) {
      console.log(e);
    }
  };

  const putListTags = async (id) => {
    // console.log(obj);
    try {
      const res = await fetch(`http://localhost:4000/api/tagSite/`, {
        method: "put",
        headers: {
          authorization: storedUserData.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, status: 1 }),
      });
      // const data = await res.json();
      console.log(tag);
      reqListTags(tag.id);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteListTags = async (id) => {
    // console.log(obj);
    try {
      const res = await fetch(`http://localhost:4000/api/tagSite/${id}`, {
        headers: {
          authorization: storedUserData.accessToken,
        },
        method: "Delete",
      });
      // const data = await res.json();
      console.log(tag);
      reqListTags(tag.id);
    } catch (e) {
      console.log(e);
    }
  };

  const showtags = (obj) => {
    if (tag !== null && obj.id === tag.id) {
      setTag(null);
      return;
    }
    setTag(obj);
    reqListTags(obj.id);
  };
  const updeuTag = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/tags/admin`, {
        method: "put",
        headers: {
          authorization: storedUserData.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, status: 1 }),
      });
      props.reqTags();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteTag = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/tags/admin`, {
        method: "Delete",
        headers: {
          authorization: storedUserData.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      props.reqTags();
    } catch (e) {
      console.log(e);
    }
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
      {tag === null && (
        <div style={{ display: "flex" }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            subheader={<ListSubheader>רשימת תגיות</ListSubheader>}
          >
            {props.tags &&
              props.tags.map((o) => {
                if (o.status === -1) {
                  return;
                }
                return (
                  <ListItem key={o.id}>
                    <IconButton onClick={() => showtags(o)}>
                      <PreviewIcon />
                    </IconButton>
                    <ListItemText id={o.id} primary={o.name} />
                    <Switch
                      edge="end"
                      onChange={handleToggle(o.name, o.id)}
                      checked={checked.indexOf(o.name) !== -1}
                      inputProps={{
                        "aria-labelledby": "switch-list-label-wifi",
                      }}
                    />
                  </ListItem>
                );
              })}
          </List>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            subheader={<ListSubheader> תגיות ממתינות לאישור</ListSubheader>}
          >
            {props.tags &&
              props.tags.map((o) => {
                if (o.status !== -1) {
                  return;
                }
                return (
                  <ListItem key={o.id}>
                    <ListItemText id={o.id} primary={o.name} />
                    <IconButton onClick={() => updeuTag(o.id)}>
                      <DoneIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteTag(o.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              })}
          </List>
        </div>
      )}
      {tag && (
        <Button
          variant="contained"
          sx={{ height: "50px", margin: "20px" }}
          onClick={() => setTag(null)}
        >
          חזרה לרשימת התגיות
        </Button>
      )}

      {tag && (
        <ListTags
          tag={tag}
          list={listTagsite}
          addListTags={addListTags}
          deleteListTags={deleteListTags}
        />
      )}
      {tag && (
        <TagsOk
          tag={tag}
          list={listTagsiteok}
          addListTags={addListTags}
          deleteListTags={deleteListTags}
          putListTags={putListTags}
        />
      )}
    </Box>
  );
}
