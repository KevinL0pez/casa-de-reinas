export default function buildPutControllerEditProduct({ dataAccess }){
    return async function putControllerEditProduct(sourceRequest){
        const response = await dataAccess.editProductId(sourceRequest);
        return response;
    }
}
