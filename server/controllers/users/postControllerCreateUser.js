export default function buildPostControllerCreateUser({ dataAccess }){
    return async function postControllerCreateUser(sourceRequest){
        const response = await dataAccess.createUser(sourceRequest);
        return response;
    }
}
