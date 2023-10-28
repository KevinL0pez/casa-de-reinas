export default function buildGetControllerProducts({ dataAccess }){
    return async function getControllerProducts(sourceRequest){
        const response = await dataAccess.getAllProducts(sourceRequest);
        return response;
    }
}
