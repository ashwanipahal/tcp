import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const getMassagedBonusData = res => {
  const {
    totalBonusPointDays,
    availableBonusPointDays,
    usedBonusPointDays,
    appliedToBagBonusPointDays,
    isBlackOutDay,
    bonusDayAvailableToday,
    usedBonusPointDates,
  } = res;
  return {
    totalBonusPointDays,
    availableBonusPointDays,
    usedBonusPointDays,
    appliedToBagBonusPointDays,
    isBlackOutDay,
    bonusDayAvailableToday,
    usedBonusPointDates,
  };
};

export const getBonusPointsData = () => {
  const payload = {
    webService: endpoints.bonusPoints,
  };
  return executeStatefulAPICall(payload).then(res => {
    /* istanbul ignore else */
    if (!res.body) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    const massagedData = getMassagedBonusData(res.body);
    return massagedData || {};
  });
};

export const applyBonusPointsData = dto => {
  const payload = {
    webService: endpoints.applyBonusPoints,
    body: {
      bonusDaySelected: dto.payload.bonusDaySelected,
      orderId: dto.payload.orderId,
    },
  };
  return executeStatefulAPICall(payload).then(res => {
    /* istanbul ignore else */
    if (!res.body) {
      throw new Error('res body is coming null');
      // TODO - Set API Helper to filter if error exists in response
    }
    const massagedData = getMassagedBonusData(res.body);
    return massagedData || {};
  });
};

export default {
  getBonusPointsData,
  applyBonusPointsData,
};
