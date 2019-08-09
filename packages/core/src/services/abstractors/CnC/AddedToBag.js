import { executeUnbxdAPICall, executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const getUnboxResult = endPoint =>
  executeUnbxdAPICall({
    body: {},
    webService: endPoint,
  }).then(res => res.body.response.products);

export const getPlpProducts = () => getUnboxResult(endpoints.getPlpProducts);
export const getGiftCardProducts = () => getUnboxResult(endpoints.getGiftCardProducts);

export const addCartEcomItem = params =>
  executeStatefulAPICall({ body: params, webService: endpoints.addProductToCart })
    .then(res => ({
      orderId: res.body.orderId && res.body.orderId[0],
      orderItemId: res.body.orderItemId && res.body.orderItemId[0],
    }))
    .catch(res => {
      throw res.error || res.body.error;
    });

export const addCartBopisItem = params =>
  executeStatefulAPICall({ body: params, webService: endpoints.addOrderBopisItem })
    .then(res => ({
      orderItemId: res.body.orderItemId,
    }))
    .catch(res => {
      throw res.error || res.body.error;
    });

export default {
  getPlpProducts,
  getGiftCardProducts,
  addCartEcomItem,
  addCartBopisItem,
};
