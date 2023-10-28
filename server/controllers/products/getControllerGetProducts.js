export default function buildGetControllerGetProducts({ dataAccess }){
    return async function getControllerGetProducts(sourceRequest){
        const response = await dataAccess.getProducts(sourceRequest);
        return response;
    }
}
