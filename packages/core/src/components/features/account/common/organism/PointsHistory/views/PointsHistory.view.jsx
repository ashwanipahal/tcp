import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy, Anchor } from '../../../../../../common/atoms';
import REWARDSPOINTS_CONSTANTS from '../PointsHistory.constants';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const PointsHistory = ({ className, labels, pointHistory }) => {
  let pointHistoryData = [];

  if (pointHistory && pointHistory.length > 3) {
    for (let i = 0; i < REWARDSPOINTS_CONSTANTS.POINT_TO; i += 1) {
      pointHistoryData.push(pointHistory[i]);
    }
  } else {
    pointHistoryData = pointHistory;
  }

  return (
    <div className={className}>
      <Row fullbleed className="elem-mb-SM elem-mt-SM">
        <Col colSize={{ large: 3, medium: 2, small: 2 }}>
          <BodyCopy
            data-locator="pointshistoryorderdatelbl"
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="semibold"
          >
            {labels.lbl_common_order_date}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 4, medium: 3, small: 2 }}>
          <BodyCopy
            data-locator="pointshistorytransactionslbl"
            fontFamily="secondary"
            fontSize="fs12"
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
            fontSize="fs12"
            fontWeight="semibold"
          >
            {labels.lbl_common_points_earned}
          </BodyCopy>
        </Col>
      </Row>

      {pointHistoryData &&
        pointHistoryData.length &&
        pointHistoryData.map(pointHistoryRow => (
          <Row fullbleed className="elem-mb-SM">
            <Col colSize={{ large: 3, medium: 2, small: 2 }}>
              <BodyCopy
                data-locator="pointshistoryorderdate"
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
              >
                {pointHistoryRow.transactionDate}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy
                data-locator="pointshistorytransctionmsg"
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
              >
                {pointHistoryRow.transactionTypeName}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 3, medium: 3, small: 2 }}>
              <BodyCopy
                data-locator="pointshistorypoints"
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
                textAlign="center"
              >
                {pointHistoryRow.pointsEarned}
              </BodyCopy>
            </Col>
          </Row>
        ))}

      <Row fullbleed className="elem-mt-XXL elem-mt-XXS">
        <Col colSize={{ large: 4, medium: 3, small: 2 }}>
          <Anchor
            dataLocator="pointshistorylnk"
            fontSizeVariation="medium"
            underline
            anchorVariation="primary"
          >
            {labels.lbl_common_points_history}
          </Anchor>
        </Col>
      </Row>
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
