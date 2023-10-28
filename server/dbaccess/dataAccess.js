export default function buildDataAccess(
    { dbSaveProducts, dbGetProducts, dbGetAllProducts }
) {
    
    return Object.freeze({
        saveProducts,
        getProducts,
        getAllProducts
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

}
