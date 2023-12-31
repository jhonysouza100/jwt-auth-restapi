# jwt-auth-apirest

 REST API en Nodejs y MongoDB con JSON Web Tokens (JWT) para autenticar usuarios, compartir información con el cliente y establecer roles para la autorizacion de rutas en el servidor de una aplicación web.

## Get "user"

`http://HOST:PORT/users`

* Method: `GET` 

## Create "user"

`http://HOST:PORT/users`

* Method: `POST` 

* headers
  ```
  {
    "Content-Type": "application/json",
    "x-access-token": "yourJWTtoken"
  }
  ```

* body
  ```
  {
  "username": "ausername",
  "email": "auser@example.com",
  "password": "1234",
  "roles": ["user"]
  }
  ```


  * "roles": [`"admin"`, `"moderator"`, `"user"`]

***Nota***: Únicamente el `admin` puede CREAR otros usuarios.

## Signup

***Nota***: El usuario `admin` obtine acceso de control total sobre los datos. 

Puedes dar de alta un `admin` sin un token, por primera vez durante el desarrolo, antes debes de comentar el `if()` dentro de la funcion `signin()` que impide crear un "admin" (descomentar esto en producción!), luego, usando la ruta de registro ↓↓↓ crea un usuario administrador "admin".

`http://HOST:PORT/api/auth/signup`

* Method: `POST` 

* headers
  ```
  {
    "Content-Type": "application/json"
  }
  ```

* body
  ```
  {
  "username": "ausername",
  "email": "auser@example.com",
  "password": "1234",
  "roles": ["admin"]
  }
  ```

## Signin

Obtines un `token` de accesso para crear y editar según el rol de usuario.

`http://HOST:PORT/api/auth/signin`

* Method: `POST` 

* headers
  ```
  {
    "Content-Type": "application/json"
  }
  ```

* body
  ```
  {
  "email": "auser@example.com",
  "password": "1234",
  }
  ```

* Response:
  
  `GET`: "tokenaccesskey1234example4321"
