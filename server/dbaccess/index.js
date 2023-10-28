import mysql from 'mysql';
import buildDataAccess from './dataAccess';
import appsettings from '../data/appsettings.json';
const fs = require('fs');

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

export async function dbSaveProducts(objectConsult, queryParams) {
  const connection = mysql.createConnection(dbConfig);
  const { nombre, rutaArchivo, categoria, descripcion, precio } = queryParams;
  const contenidoBinario = fs.readFileSync(rutaArchivo);
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');
      
      // Se realiza la consulta
      connection.query(objectConsult, [nombre, contenidoBinario, categoria, descripcion, precio], (error, result) => {
        if (error) {
          reject(error);
        } else {
          // Cerrar conexión
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

const dataAccess = buildDataAccess({ dbSaveProducts, dbGetProducts });
export default dataAccess;
