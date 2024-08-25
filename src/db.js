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
const insertTask = (newTask, callback) => {
    const insertQuery = 'INSERT INTO tasks SET ?';
    db.query(insertQuery, newTask, callback);
};

const fetchTasks = (callback) => {
    const selectQuery = 'SELECT * FROM tasks';
    db.query(selectQuery, callback);
};

module.exports = {
    insertTask,
    fetchTasks,
};
  