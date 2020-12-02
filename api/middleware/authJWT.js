const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {

  const { token } = req.cookies;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    
    // console.log(decoded);

    res.locals.username = decoded.username;

    next();
    
  });

}

module.exports = verifyToken;