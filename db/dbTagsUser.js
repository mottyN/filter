const { pool, getUser } = require("./db");

// async function getSiteUser(userId) {
//     const sql = `SELECT users_sites.id AS  users_sites_id , users_sites.status AS status_user, sites.url, sites.name, sites.status AS status 
//       FROM users_sites
//       INNER JOIN sites ON users_sites.site_id = sites.id
//       WHERE user_id = ?
  
//       ;`;
//     const [res] = await pool.query(sql, [userId]);
//     return res;
//   }
  async function getAllTass(){
    const sql = `
    SELECT * 
    FROM tags 
    WHERE status = 1
    `
    const [res] = await pool.query(sql);
    return res;
  }

  async function getTagsUser(userId){
    const sql = `
    SELECT users_tags.id AS  users_tags_id, users_tags.status AS status_tags_users,  tags.name, tags.status
    FROM users_tags
    INNER JOIN tags ON users_tags.tag_id = tags.id 
    WHERE users_tags.user_id = ?
    `
    const [res] = await pool.query(sql, [userId]);
    return res;
  }
  async function getTagsUserByTagID(tagId,userId){
    const sql = `
    SELECT users_tags.id AS  users_tags_id, users_tags.status AS status_tags_users,  tags.name, tags.status
    FROM users_tags
    INNER JOIN tags ON users_tags.tag_id = tags.id 
    WHERE users_tags.tag_id = ? AND users_tags.user_id = ?
    `
    const [res] = await pool.query(sql, [tagId,userId]);
    return res;
  }
  async function getTagsUserByID(id){
    const sql = `
    SELECT users_tags.id AS users_tags_id, users_tags.status AS status_tags_users, tags.name, tags.status
    FROM users_tags
    INNER JOIN tags ON users_tags.tag_id = tags.id 
    WHERE users_tags.id = ?
    `;
    const [res] = await pool.query(sql, [id]);
    return res;
  }
  async function addTagsUser(tagID, userId){
    const sql = `
    INSERT INTO users_tags (user_id, tag_id, status)
    VALUES (?,?,1)
    `;
    const  [{insertId}]  = await pool.query(sql, [userId, tagID]);
    // console.log(insertId);

    // console.log(getTagsUserByID(insertId));

    return getTagsUserByID(insertId)
  }

  async function updateTagUser(id , status){
    const sql = `
    UPDATE users_tags
    SET status = ?
    WHERE id = ? 
    `;
    const [{ affectedRows }] = await pool.query(sql, [status, id]);
    if (affectedRows) return getTagsUserByID(id);
  }

  async function deleteTagUser(userId, tagId ){
    const sql = `
    DELETE FROM users_tags
    WHERE user_id = ? AND tag_id =?
    `;
    const [{ affectedRows }] = await pool.query(sql, [userId, tagId]);
    return affectedRows;
  }


  module.exports = {getAllTass, getTagsUser, getTagsUserByID, addTagsUser, updateTagUser, deleteTagUser, getTagsUserByTagID}

