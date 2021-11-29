const mysql = require('mysql')
const con = mysql.createConnection({
    'user': 'root',
    'database': 'fabrica',
    'host': 'localhost'
})

module.exports = {
    con
}