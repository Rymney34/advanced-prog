const User = require("../schemas/user");
const JWT_Token_Provider = require('../security/auth/jwtTokenProvider');

const createUser = async(req, res) => {
  try{
    const { firstName, secondName, address, phoneNumber, email, password  } = req.body;

    if (!firstName || !secondName || !address || !phoneNumber || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = new User({
      firstName,
      secondName,
      address,
      phoneNumber,
      email,
      password,

    });
  
    await newUser.save();
        
   

    res.status(201).json({
      
      _id: newUser._id,
      firstName: newUser.firstName,
      secondName: newUser.secondName,
      address: newUser.address,
      phoneNumber: newUser.phoneNumber,
      email: newUser.email,
      password: newUser.password,
    })

   
  }catch (err) {
     console.error("Error :", err); 
    res.status(400).json({ error: err.message });
  }
    
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Incoming login request:", req.body); 
    // Find user by email
    const user = await User.findOne({ email });
    console.log(user);
    console.log("Incoming login request:", {email}); 

    const accessToken = JWT_Token_Provider.generateAccessToken(user);
    const refreshToken = JWT_Token_Provider.generateRefreshToken(user);
    
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'Strict',
    });



    if (!user) {
      console.log('Wrong')
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password stored in the database
   const isMatch = password === user.password;

    if (!isMatch) {
      console.log('Wrong')
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // If credentials are correct, return success message
    console.log(accessToken)
    res.json({ message: 'Login successful' ,
      accessToken,
      user: {
        _id: user._id,                  
        name: user.name,
        surname: user.surname,
        email: user.email,
        
      }
    
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const refreshAccessToken = async (req, res) => {
    // 1. Get the refresh token from the request body (client should send it here)
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token is missing.' });
    }

    // 2. Verify the token
    const userPayload = JWT_Token_Provider.verifyRefreshToken(refreshToken);

    if (!userPayload) {
        // Verification failed (expired or invalid signature)
        return res.status(403).json({ error: 'Invalid or expired refresh token.' });
    }

    // 3. Optional Security Check (to ensure user still exists)
    // You could uncomment this to briefly hit the DB, but we keep it commented for the simplest way:
    /*
    const user = await User.findById(userPayload.sub);
    if (!user) {
         return res.status(404).json({ error: 'User associated with token not found.' });
    }
    */
    
    // 4. Issue a new Access Token based on the verified payload data
    // We recreate a minimal user object based on the verified token payload
    const minimalUser = { _id: userPayload.sub, firstName: userPayload.firstName || 'User' };
    const newAccessToken = JWT_Token_Provider.generateAccessToken(minimalUser);

    // 5. Success! Return the new access token to the client
    res.json({ accessToken: newAccessToken });
};

module.exports = {loginUser, createUser}