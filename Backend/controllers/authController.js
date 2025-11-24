const JWT_Token_Provider = require('../security/auth/jwtTokenProvider');

const validate = async (req,res) =>{

    try {
        JWT_Token_Provider.authenticateToken(req, res, () => {
      // This runs only if authenticateToken succeeds
      res.status(200).json({ valid: true, user: req.user });
    });
    
    }
    catch(err){
        console.error("Error :", err); 
        res.status(400).json({ error: err.message });
    }      
};

const refreshFunc = async (req,res) =>{

    try {
        console.log("cookies:", req.cookies); 
        const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    const user = JWT_Token_Provider.verifyRefreshToken(token);
    if (!user)  return res.sendStatus(403);

    const newAccessToken = JWT_Token_Provider.generateAccessToken(user);
    res.json({ accessToken: newAccessToken });

    }
    catch(err){
        console.error("Error :", err); 
        res.status(400).json({ error: err.message });
    }      
};

module.exports = {validate, refreshFunc}