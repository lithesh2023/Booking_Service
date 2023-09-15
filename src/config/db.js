const  {Pool} = require('pg')
require("dotenv").config();

const pool = new Pool({
  user: 'postgres',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
  host: 'localhost'
})
module.exports ={pool}