import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import CHECKOUT_PAGE from '../../../constants/pages.constants';

export const getPointsHistoryData = () => {
  const payload = {
    webService: endpoints.getPointsHistory,
    header: {
      fromPage: CHECKOUT_PAGE,
    },
  };
  return executeStatefulAPICall(payload).then(res => {
    if (!res.body) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }

    let pointsHistory = [];
    if (res.body.pointsHistoryList[0]) {
      pointsHistory = res.body.pointsHistoryList[0].pointsHistoryData;
    }
    return pointsHistory;
  });
};

export default {
  getPointsHistoryData,
};
