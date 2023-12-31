import User from "../models/user.model.js";
import config from "../config.js";
import jwt from "jsonwebtoken";
import roleModel from "../models/role.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]; // captura el token proveniente del "header" "x-access-token"
    console.log(token);

    // valida el token
    if (!token) return res.status(403).json({ message: "No token provided" });

    // decodifica y obtiene el usuario proveniente del token
    const decoded = jwt.verify(token, config.SECRET);
    console.log(decoded);
    req.userId = decoded.id; // guarda el "id" de usuario en el "request" para ser usado posteriormente por los "middlewares"

    // busca y VALIDA el usuario
    const user = await User.findById(req.userId, { password: 0 });
    console.log(user);
    if (!user) return res.status(404).json({ message: "No user found" });

    next(); // continua con el siguiente "middleware"

  } catch (error) { return res.status(500).json({message: "Unauthorized"}) };
};

export const isModerator = async (req, res, next) => {
  try {
    const userFound = await User.findById(req.userId);
    const roles = await roleModel.find({_id: {$in: userFound.roles}}); // busca de entre todos los rolos, aquellos cuya id que esten incluidos en "userModel.roles"
    console.log(roles);

    for(let i = 0; i < roles.length; i++) {
      if(roles[i].name === "moderator") { 
        next(); // si encontra un "rol" de "moderador" continua
        return 
      };
    };
    
    // delo contrario termina
    return res.status(403).json({message: "Require Moderator role"});

  } catch (error) {
    res.status(404).json({message: "Bad request"});
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const userFound = await User.findById(req.userId);
    const roles = await roleModel.find({_id: {$in: userFound.roles}}); // busca de entre todos los rolos, aquellos cuya id que esten incluidos en "userModel.roles"
    console.log(roles);
  
    for(let i = 0; i < roles.length; i++) {
      if(roles[i].name === "admin") { 
        next(); // si encontra un "rol" de "moderador" continua
        return 
      };
    };
    
    // delo contrario termina
    return res.status(403).json({message: "Require Admin role"});
  
  } catch (error) {
    res.status(404).json({message: "Bad request"});
  }
};