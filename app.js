const mysql = require('mysql2');
// Set up the MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'enumbin',
    password: '1234',
    database: 'learning'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

// Connect to the database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database.');
  });
  
  // Query to fetch customer data
  const query = `
    SELECT * FROM tasks;
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      return;
    }
  
    results.forEach((row) => {
      console.log({
        task_id: row.task_id,
        task_name: row.task_name,
        status: row.status,
      });
    });
  });
  