export default function buildGetControllerGetProductId({ dataAccess }){
    return async function getControllerGetProductId(sourceRequest){
        const response = await dataAccess.getProductId(sourceRequest);
        return response;
    }
}
