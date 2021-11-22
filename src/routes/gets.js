const express = require('express');
const DataBase = require('../database/Database');
const Queries = require('../database/Queries');

const database = new DataBase();
database.setUpConnection();
const router = express.Router();

router.get('/', (req, res) => {
  res.json({status: 'OK', code: 200, message: "todo good"});
});

router.get('/Users', async (req, res) => {
  const conn = await database.getConnection();
  if (!conn) res.json({status: 'Error', code: 200, message: "Error de conexion de la base de datos"});
  const queries = new Queries({connection: conn});
  const users = await queries.getAllUsers();
  database.CloseConnection();
  res.json({status: 'OK', code: 200, message: "todo good", body: users});
});

module.exports = router;