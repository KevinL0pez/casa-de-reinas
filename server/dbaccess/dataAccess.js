export default function buildDataAccess({ dbSaveProducts }) {
    
    return Object.freeze({
        saveProducts
    });

    async function saveProducts(bodyParamsDB) {
        const consulta = 'INSERT INTO productos (nombre, imagen, categoria_id, descripcion, precio) VALUES (?, ?, ?, ?, ?)';
        let result = await dbSaveProducts(consulta, bodyParamsDB);
        return result;
    }

}
