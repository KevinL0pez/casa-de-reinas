export default function buildDeleteControllerProduct({ dataAccess }){
    return async function deleteControllerProducts(sourceRequest){
        const response = await dataAccess.deleteProduct(sourceRequest);
        return response;
    }
}
