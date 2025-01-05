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
    const selectQuery = 'SELECT * FROM tasks ORDER BY position ASC';
    db.query(selectQuery, callback);
};

const updateTask = (taskId, updatedTask, callback) => {
    const updateQuery = 'UPDATE tasks SET ? WHERE task_id = ?';    
    db.query(updateQuery, [updatedTask, taskId], callback);
};

const deleteTask = (taskId, callback) => {
    const deleteQuery = 'DELETE FROM tasks WHERE task_id = ?';
    db.query(deleteQuery, [taskId], callback);
};

const updateTaskPositions = (tasks, callback) => {
    const query = `
        UPDATE tasks
        SET position = CASE task_id
        ${tasks.map(task => `WHEN ${task.task_id} THEN ${task.position}`).join('\n')}
        END
        WHERE task_id IN (${tasks.map(task => task.task_id).join(',')})
    `;
    db.query(query, callback);
};

module.exports = {
    insertTask,
    fetchTasks,
    updateTask,
    updateTaskPositions,
    deleteTask,  // Export the deleteTask function
};