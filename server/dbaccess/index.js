import mysql from 'mysql';
import buildDataAccess from './dataAccess';
import appsettings from '../data/appsettings.json';
const fs = require('fs');
const bcrypt = require("bcrypt");
const multer = require('multer');

const host = appsettings.db_config.host;
const user = appsettings.db_config.user;
const password = appsettings.db_config.password;
const database = appsettings.db_config.database;

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: host,
  user: user,
  password: password,
  database: database
};

// Configura el middleware para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export async function dbSaveProducts(objectConsult, queryParams) {
  const connection = mysql.createConnection(dbConfig);
  const { nombre, imagen, categoria, descripcion, precio } = queryParams;
  // const contenidoBinario = fs.readFileSync(imagen);
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject({ message: 'Error en el servidor, intenta de nuevo más tarde.', status: 500 });
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');
      
      // Se realiza la consulta
      connection.query(objectConsult, [nombre, imagen, categoria, descripcion, precio], (error, result) => {
        if (error) {
          reject({ message: 'Error en el servidor, intenta de nuevo más tarde.', status: 500 });
        } else {
          // Cerrar conexión
          connection.end((err) => {
            if (err) {
              reject({ message: 'Error en el servidor, intenta de nuevo más tarde.', status: 500 });
            } else {
              console.log('Conexión cerrada exitosamente.');
              resolve({ message: 'Producto guardado exitosamente.', status: 200 });
            }
          });
        }
      });
    });
  });
}

export async function dbGetProducts(objectConsult, categoriaId) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig); // Crea una nueva conexión

    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');

      connection.query(objectConsult, [categoriaId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          connection.end((err) => {
            if (err) {
              reject(err);
            } else {
              console.log('Conexión cerrada exitosamente.');
              resolve(result);
            }
          });
        }
      });
    });
  });
}

export async function dbGetAllProducts(objectConsult) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig); // Crea una nueva conexión

    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');

      connection.query(objectConsult, (error, result) => {
        if (error) {
          reject(error);
        } else {
          connection.end((err) => {
            if (err) {
              reject(err);
            } else {
              console.log('Conexión cerrada exitosamente.');
              resolve(result);
            }
          });
        }
      });
    });
  });
}

export async function dbDeleteProduct(objectConsult, productId) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig); // Crea una nueva conexión

    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');

      connection.query(objectConsult, [productId], (error, result) => {
        if (error) {
          reject({ message: 'Error en el servidor.', status: 500 });
        } else {
          connection.end((err) => {
            if (err) {
              reject({ message: 'Error en el servidor.', status: 500 });
            } else {
              console.log('Conexión cerrada exitosamente.');
              resolve({ message: 'Producto eliminado con éxito.', status: 200 });
            }
          });
        }
      });
    });
  });
}

export async function dbEditProduct(objectConsult, queryParams) {
  const { nombre, categoria, descripcion, precio, productId } = queryParams;

  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig); // Crea una nueva conexión

    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');

      connection.query(objectConsult, [nombre, categoria, descripcion, precio, productId], (error, result) => {
        if (error) {
          reject({ message: 'Error en el servidor.', status: 500 });
        } else {
          connection.end((err) => {
            if (err) {
              reject({ message: 'Error en el servidor.', status: 500 });
            } else {
              console.log('Conexión cerrada exitosamente.');
              resolve({ message: 'Producto actualizado.', status: 200 });
            }
          });
        }
      });
    });
  });
}

export async function dbGetProductId(objectConsult, productId) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig); // Crea una nueva conexión

    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');

      connection.query(objectConsult, [productId], (error, result) => {
        console.log(result);
        if (error) {
          reject({ message: 'Error en el servidor.', status: 500 });
        } else {
          connection.end((err) => {
            if (err) {
              reject({ message: 'Error en el servidor.', status: 500 });
            } else {
              console.log('Conexión cerrada exitosamente.');
              resolve({ message: 'Producto encontrado.', status: 200, data: { 
                id: result[0].id,
                nombre: result[0].nombre,
                imagen: result[0].imagen,
                categoria: result[0].categoria_id,
                descripcion: result[0].descripcion,
                precio: result[0].precio
              } 
             });
            }
          });
        }
      });
    });
  });
}

