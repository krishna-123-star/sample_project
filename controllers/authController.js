// Import required modules
const db = require('../config/db');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../logger/logger.js');

// User and Role models 
const User = db.User;
const Role = db.Role;

// Export the insertUser and login functions
module.exports = {
    insertUser,
    login
}

// Create New User
async function insertUser(req, res){
    try{
        const {email,password,roleName}=req.body;
        const role = await Role.findOne({where: {name: roleName}});
        if(!role){
            logger.error('Role not found');
            return res.status(404).send({message: 'Role not found'});
        }
        const user = User.create({ 
            email: email,
            password: bcrypt.hashSync(password, 8),
            roleId: role.id
        });
        logger.info('User created successfully');
        res.json("User created successfully");
    }catch(error){
        logger.error('Error :', error);
        res.status(500).send({ message: error.message });
    }

}

//login
async function login(req, res){
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where:{email:email}});
        if(!user){
            return res.status(404).send({message: 'User not found'});
        }
        var validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(401).send({accessToken: null, message: 'Invalid password!'});
        }
        const token = jwt.sign({ id: user.id },
            config.secretKey,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });
        const roles = await Role.findByPk(user.roleId); 
        logger.info('User sign in success');
        res.status(200).send({
            id: user.id,
            email: user.email,
            role: roles.name,
            accessToken: token
        });
    } catch (error) { 
        logger.error('Error', error,message)
        res.status(500).send({ message: error.message });
    }
}
