const  sql = require(  "mysql2/promise");
const env = require('dotenv').config();
const pool = sql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.dbPassword,
  database: "filrer1",


});

async function checkDBConnection() {
    // console.log(env);
    try {
      await pool.query("SELECT 1");
      console.log("db connected");
      return true;
    } catch (error) {
      const message = error.message + "\n" + "can't connect to db";
      console.log(message);
      return false;
    }
  }
   async function getUsers() {
    const sql = `
          SELECT id, name, email
          FROM users;
      `;
    const [res] = await pool.query(sql);
    return res;
  }
  async function getUsersAll() {
    const sql = `
          SELECT *
          FROM users;
      `;
    const [res] = await pool.query(sql);
    return res;
  }
  
   async function getUser(id) {
    const sql = `
          SELECT *
          FROM users
          WHERE id = ?;
      `;
    const [[res]] = await pool.query(sql, [id]);
    return res;
  }
  
 async function createUser(name, email, password) {
    // console.log("sfrfg");
    const sql = `
          INSERT INTO users (name, email, password)
          VALUES (?,?,?)
      `;
    const [{ insertId }] = await pool.query(sql, [
      name,
      email,
      password,
    ]);
    console.log(insertId);
    // console.log(insertId);
    return getUser(insertId);
  }
  
   async function deleteUser(id) {
    const sql = `
          DELETE FROM users
          WHERE id = ?
      `;
    const [{ affectedRows }] = await pool.query(sql, [id]);
    return affectedRows;
  }
  
   async function updateUser(id, name, userName, email, passwords) {
    const sql = `
          UPDATE users
          SET name = ?, userName = ?, email = ?, passwords = ?
          WHERE id = ?
      `;
    const [{ affectedRows }] = await pool.query(sql, [
      name,
      userName,
      email,
      passwords,
      id,
    ]);
    if (affectedRows) return getUser(id);
  }
  

  module.exports = {pool, checkDBConnection, getUser, getUsers, createUser, deleteUser, updateUser, getUsersAll}