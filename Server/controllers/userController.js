const User = require("../schemas/user");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log("Incoming login request:", req.body); //
    // Find user by email
    const user = await User.findOne({ email });
    console.log(user);
    console.log("Incoming login request:", {email}); //
    

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
    res.json({ message: 'Login successful' ,
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

module.exports = {loginUser}