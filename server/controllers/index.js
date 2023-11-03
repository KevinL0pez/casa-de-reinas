import dataAccess from '../dbaccess/index';

import buildPostControllerSaveProduct from './products/postControllerSaveProduct';
import buildGetControllerGetProducts from './products/getControllerGetProducts';
import buildGetControllerProducts from './products/getControllerProducts';
import buildPostControllerCreateUser from './users/postControllerCreateUser';
import buildPostControllerGetUser from './users/postControllerGetUser';
import buildDeleteControllerProduct from './products/deleteControllerProduct';

const buildControllerSaveProduct = buildPostControllerSaveProduct({dataAccess});
const buildControllerGetProducts = buildGetControllerGetProducts({dataAccess});
const buildControllerProducts = buildGetControllerProducts({dataAccess});
const buildControllerCreateUser = buildPostControllerCreateUser({dataAccess});
const buildControllerGetUser = buildPostControllerGetUser({dataAccess});
const buildControllerDeleteProduct = buildDeleteControllerProduct({dataAccess});

const objectService = Object.freeze({
    buildControllerSaveProduct,
    buildControllerGetProducts,
    buildControllerProducts,
    buildControllerCreateUser,
    buildControllerGetUser,
    buildControllerDeleteProduct
});

export default objectService;
export {
    buildControllerSaveProduct,
    buildControllerGetProducts,
    buildControllerProducts,
    buildControllerCreateUser,
    buildControllerGetUser,
    buildControllerDeleteProduct
};
