const http = require('http');
const { insertTask, fetchTasks } = require('./src/db');  // Import the fetchTasks function

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

            insertTask(newTask, (err, result) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Error inserting task' }));
                    return;
                }

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, taskId: result.insertId }));
            });
        });
    } else if (req.method === 'GET' && req.url === '/api/tasks') {
        // Fetch all tasks and send them as a JSON response
        fetchTasks((err, results) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error fetching tasks' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    } else if (req.method === 'PUT' && req.url.startsWith('/api/tasks/')) {
        const taskId = req.url.split('/')[3];

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const updatedTask = JSON.parse(body);

            updateTask(taskId, updatedTask, (err, result) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Error updating task' }));
                    return;
                }

                if (result.affectedRows === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Task not found' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            });
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/api/tasks/')) {
        // Extract the task ID from the URL
        const taskId = req.url.split('/')[3];

        deleteTask(taskId, (err, result) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error deleting task' }));
                return;
            }

            if (result.affectedRows === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Task not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
});