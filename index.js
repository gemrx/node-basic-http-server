// Imports
const { error } = require('console');
const http = require('http');
const fs = require('fs').promises;

// Server
const options = {
    hostname: 'localhost',
    port: 80
};

// Server Routing
function requestListener(request, response) {
    if (request.method === 'GET') {

        let filePath = `${__dirname}${request.url === '/' ? '/index.html' : request.url + '.html'}`;

        fs.readFile(filePath)
            .then((content) => {
                response.statusCode = 202;
                response.setHeader("Content-Type", "text/html");
                response.write(content);
                response.end();
            })
            .catch((error) => {
                console.log(`error: ${error}`);
                response.statusCode = 404;
                response.setHeader("Content-Type", "text/html");
                response.write('<h1>404 Not Found</h1>');
                response.end();
            })
    }
    
}

const server = http.createServer(requestListener);

server.listen(options.port, options.hostname, () => {
    console.log(`server is running on http://${options.hostname}:${options.port}`);
});

server.on('connection', (connection) => {
    console.log('someone just connected!');
});

