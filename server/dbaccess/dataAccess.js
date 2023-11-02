export default function buildDataAccess(
    { dbSaveProducts, dbGetProducts, dbGetAllProducts, dbCreateUser, dbGetUser }
) {
    
    return Object.freeze({
        saveProducts,
        getProducts,
        getAllProducts,
        createUser,
        getUser
    });

    async function saveProducts(bodyParamsDB) {
        const sql = 'INSERT INTO productos (nombre, imagen, categoria_id, descripcion, precio) VALUES (?, ?, ?, ?, ?)';
        let result = await dbSaveProducts(sql, bodyParamsDB);
        return result;
    }

    async function getProducts(categoriaId) {
        const sql = 'SELECT * FROM productos p WHERE p.categoria_id = ?';
        let result = await dbGetProducts(sql, categoriaId);
        return result;
    }

    async function getAllProducts() {
        const sql = 'SELECT * FROM productos';
        let result = await dbGetAllProducts(sql);
        return result;
    }

    async function createUser(bodyParamsDB) {
        const sql = 'INSERT INTO usuarios (nombres, apellidos, documento, correo, contrasenia) VALUES (?, ?, ?, ?, ?)';
        let result = await dbCreateUser(sql, bodyParamsDB);
        return result;
    }

    async function getUser(bodyParamsDB) {
        const sql = 'SELECT * FROM usuarios WHERE correo = ?';
        let result = await dbGetUser(sql, bodyParamsDB);
        return result;
    }

}
