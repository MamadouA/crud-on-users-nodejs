import http from 'http';
import UserController from './controllers/user-controller.js';
import headerJsonMiddleware from './middlewares/header-middleware.js';
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    headerJsonMiddleware(req, res, () => {
        // GET request handler
        switch(req.method) {
            case 'GET':
                if(req.url === '/api/users') { // list all the users
                    res.end(JSON.stringify(UserController.all()));
                } 
                else if(/^\/api\/users\/[0-9]+$/.test(req.url)){ // find one user
                    const id = req.url.split('/').pop();
                    const user = UserController.find(id);
    
                    if(!user) {
                        res.statusCode = 404;
                        res.end("USER NOT FOUND");
                    }
                    else {
                        res.end(JSON.stringify(user));
                    }
                }
                else {
                    res.statusCode = 404;
                    res.end("404 NOT FOUND");
                }
                break;
            case 'POST':
                req.on('data', (chunk) => {
                    UserController.store(JSON.parse(chunk.toString()));
                    console.log(UserController.all());
                    res.end(chunk.toString());
                });
                break;
            case 'DELETE':
                const id = req.url.split('/').pop();
                const user = UserController.find(id);
                if(!user) {
                    res.statusCode = 404;
                    res.end("USER NOT FOUND");
                }
                else {
                    res.end(JSON.stringify(UserController.delete(id)));
                }
                break;
            default:
                res.statusCode = 401;
                res.end("Unauthorized method");
        }
    });
});

server.listen(PORT);
