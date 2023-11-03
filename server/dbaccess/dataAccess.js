export default function buildDataAccess(
    { dbSaveProducts, dbGetProducts, dbGetAllProducts, dbCreateUser, dbGetUser, dbDeleteProduct, dbGetProductId, dbEditProduct }
) {
    
    return Object.freeze({
        saveProducts,
        getProducts,
        getAllProducts,
        createUser,
        getUser,
        deleteProduct,
        getProductId,
        editProductId
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

    async function deleteProduct(productId) {
        const sql = 'DELETE FROM productos WHERE id = ?';
        let result = await dbDeleteProduct(sql, productId);
        return result;
    }

    async function getProductId(productId) {
        const sql = 'SELECT * FROM productos WHERE id = ?';
        let result = await dbGetProductId(sql, productId);
        return result;
    }

    async function editProductId(bodyParamsDB) {
        const sql = 'UPDATE productos SET nombre = ?, categoria_id = ?, descripcion = ?, precio = ? WHERE id = ?';
        let result = await dbEditProduct(sql, bodyParamsDB);
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
