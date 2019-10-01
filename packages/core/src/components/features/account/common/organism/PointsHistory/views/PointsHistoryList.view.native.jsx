import React from 'react';
import PropTypes from 'prop-types';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { BodyCopy } from '../../../../../../common/atoms';
import { PointHistoryView, PointView, PointTransView } from '../styles/PointHistory.style';

/**
 * @function PointsHistoryList The PointsHistory to show points history list
 */

const PointsHistoryList = ({
  labels,
  pointHistory,
  accountlabels,
  showSuccess,
  showError,
  claimPointsErrorMessage,
}) => {
  const pointHistoryLen = pointHistory && pointHistory.length;
  return (
    <React.Fragment>
      {showError && (
        <Notification
          status="success"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={claimPointsErrorMessage}
        />
      )}

      {showSuccess && (
        <Notification
          status="success"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={getLabelValue(
            accountlabels,
            'lbl_points_claim_success_message',
            'myPlaceRewards'
          )}
        />
      )}
      <BodyCopyWithSpacing
        text={getLabelValue(labels, 'lbl_common_points_history')}
        fontSize="fs16"
        fontWeight="extrabold"
        fontFamily="secondary"
        color="gray.900"
        spacingStyles="margin-bottom-XL margin-top-LRG"
        dataLocator="points_history_subheading"
      />
      {pointHistoryLen > 0 && (
        <PointHistoryView>
          <PointView>
            <BodyCopy
              text={labels.lbl_common_order_date}
              color="gray.900"
              fontWeight="semibold"
              fontFamily="secondary"
              fontSize="fs12"
            />
          </PointView>
          <PointTransView>
            <BodyCopy
              text={labels.lbl_common_transaction}
              color="gray.900"
              fontWeight="semibold"
              fontFamily="secondary"
              fontSize="fs12"
            />
          </PointTransView>
          <PointView>
            <BodyCopy
              text={labels.lbl_common_points_earned}
              fontFamily="secondary"
              fontSize="fs12"
              color="gray.900"
              fontWeight="semibold"
              textAlign="center"
            />
          </PointView>
        </PointHistoryView>
      )}

      {pointHistoryLen > 0 &&
        pointHistory.map(pointHistoryRow => (
          <PointHistoryView>
            <PointView>
              <BodyCopy
                text={pointHistoryRow.transactionDate}
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
                color="gray.900"
              />
            </PointView>
            <PointTransView>
              <BodyCopy
                text={pointHistoryRow.transactionTypeName}
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
                color="gray.900"
              />
            </PointTransView>
            <PointView>
              <BodyCopy
                text={pointHistoryRow.pointsEarned}
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
                textAlign="center"
                color="gray.900"
              />
            </PointView>
          </PointHistoryView>
        ))}

      {!pointHistory && (
        <BodyCopy
          text={labels.lbl_common_points_history_nopoints}
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
          color="gray.900"
        />
      )}
    </React.Fragment>
  );
};

PointsHistoryList.propTypes = {
  pointHistory: PropTypes.shape([]),
  labels: PropTypes.shape({
    lbl_common_order_date: PropTypes.string,
    lbl_common_transaction: PropTypes.string,
    lbl_common_points_earned: PropTypes.string,
    lbl_common_points_history: PropTypes.string,
  }),
  accountlabels: PropTypes.shape({}),
  showSuccess: PropTypes.string,
  showError: PropTypes.string,
  claimPointsErrorMessage: PropTypes.string,
};

PointsHistoryList.defaultProps = {
  pointHistory: [],
  labels: {
    lbl_common_order_date: '',
    lbl_common_transaction: '',
    lbl_common_points_earned: '',
    lbl_common_points_history: '',
  },
  accountlabels: {},
  showSuccess: '',
  showError: '',
  claimPointsErrorMessage: '',
};

export default PointsHistoryList;
export { PointsHistoryList as PointsHistoryListVanilla };
