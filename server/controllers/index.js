import dataAccess from '../dbaccess/index';

import buildPostControllerSaveProduct from './products/postControllerSaveProduct';

const buildControllerSaveProduct = buildPostControllerSaveProduct({dataAccess});

const objectService = Object.freeze({
    buildControllerSaveProduct
});

export default objectService;
export {
    buildControllerSaveProduct
};
