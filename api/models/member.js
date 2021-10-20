const connection = require("../config/db-config");

const db = connection.promise();

const findAny = async (name) => {
  let query = "SELECT * FROM member";
  let userName = null;
  if (name) {
    query += " WHERE name = ?";
    userName = name;
  }
  try {
    const members = await db.query(query, [userName]);
    return members[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

const create = async (name) => {
  try {
    const response = await db.query("INSERT INTO member (name) VALUES (?)", [
      name,
    ]);
    return response[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

const destroy = async (id) => {
  try {
    const response = await db.query("DELETE FROM member WHERE id = ?", [id]);
    return response[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = { findAny, create, destroy };
