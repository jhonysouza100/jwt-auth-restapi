import { ROLES } from "../libs/initialSetup.js"
import userModel from "../models/user.model.js";

export const checkRolesExists = (req, res, next) => {
  if(req.body.roles) {
    for(let i = 0; i < req.body.roles.length; i++) {
      if(!ROLES.includes(req.body.roles[i])) { // si no se encuentra el "rol" pasado por request
        return res.status(400).json({message: `Role ${req.body.roles[i]} does not existes`});
      }
    }
  }
  next();
};

export const checkDuplicateRecord = async (req, res, next) => {
  try {
    const userFound = await userModel.findOne({email: req.body.email}); // busca en la base de datos un email igual al pasado por request
    if(userFound) return res.status(400).json({mesage: "User already exist"}); // si este ya existe
    // de lo contrario, continua ...
    next();
  } catch (error) {
    return res.status(404).json({mesage: "Server error"});
  }
};