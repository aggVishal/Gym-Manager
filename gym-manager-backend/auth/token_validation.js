const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization"); // token  will be there on header
        // let token = req.cookies['jwt'];

        if (token) {
            token = token.slice(7); // removing the bearer word from the token
            verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        result: "Token is invalid or got expired."
                    });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                result: "User needs to login."
            });
        }
    }
}