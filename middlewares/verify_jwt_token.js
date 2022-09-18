const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)
    {
        return res.status(200).json({'status': '401', 'message': 'token required'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err,resp) => {
        console.log(err)

        if (err)
        {
            return res.status(200).json({'status': '403', 'message': 'invalid token'});
        }
        else
        {
            req.user = resp;
            next();
        }
    })
}

module.exports=authenticateToken;