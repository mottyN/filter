const { pool, getUser } = require("./db");
const { getSites, postSites } = require("./dbSites");

async function getSiteUser(userId) {
  const sql = `SELECT users_sites.id AS  users_sites_id , users_sites.status AS status_user, sites.url, sites.name, sites.status AS status 
    FROM users_sites
    INNER JOIN sites ON users_sites.site_id = sites.id
    WHERE user_id = ?

    ;`;
  const [res] = await pool.query(sql, [userId]);
  return res;
}

async function getSiteUserBYid(id) {
  const sql = `SELECT users_sites.id AS  users_sites_id , users_sites.status AS status_user, sites.url, sites.name, sites.status AS status 
  FROM users_sites
  INNER JOIN sites ON users_sites.site_id = sites.id
    WHERE users_sites.id = ?;`;
  const [[res]] = await pool.query(sql, [id]);
  return res;
}

async function addSiteUser(userId, url, name) {
  const sites = await getSites();
  var site = sites.find(function (item) {
    return item.url === url;
  });
  if (!site) {
    site = await postSites(url, name);
  }
  const sql = ` INSERT INTO users_sites (user_id, site_id, status)
    VALUES (?,?,1)`;
  const  [{insertId}]  = await pool.query(sql, [userId, site.id]);
  console.log(insertId);
  return getSiteUserBYid(insertId);
}
async function updateSiteUser(id, status) {
  console.log(status);
  const sql = `UPDATE users_sites
    SET status = ?
    WHERE id = ?
  `;
  const [{ affectedRows }] = await pool.query(sql, [status, id]);
  if (affectedRows) return getSiteUserBYid(id);

}
async function deleteSiteUser(id){
  const sql = `
  DELETE FROM users_sites
          WHERE id = ?
  `;
  const [{ affectedRows }] = await pool.query(sql, [id]);
    return affectedRows;
}

module.exports = { getSiteUser, getSiteUserBYid, addSiteUser, updateSiteUser , deleteSiteUser};
