const sql = require("mysql2/promise");
const { pool } = require("./db");

// async function getUsers() {
//   const sql = `
//           SELECT *
//           FROM users;
//       `;
//   const [res] = await pool.query(sql);
//   return res;
// }

async function getSites() {
  const sql = `SELECT *
    FROM sites;`;
  const [res] = await pool.query(sql);
  return res;
}
async function getSite(id) {
  const sql = `SELECT *
      FROM sites  WHERE id = ?;`;
  const [[res]] = await pool.query(sql, [id]);
  return res;
}
async function postSites(url,name) {
  const sql = `
    INSERT INTO sites (url, status, name)
    VALUES (?,1,?)
`;
  const [{ insertId }] = await pool.query(sql, [url,name]);
  return getSite(insertId);
}

async function updateSites(id, status) {
  const sql = `
    UPDATE sites
    SET status =?
    WHERE id = ?
`;
  const [{ affectedRows }] = await pool.query(sql, [status, id]);
  if (affectedRows) return getSite(id);
}

module.exports = { getSites, getSite, postSites, updateSites};
