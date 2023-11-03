import dataAccess from '../dbaccess/index';

import buildPostControllerSaveProduct from './products/postControllerSaveProduct';
import buildGetControllerGetProducts from './products/getControllerGetProducts';
import buildGetControllerProducts from './products/getControllerProducts';
import buildPostControllerCreateUser from './users/postControllerCreateUser';
import buildPostControllerGetUser from './users/postControllerGetUser';
import buildDeleteControllerProduct from './products/deleteControllerProduct';
import buildGetControllerGetProductId from './products/getControllerGetProductId';
import buildPutControllerEditProduct from './products/putControllerEditProduct';

const buildControllerSaveProduct = buildPostControllerSaveProduct({dataAccess});
const buildControllerGetProducts = buildGetControllerGetProducts({dataAccess});
const buildControllerProducts = buildGetControllerProducts({dataAccess});
const buildControllerCreateUser = buildPostControllerCreateUser({dataAccess});
const buildControllerGetUser = buildPostControllerGetUser({dataAccess});
const buildControllerDeleteProduct = buildDeleteControllerProduct({dataAccess});
const builControllerGetProductId = buildGetControllerGetProductId({dataAccess});
const buildControllerEditProduct = buildPutControllerEditProduct({dataAccess});

const objectService = Object.freeze({
    buildControllerSaveProduct,
    buildControllerGetProducts,
    buildControllerProducts,
    buildControllerCreateUser,
    buildControllerGetUser,
    buildControllerDeleteProduct,
    builControllerGetProductId,
    buildControllerEditProduct
});

export default objectService;
export {
    buildControllerSaveProduct,
    buildControllerGetProducts,
    buildControllerProducts,
    buildControllerCreateUser,
    buildControllerGetUser,
    buildControllerDeleteProduct,
    builControllerGetProductId,
    buildControllerEditProduct
};
