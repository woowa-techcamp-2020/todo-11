import app from '..';
import http from 'http';

const server = http.createServer(app);
server.listen(3000, () => {
    console.log("server start!!");
});