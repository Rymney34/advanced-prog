const User = require("../schemas/user");
const JWT_Token_Provider = require('../security/auth/jwtTokenProvider');
const sanitize = require('mongo-sanitize');
const bcrypt = require("bcryptjs");

//creating user registrating user cheking model 
const createUser = async(req, res) => {
  try{
   

    const firstName = sanitize(req.body.firstName);
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);
    const isAdmin = false;

    if (!firstName  || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (
      typeof firstName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    )
    {
    return res.status(400).json({ error: "Invalid input type" })
    }
    console.log(password)


    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      email,
      password: hashPass,
      isAdmin,
    });
    console.log(newUser)
  
    await newUser.save();
        
    res.status(201).json({
      
      // _id: newUser._id,
      firstName: newUser.firstName,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    })

  }catch (err) {
    console.error("Error :", err); 
    res.status(400).json({ error: err.message });
  }
    
}
//login user by checking user model 
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });

    // console.log(user);

    // console.log("Incoming login request:", {email}); 

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
  //  const isMatch = password === user.password;
    const isMatch = await bcrypt.compare(password, user.password);

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
        firstName: user.firstName,
        email: user.email,
        isAdmin: user.isAdmin
        
      }
    
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const isAdminUser = async (req, res) => {

  try{
      const admin = req.user.isAdmin
      res.json({ isAdmin: admin });

  }catch{
      res.status(500).json({ error: err.message });
  }
}

module.exports = {loginUser, createUser,isAdminUser}