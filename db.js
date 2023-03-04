const Pool = require('pg').Pool;

const pool = new Pool({
   user:"postgres",
   host:"localhost",
   port:5432,
   database:'students',
   password:'Natraj@123'
});

module.exports = pool;

