import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import {
  PointHistoryView,
  PointHistorsWrapper,
  PointView,
  PointTransView,
} from '../styles/PointHistory.style';
import REWARDSPOINTS_CONSTANTS from '../PointsHistory.constants';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const PointsHistory = ({ labels, accountlabels, pointHistory, navigation }) => {
  let pointHistoryData = [];

  if (pointHistory && pointHistory.length > 3) {
    for (let i = 0; i < REWARDSPOINTS_CONSTANTS.POINT_TO; i += 1) {
      pointHistoryData.push(pointHistory[i]);
    }
  } else {
    pointHistoryData = pointHistory;
  }

  return (
    <React.Fragment>
      <PointHistoryView>
        <PointView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_common_order_date')}
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="semibold"
          />
        </PointView>
        <PointTransView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_common_transaction')}
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="semibold"
          />
        </PointTransView>
        <PointView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_common_points_earned')}
            component="p"
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="semibold"
          />
        </PointView>
      </PointHistoryView>

      {pointHistoryData &&
        pointHistoryData.length &&
        pointHistoryData.map(pointHistoryRow => (
          <PointHistoryView>
            <PointView>
              <BodyCopy
                text={pointHistoryRow.transactionDate}
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
              />
            </PointView>
            <PointTransView>
              <BodyCopy
                text={pointHistoryRow.transactionTypeName}
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
              />
            </PointTransView>
            <PointView>
              <BodyCopy
                text={pointHistoryRow.pointsEarned}
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
              />
            </PointView>
          </PointHistoryView>
        ))}
      <PointHistorsWrapper>
        <Anchor
          text={getLabelValue(labels, 'lbl_common_points_history')}
          fontSizeVariation="medium"
          noLink
          underline
          anchorVariation="primary"
          onPress={() => {
            navigation.navigate('PointsHistoryPage', {
              title: getLabelValue(accountlabels, 'lbl_common_points_history_heading', 'common'),
            });
          }}
        />
      </PointHistorsWrapper>
    </React.Fragment>
  );
};

PointsHistory.propTypes = {
  pointHistory: PropTypes.shape({ length: PropTypes.string }).isRequired,
  labels: PropTypes.shape({
    lbl_common_order_date: PropTypes.string,
    lbl_common_transaction: PropTypes.string,
    lbl_common_points_earned: PropTypes.string,
    lbl_common_points_history: PropTypes.string,
  }),
  accountlabels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

PointsHistory.defaultProps = {
  labels: {
    lbl_common_order_date: '',
    lbl_common_transaction: '',
    lbl_common_points_earned: '',
    lbl_common_points_history: '',
  },
};

export default PointsHistory;
