import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const getProductsUserCustomInfo = (isPDP = false) => {
  const payload = {
    webService: endpoints.getListofDefaultWishlist,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      // TODO - fix error handling - throw new ServiceResponseError(res);
      // }
      const favProductsMap = {};
      const productKey = Object.keys(res.body);

      productKey.forEach(key => {
        const product = res.body[key];
        if (isPDP) {
          favProductsMap[product.productId] = {
            isInDefaultWishlist: product.isInDefaultWishlist,
          };
        } else {
          favProductsMap[product.productPartNumber] = {
            isInDefaultWishlist: product.isInDefaultWishlist,
          };
        }
      });
      return favProductsMap;
    })
    .catch(err => {
      console.log('err', err);
      // TODO - throw this.apiHelper.getFormattedError(err);
    });
};

export default getProductsUserCustomInfo;
