export default function buildPostControllerGetUser({ dataAccess }){
    return async function postControllerGetUser(sourceRequest){
        const response = await dataAccess.getUser(sourceRequest);
        return response;
    }
}
