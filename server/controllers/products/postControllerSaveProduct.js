export default function buildPostControllerSaveProduct({ dataAccess }){
    return async function postControllerSaveProduct(sourceRequest){
        const response = await dataAccess.saveProducts(sourceRequest);
        return response;
    }
}
