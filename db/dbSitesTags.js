const { pool } = require("./db");
const { getSite, postSites, getSites } = require("./dbSites");



async function getTagsSites(tagID){
    const sql =`
    SELECT sites_tags.id AS  users_sites_id , sites.url, sites.name, sites.status AS status 
    FROM sites_tags
    INNER JOIN sites ON sites_tags.sites_id = sites.id
    WHERE tags_id = ?;
    `
    const [res] = await pool.query(sql, [tagID]);
  return res;
}
async function getTagsSitesById(id){
    const sql =`
    SELECT sites_tags.id AS  users_sites_id , sites.url, sites.name, sites.status AS status 
    FROM sites_tags
    INNER JOIN sites ON sites_tags.sites_id = sites.id
    WHERE sites_tags.id = ?;
    `
    const [[res]] = await pool.query(sql, [id]);
    return res;
}

async function addTagSite(tagID, url, name){
    const sites = await getSites();
    // console.log("fdhgf " +sites);
    let site = sites.find(function (item) {
      return item.url === url;
    });
    if (!site) {
      site = await postSites(url, name);
    }
    // console.log(tagID, site.id);
    const sql = `
    INSERT INTO sites_tags  (tags_id, sites_id, status)  VALUES (?,?,1);
    `
    const  [{insertId}]  = await pool.query(sql, [tagID, site.id]);
    console.log(insertId);
    return getTagsSitesById(insertId)
}

async function deleteTagsSite(id){
    const sql = `
    DELETE FROM sites_tags  WHERE id = ?;
    `
    const [{ affectedRows }] = await pool.query(sql, [id]);
    return affectedRows;
}

module.exports = {getTagsSites, getTagsSitesById, addTagSite, deleteTagsSite}