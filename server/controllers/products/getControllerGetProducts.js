export default function buildGetControllerProducts({ dataAccess }){
    return async function getControllerGetProducts(sourceRequest){
        const response = await dataAccess.getProducts(sourceRequest);
        return response;
    }
}
