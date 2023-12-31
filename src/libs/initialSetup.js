import Role from '../models/role.model.js';

export const ROLES = ["user", "admin", "operator"];

export const createRoles = async () => {

  try {

    const count = await Role.estimatedDocumentCount();
  
    if(count > 0) return; // si ya existen "roles" en la base de datos
  
    const values = await Promise.all([
      new Role({name: "user"}).save(),
      new Role({name: "moderator"}).save(),
      new Role({name: "admin"}).save()
    ]);
  
    console.log(values);
    
  } catch (error) { console.log(error); }
};