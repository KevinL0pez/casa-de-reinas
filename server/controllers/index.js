import dataAccess from '../dbaccess/index';

import buildPostControllerSaveProduct from './products/postControllerSaveProduct';
import buildGetControllerGetProducts from './products/getControllerGetProducts';

const buildControllerSaveProduct = buildPostControllerSaveProduct({dataAccess});
const buildControllerProducts = buildGetControllerGetProducts({dataAccess});

const objectService = Object.freeze({
    buildControllerSaveProduct,
    buildControllerProducts
});

export default objectService;
export {
    buildControllerSaveProduct,
    buildControllerProducts
};
