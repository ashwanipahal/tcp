import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { constructCouponStructure } from '../CnC/CartItemTile';

export const getAllOffers = () => {
  const payload = {
    webService: endpoints.getAllOffers,
  };
  return executeStatefulAPICall(payload).then(res => {
    /* istanbul ignore else */
    if (!res.body) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    return constructCouponStructure(res.body.offers);
  });
};

export default getAllOffers;
