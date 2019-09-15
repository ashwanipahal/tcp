/**
@module Extra Points Tabs Dynamic Abstractor
*/
import endpoints from '@tcp/core/src/services/endpoints';
import { getAPIConfig } from '@tcp/core/src/utils/utils';
import { executeStatefulAPICall } from '@tcp/core/src/services/handler';

/**
 * getExtraPointsActivityList -- on call make api call to get
 * data of waysToEarn extra points
 *  and parse api data and then return data to Operator layer
 * @param undefined
 * @return resolved promise with api parsed data as resolved value
 */

export const getExtraPointsActivityList = () => {
  const apiConfig = getAPIConfig();
  const payload = {
    header: {
      storeId: apiConfig.storeId,
    },
    webService: endpoints.getExtraPoints,
  };

  // return promise
  return executeStatefulAPICall(payload)
    .then(res => {
      const { activityList } = res.body.activityList;
      let extraPoints = [];
      let filteredExtraPoints = [];

      // parsing api respone and pushing into extraPoints
      extraPoints =
        activityList &&
        activityList.map(item => {
          let activity;
          let extraPointsResult = {};
          try {
            activity = JSON.parse(item.activity);
          } catch (e) {
            activity = '';
          }
          if (activity) {
            extraPointsResult = {
              id: item.id,
              displayOrder: item.displayOrder,
              activityCode: item.activityCode,
              iconImage: activity.iconImage,
              activityTitle: activity.activityTitle,
              description: activity.shortDescription,
              activityModal: {
                activityModalIconImage: activity.activityModalIconImage,
                activityModalShortTitle: activity.activityModalShortTitle,
                activityModalTitle: activity.activityModalTitle,
                activityModalLongDescription: activity.activityModalLongDescription,
                activityModalAction: activity.activityModalAction,
                activityModalExternalUrl: activity.activityModalExternalUrl,
                activityModalCtaText: activity.activityModalCtaText,
                activityModalSocialAccount: activity.activityModalSocialAccount,
                activityModalCheckIsConnected: activity.activityModalCheckIsConnected,
                autoOpenLoginActivity: activity.autologin,
                activityModalAppendMPRId: activity.activityModalAppendMPRId,
              },
            };
            return extraPointsResult;
          }
          return false;
        });
      // Filter out undefined array values
      filteredExtraPoints = extraPoints.filter(obj => {
        if (obj) {
          return obj;
        }
        return false;
      });
      // returning parsed data
      return filteredExtraPoints;
    })
    .catch(err => {
      throw err;
    });
};

/**
 * getEarnedPointsNotification -- on call make api call to get
 * data of earned extra points notifications
 *  and parse api data and then return data to Operator layer
 * @param undefined
 * @return resolved promise with api parsed data as resolved value
 */

export const getEarnedPointsNotification = () => {
  const apiConfig = getAPIConfig();

  const payload = {
    header: {
      storeId: apiConfig.storeId,
    },
    webService: endpoints.getEarnedPointsNotication,
  };

  // return promise
  return executeStatefulAPICall(payload)
    .then(res => {
      return res.body.pointsHistoryData;
    })
    .catch(err => {
      throw err;
    });
};
