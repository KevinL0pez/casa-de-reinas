import dataAccess from '../dbaccess/index';

import buildPostControllerSaveProduct from './products/postControllerSaveProduct';
import buildGetControllerGetProducts from './products/getControllerGetProducts';
import buildGetControllerProducts from './products/getControllerProducts';

const buildControllerSaveProduct = buildPostControllerSaveProduct({dataAccess});
const buildControllerGetProducts = buildGetControllerGetProducts({dataAccess});
const buildControllerProducts = buildGetControllerProducts({dataAccess});

const objectService = Object.freeze({
    buildControllerSaveProduct,
    buildControllerGetProducts,
    buildControllerProducts
});

export default objectService;
export {
    buildControllerSaveProduct,
    buildControllerGetProducts,
    buildControllerProducts
};
