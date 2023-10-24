const db = require('../config/db');

// Import User and Role models
const User = db.User;
const Role = db.Role;

// Export the function for getting user details
module.exports ={
    getUserDetails
}

//Get user details, excluding password
async function getUserDetails(req, res) {
  User.findByPk(req.userId, {
    attributes: { exclude: ['password'] } 
  }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    Role.findByPk(user.roleId).then(roles => {
      res.status(200).send({
          id: user.id,
          email: user.email,
          role: roles.name,
      });
    });  
  }).catch(error => {
    res.status(500).send({message: error.message});
  });
  }