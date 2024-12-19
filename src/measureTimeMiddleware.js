const logRequest = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route handler
};

const measureTime = (req, res, next) => {
    if (req.method === 'GET' && req.url === '/api/tasks') {
        console.log('Fetching tasks started...');
        const start = Date.now();

        // Wrap the response's `end` method to log duration
        const originalEnd = res.end;
        res.end = (...args) => {
            const duration = Date.now() - start;
            console.log(`Time taken to fetch tasks: ${duration} ms`);
            originalEnd.apply(res, args); // Call the original `res.end`
        };
    }
    next();
}
module.exports = {measureTime, logRequest};
