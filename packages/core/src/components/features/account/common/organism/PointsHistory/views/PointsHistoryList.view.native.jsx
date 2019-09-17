import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../../../common/atoms';
import { PointHistoryView, PointView, PointTransView } from '../styles/PointHistory.style';

/**
 * @function PointsHistory The PointsHistory to show points history list
 */

const PointsHistory = ({ labels, pointHistory }) => {
  const pointHistoryLen = pointHistory && pointHistory.length;
  return (
    <React.Fragment>
      {pointHistoryLen > 0 && (
        <PointHistoryView>
          <PointView>
            <BodyCopy text={labels.lbl_common_order_date} fontFamily="secondary" fontSize="fs12" />
          </PointView>
          <PointTransView>
            <BodyCopy text={labels.lbl_common_transaction} fontFamily="secondary" fontSize="fs12" />
          </PointTransView>
          <PointView>
            <BodyCopy
              text={labels.lbl_common_points_earned}
              component="p"
              fontFamily="secondary"
              fontSize="fs12"
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
                textAlign="center"
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
        />
      )}
    </React.Fragment>
  );
};

PointsHistory.propTypes = {
  pointHistory: PropTypes.shape([]),
  labels: PropTypes.shape({
    lbl_common_order_date: PropTypes.string,
    lbl_common_transaction: PropTypes.string,
    lbl_common_points_earned: PropTypes.string,
    lbl_common_points_history: PropTypes.string,
  }),
};

PointsHistory.defaultProps = {
  pointHistory: [],
  labels: {
    lbl_common_order_date: '',
    lbl_common_transaction: '',
    lbl_common_points_earned: '',
    lbl_common_points_history: '',
  },
};

export default PointsHistory;
