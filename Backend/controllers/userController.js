const User = require("../schemas/user");
const JWT_Token_Provider = require('../security/auth/jwtTokenProvider');


//creating user registrating user cheking model 
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
//login user by cheking user model 
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Incoming login request:", req.body); 
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
    // console.log("Perdoz Admin "+admin)
     res.json({ isAdmin: admin });

  }catch{
     res.status(500).json({ error: err.message });
  }
}

module.exports = {loginUser, createUser,isAdminUser}