const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'bcva67nukrlbooiqgnfn-mysql.services.clever-cloud.com',
  user: 'uuxqthgomi4hqtl4',
  database: 'bcva67nukrlbooiqgnfn',
  password: 'QvGNFjMRk6BPLY5J8YJB',
  port: 3306
})

module.exports = connection
