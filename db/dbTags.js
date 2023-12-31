const { pool } = require("./db");

async function getAllTassAdmin(){
  const sql = `
  SELECT * 
  FROM tags 
  `
  const [res] = await pool.query(sql);
  return res;
}
async function getTags(id){
    const sql = `
    SELECT * 
    FROM tags 
    WHERE tags.id = ?
    `
    const [res] = await pool.query(sql,[id]);
    return res;
  }

  async function addTag(  tagName, status) {
   
    const sql = `
      INSERT INTO tags  (name, status)  VALUES (?,?);
      `;
    const [{ insertId }] = await pool.query(sql, [tagName, status]);
    console.log(insertId);
    return getTags(insertId);
  }
  async function apdatTagAdmin(  id,status) {
   
    const sql = `
    UPDATE tags  
      SET status = ?
    WHERE id = ? 
    `;
    const [{ affectedRows }] = await pool.query(sql, [  status,id]);
    if (affectedRows) return getTags(id);
  }

  async function deleteTags(id){
    const sql = `
    DELETE FROM tags
            WHERE id = ?
    `;
    const [{ affectedRows }] = await pool.query(sql, [id]);
      return affectedRows;
  }
   module.exports={getTags, addTag, apdatTagAdmin, deleteTags, getAllTassAdmin}