
const headerJsonMiddleware = (req, res, next) => {
    res.appendHeader('content-type', 'application/json');
    next();
}

export default headerJsonMiddleware;