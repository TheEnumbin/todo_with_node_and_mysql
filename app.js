const http = require('http');
const mysql = require('mysql2');


const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/tasks') {
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString();
      });

      req.on('end', () => {
          const postData = JSON.parse(body);
          const newTask = {
              task_name: postData.task_name,
              task_status: postData.task_status,
              date: new Date()
          };

          const insertQuery = 'INSERT INTO tasks SET ?';
          db.query(insertQuery, newTask, (err, result) => {
              if (err) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Error inserting task' }));
                  return;
              }

              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, taskId: result.insertId }));
          });
      });
  } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
  }
});

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});

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
  