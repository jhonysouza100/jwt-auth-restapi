export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"]; // captura el token proveniente del "header" "x-access-token"
  console.log(token);

  // valida el token
  if(!token) return res.status(403).json({message: "No token provided"});

  next(); // continua con la siguiente ruta
};