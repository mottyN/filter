const express = require("express");
const { getUser, getUsers } = require("../db/db");
const { getSite, getSites } = require("../db/dbSites");
const { getSiteUser } = require("../db/dbSiteUser");
const { getTagsSitesBySiteId } = require("../db/dbSitesTags");
const {
  getTagsUserByID,
  getTagsUser,
  getTagsUserByTagID,
} = require("../db/dbTagsUser");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    //    console.log( password);
    if (name && password) {
      // console.log(req.body);

      const users = await getUsers();
      console.log(users);
      const user = findUser(name, password, users);
      if (user) {
        const { url } = req.body;
        const sites = await getSites();

        const site = sites.find((obj) => {
          // console.log(obj.url);
          console.log(obj.url.includes(url) );

          return obj.url.includes(url);
        });
        console.log(site);
        if (!site) {
          res.status(200).end("true");
          //   console.log('fvdsf');
          return;
        }
        console.log(site);
        if (site.status === 0) {
          res.status(200).end("false");
          return;
        }

        const sitesUser = await getSiteUser(user.id);
        const siteUser = sitesUser.find((obj) => {
          return obj.url === `https://${url}`;
        });

        if (siteUser?.status === 0) {
          res.status(200).end("false");
          return;
        }

        const tags = await getTagsSitesBySiteId(site.id);

        if (tags) {
          let fleg = false;

          for (i in tags) {
              const tagUser = await getTagsUserByTagID(tags[i].tags_id, user.id);
              console.log(tagUser);
            if (tagUser.length > 0) {
              fleg = true;
              console.log("eryhe");
              res.status(200).end("false");
              return;
            }
          }
        }
        res.status(200).end("true");
        return;
      } else {
        res.status(404).send("not fuond");
      }
    } else {
      res.status(400).send("user must have a name and an passwords");
    }
  } catch (error) {
    res.status(500).send("server failed to connect with DB" + error);
  }
});

function findUser(name, password, users) {
  // עבור כל משתמש במערך
  for (let i = 0; i < users.length; i++) {
    // בדיקה אם השם משתמש והסיסמה תואמים
    if (users[i].name === name && users[i].password == password) {
      // אם תואמים, החזרת המשתמש
      return users[i];
    }
  }
  // אם לא נמצא משתמש עם הנתונים שסופקו
  return null;
}
module.exports = router;
