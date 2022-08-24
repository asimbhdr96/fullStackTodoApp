const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()
console.log(process.env.PASSWORD)
const todoDB = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : process.env.PASSWORD,
  database : 'DB'
})

todoDB.connect((err) =>{
  console.log(err)
})


module.exports = todoDB;
