import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/PointsHistoryList.view.style';
import { Row, Col, BodyCopy } from '../../../../../../common/atoms';
import PointHistoryViewSkeleton from '../skeleton/PointHistoryViewSkeleton.view';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const PointsHistoryList = ({
  className,
  labels,
  accountlabels,
  pointHistory,
  showSuccess,
  showError,
  claimPointsErrorMessage,
  isFetching,
}) => {
  return (
    <div className={className}>
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
      {pointHistory && pointHistory.length && (
        <Row fullBleed className="elem-mb-SM elem-mt-SM">
          <Col colSize={{ large: 3, medium: 2, small: 2 }}>
            <BodyCopy
              data-locator="pointshistoryorderdatelbl"
              fontFamily="secondary"
              className="list-fontsizes"
              fontWeight="semibold"
            >
              {getLabelValue(labels, 'lbl_common_order_date')}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 4, medium: 3, small: 2 }}>
            <BodyCopy
              data-locator="pointshistorytransactionslbl"
              fontFamily="secondary"
              className="list-fontsizes"
              fontWeight="semibold"
            >
              {getLabelValue(labels, 'lbl_common_transaction')}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 3, medium: 3, small: 2 }}>
            <BodyCopy
              data-locator="pointshistorypointsearnedlbl"
              component="p"
              fontFamily="secondary"
              className="list-fontsizes"
              fontWeight="semibold"
              textAlign={['left', 'left', 'center']}
            >
              {getLabelValue(labels, 'lbl_common_points_earned')}
            </BodyCopy>
          </Col>
        </Row>
      )}
      {isFetching && <PointHistoryViewSkeleton isPointHistoryPage />}
      {!isFetching &&
        pointHistory &&
        pointHistory.length &&
        pointHistory.map(pointHistoryRow => (
          <Row fullBleed className="elem-mb-SM">
            <Col colSize={{ large: 3, medium: 2, small: 2 }}>
              <BodyCopy
                data-locator="pointshistoryorderdate"
                fontFamily="secondary"
                className="list-fontsizes"
                fontWeight="regular"
              >
                {pointHistoryRow.transactionDate}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy
                data-locator="pointshistorytransctionmsg"
                fontFamily="secondary"
                className="list-fontsizes"
                fontWeight="regular"
              >
                {pointHistoryRow.transactionTypeName}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 3, medium: 3, small: 2 }}>
              <BodyCopy
                data-locator="pointshistorypoints"
                fontFamily="secondary"
                className="list-fontsizes"
                fontWeight="regular"
                textAlign="left"
              >
                {pointHistoryRow.pointsEarned}
              </BodyCopy>
            </Col>
          </Row>
        ))}
      {!pointHistory && (
        <BodyCopy
          data-locator="pointshistorynopoints"
          component="p"
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
        >
          {getLabelValue(labels, 'lbl_common_points_history_nopoints')}
        </BodyCopy>
      )}
    </div>
  );
};

PointsHistoryList.propTypes = {
  className: PropTypes.string,
  pointHistory: PropTypes.shape({}).isRequired,
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
  isFetching: PropTypes.bool,
};

PointsHistoryList.defaultProps = {
  className: '',
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
  isFetching: false,
};

export default withStyles(PointsHistoryList, styles);
export { PointsHistoryList as PointsHistoryListVanilla };
