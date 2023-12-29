import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export const signup = async (req, res) => {

  const {username, email, password, roles} = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  });

  // establece los "roles", o asigna uno por defecto
  if(roles) {
    const foundRoles = await Role.find({name: {$in: roles}})
    newUser.roles = foundRoles.map(role => role._id);
  } else {
    const role = await Role.findOne({name: "user"});
    newUser.roles = [role._id];
  };
  
  const savedUser = await newUser.save();
  console.log(savedUser);
  
  // genera un "JWT token"
  const token = jwt.sign({id: savedUser._id}, config.SECRET, {
    expiresIn: 84400 // 24 horas
  });
  
  res.status(200).json(token);

};

export const signin = async (req, res) => {

  const userFound = await User.findOne({email: req.body.email}).populate("roles");
  if(!userFound) return res.status(400).json({mesage: "User not found"});
  console.log(userFound);

  const matchPassword = await User.comparePassword(req.body.password, userFound.password);
  if(!matchPassword) return res.status(400).json({token: null, message: "Invalid password"})

  const token = jwt.sign({id: userFound._id}, config.SECRET, {expiresIn: 86400});

  res.json({token});
};