import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy } from '../../../../../../common/atoms';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const PointsHistory = ({ className, labels, pointHistory }) => {
  return (
    <div className={className}>
      {pointHistory && pointHistory.length && (
        <Row fullBleed className="elem-mb-SM elem-mt-SM">
          <Col colSize={{ large: 3, medium: 2, small: 2 }}>
            <BodyCopy
              data-locator="pointshistoryorderdatelbl"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="semibold"
            >
              {labels.lbl_common_order_date}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 4, medium: 3, small: 2 }}>
            <BodyCopy
              data-locator="pointshistorytransactionslbl"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="semibold"
            >
              {labels.lbl_common_transaction}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 3, medium: 3, small: 2 }}>
            <BodyCopy
              data-locator="pointshistorypointsearnedlbl"
              component="p"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="semibold"
            >
              {labels.lbl_common_points_earned}
            </BodyCopy>
          </Col>
        </Row>
      )}
      {pointHistory &&
        pointHistory.length &&
        pointHistory.map(pointHistoryRow => (
          <Row fullBleed className="elem-mb-SM">
            <Col colSize={{ large: 3, medium: 2, small: 2 }}>
              <BodyCopy
                data-locator="pointshistoryorderdate"
                fontFamily="secondary"
                fontSize="fs16"
                fontWeight="regular"
              >
                {pointHistoryRow.transactionDate}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy
                data-locator="pointshistorytransctionmsg"
                fontFamily="secondary"
                fontSize="fs16"
                fontWeight="regular"
              >
                {pointHistoryRow.transactionTypeName}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 3, medium: 3, small: 2 }}>
              <BodyCopy
                data-locator="pointshistorypoints"
                fontFamily="secondary"
                fontSize="fs16"
                fontWeight="regular"
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
          {labels.lbl_common_points_history_nopoints}
        </BodyCopy>
      )}
    </div>
  );
};

PointsHistory.propTypes = {
  className: PropTypes.string,
  pointHistory: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({
    lbl_common_order_date: PropTypes.string,
    lbl_common_transaction: PropTypes.string,
    lbl_common_points_earned: PropTypes.string,
    lbl_common_points_history: PropTypes.string,
  }),
};

PointsHistory.defaultProps = {
  className: '',
  labels: {
    lbl_common_order_date: '',
    lbl_common_transaction: '',
    lbl_common_points_earned: '',
    lbl_common_points_history: '',
  },
};

export default PointsHistory;
