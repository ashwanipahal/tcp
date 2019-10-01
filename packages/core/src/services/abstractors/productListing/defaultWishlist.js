import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const getProductsUserCustomInfo = (generalProductIdsList, products, isPDP) => {
  const payload = {
    webService: endpoints.getListofDefaultWishlist,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      // TODO - fix error handling - throw new ServiceResponseError(res);
      // }
      const favProductsMap = {};

      if (!res.body) {
        return favProductsMap;
      }

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

      return products.map(product => {
        const { miscInfo, ...otherAttributes } = product;
        const extraProductInfo = favProductsMap[product.productInfo.generalProductId];
        return {
          ...otherAttributes,
          miscInfo: {
            ...miscInfo,
            isInDefaultWishlist: !!extraProductInfo && extraProductInfo.isInDefaultWishlist,
          },
        };
      });
    })
    .catch(err => {
      console.log('err', err);
      // TODO - throw this.apiHelper.getFormattedError(err);
    });
};

export default getProductsUserCustomInfo;
