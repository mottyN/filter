const express = require("express");
const fs = require("fs");
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
      const user = findUser(name,  users);
      const { url } = req.body;
      console.log(user+"gdgdfg");
      if (user) {
        const sites = await getSites();
        let site = false;
        for (var i = 0; i < sites.length; i++) {
          if (sites[i]?.url.includes(url)) {
            // console.log("Found:", sites[i]);
            site = sites[i] ;
            break;
          }
        }
        // console.log(url +"dewsrdgfrtgd");
        // fs.appendFile("logs.txt", sites[i]+" :"+ url);
    
        // console.log(site);
        if (!site) {
         
          res.status(200).end("true");
          //   console.log('fvdsf');
          return;
        }
        fs.appendFile(
          "logs.txt",
          `${sites[i]?.url}: ${url} : ${sites[i]?.url.includes(url)} ${
            site?.status == 1
          }\n`,
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
        // console.log("ffffffffffffffffffffffffffffffffff");

        // console.log(site);
        if (site.status === 0) {
          res.status(200).end("false");
          return;
        }

        const sitesUser = await getSiteUser(user.id);
        let siteUser;
        for (var i = 0; i < sitesUser.length; i++) {
          if (sitesUser[i].url.includes(url)) {
            console.log("Found:", sitesUser[i]);
            siteUser = sitesUser[i];
            break;
          }
        }

        // const siteUser = sitesUser.find((obj) => {
        //   return obj.url === `https://${url}`;
        // });
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
      }
       else {
        res.status(404).send("not fuond");
      }
    } else {
      res.status(400).send("user must have a name and an passwords");
    }
  } catch (error) {
    res.status(500).send("server failed to connect with DB" + error);
  }
});

function findUser(name, users) {
  // עבור כל משתמש במערך
  // console.log(password);
  for (let i = 0; i < users.length; i++) {
    // בדיקה אם השם משתמש והסיסמה תואמים
    // console.log(users[i]);
    if (users[i].name == name  ) {
      // אם תואמים, החזרת המשתמש
      return users[i];
    }
  }
  // אם לא נמצא משתמש עם הנתונים שסופקו
  return null;
}
module.exports = router;