export async function dbCreateUser(objectConsult, queryParams) {
  const connection = mysql.createConnection(dbConfig);
  const { nombres, apellidos, documento, correo, contrasenia } = queryParams;

  // Encriptar la contraseña antes de almacenarla
  const hashedPassword = await bcrypt.hash(contrasenia, 10);

  return new Promise(async (resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject({ message: 'Error en el servidor.', status: 500 });
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');

      // Verificar si el usuario ya existe por correo o documento
      const checkUserQuery = "SELECT * FROM usuarios WHERE correo = ? OR documento = ?";
      connection.query(checkUserQuery, [correo, documento], (error, results) => {
        if (error) {
          reject({ message: 'Error en el servidor.', status: 500 });
          return;
        }

        if (results && results.length > 0) {
          // El usuario ya existe, no se puede registrar de nuevo
          reject({ message: 'El usuario ya existe.', status: 400 });
        } else {
          connection.query(objectConsult, [nombres, apellidos, documento, correo, hashedPassword], (error, result) => {
            if (error) {
              reject({ message: 'Error en el servidor.', status: 500 });
            } else {
              // Cerrar conexión
              connection.end((err) => {
                if (err) {
                  reject({ message: 'Error en el servidor.', status: 500 });
                } else {
                  console.log('Conexión cerrada exitosamente.');
                  resolve({ message: 'Usuario registrado exitosamente.', status: 200 });
                }
              });
            }
          });
        }
      });
    });
  });
}

export async function dbGetUser(objectConsult, queryParams) {
  const connection = mysql.createConnection(dbConfig);
  const { correo, contrasenia } = queryParams;

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');
      
      // Se realiza la consulta
      connection.query(objectConsult, [correo], (error, result) => {
        if (error) {
          reject(error);
        } else {

          if (result.length > 0) {
            // Compara la contraseña ingresada con la contraseña encriptada de la base de datos
            const storedPassword = result[0].contrasenia;
      
            bcrypt.compare(contrasenia, storedPassword, (compareError, isMatch) => {
              if (compareError) {
                connection.end((err) => {
                  if (err) {
                    reject(err);
                  } else {
                    console.log('Conexión cerrada exitosamente.');
                    resolve({ message: 'Error en el servidor.', status: 500 })
                  }
                });
              }
      
              if (isMatch) {
                // Usuario autenticado
                connection.end((err) => {
                  if (err) {
                    reject(err);
                  } else {
                    console.log('Conexión cerrada exitosamente.');
                    resolve({ message: 'Inicio de sesión exitoso.', status: 200, data: 
                      { 
                        nombres: result[0].nombres,
                        apellidos: result[0].apellidos,
                        correo: result[0].correo,
                        documento: result[0].documento
                      } 
                    });
                  }
                });
              } else {
                // Credenciales incorrectas
                connection.end((err) => {
                  if (err) {
                    reject(err);
                  } else {
                    console.log('Conexión cerrada exitosamente.');
                    reject({message: 'Credenciales incorrectas.', status: 401 });
                  }
                });
              }
            });
          } else {
            // El usuario no fue encontrado en la base de datos
            connection.end((err) => {
              if (err) {
                reject(err);
              } else {
                console.log('Conexión cerrada exitosamente.');
                reject({message: 'Credenciales incorrectas.', status: 401 });
              }
            });
          }
        }
      });
    });
  });
}

const dataAccess = buildDataAccess(
  { dbSaveProducts, dbGetProducts, dbGetAllProducts, dbCreateUser, dbGetUser, dbDeleteProduct, dbGetProductId, dbEditProduct }
);
export default dataAccess;
