import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../../../common/atoms';
import { PointHistoryView, PointView, PointTransView } from '../styles/PointHistory.style';

/**
 * @function RewardsPointsList The RewardsPointsList to show poitns history list
 */

const PointsHistory = ({ labels, pointHistory }) => {
  return (
    <React.Fragment>
      {pointHistory && pointHistory.length && (
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

      {pointHistory &&
        pointHistory.length &&
        pointHistory.map(pointHistoryRow => (
          <PointHistoryView>
            <PointView>
              <BodyCopy
                text={pointHistoryRow.transactionDate}
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="regular"
              />
            </PointView>
            <PointTransView>
              <BodyCopy
                text={pointHistoryRow.transactionTypeName}
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="regular"
              />
            </PointTransView>
            <PointView>
              <BodyCopy
                text={pointHistoryRow.pointsEarned}
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="regular"
                textAlign="left"
              />
            </PointView>
          </PointHistoryView>
        ))}

      {!pointHistory && (
        <BodyCopy
          text={labels.lbl_common_points_history_nopoints}
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="regular"
        />
      )}
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
