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
    SELECT c.id AS customer_id, c.name AS customer_name, c.email AS customer_email, c.age AS customer_age,
           r.id AS request_id, r.request_details, r.request_date
    FROM customers c
    LEFT JOIN requests r ON c.id = r.customer_id
    ORDER BY c.id, r.request_date;
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      return;
    }
  
    console.log('Customers and their requests:');
    results.forEach((row) => {
      console.log({
        customer_id: row.customer_id,
        customer_name: row.customer_name,
        customer_email: row.customer_email,
        customer_age: row.customer_age,
        request_id: row.request_id,
        request_details: row.request_details,
        request_date: row.request_date
      });
    });
  });
  