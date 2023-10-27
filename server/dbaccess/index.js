import mysql from 'mysql';
import buildDataAccess from './receipts/receipts-db';
import appsettings from '../data/appsettings.json';

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

const connection = mysql.createConnection(dbConfig);

export async function ApiCall(objectConsult) {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');
      
      // Aquí puedes realizar la consulta recibida como parámetro
      connection.query(objectConsult, (error, result) => {
        if (error) {
          reject(error);
        } else {
          // Trabaja con el resultado de la consulta
          console.log('Resultado de la consulta:', result);
          // Cuando hayas terminado de usar la conexión, ciérrala
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

const dataAccess = buildDataAccess({ ApiCall });
export default dataAccess;
