import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy, Anchor } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/PointsHistory.style';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const PointsHistory = ({
  className,
  labels,
  pointHistory,
}) => {

  const pointdata = pointHistory.forEach((pointHistoryRow)=> (
    <Row>
      <Col colSize={{ large: 4, medium: 3, small: 2 }}>
        <BodyCopy fontFamily="secondary" fontSize="fs14">
          {pointHistoryRow.transactionDate}
        </BodyCopy>
      </Col>
      <Col colSize={{ large: 4, medium: 3, small: 2 }}>
        <BodyCopy fontFamily="secondary" fontSize="fs14">
          {pointHistoryRow.pointTransactionType}
        </BodyCopy>
      </Col>
      <Col colSize={{ large: 4, medium: 2, small: 2 }}>
        <BodyCopy fontFamily="secondary" fontSize="fs14">
          {pointHistoryRow.pointsEarned}
        </BodyCopy>
      </Col>
    </Row>
    ));


  return (
    <div className={className}>
      <Row>
        <Col colSize={{ large: 4, medium: 3, small: 2 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            ORDER DATE
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 4, medium: 3, small: 2 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            TRANSACTION
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 4, medium: 2, small: 2 }}>
          <BodyCopy component="p" fontFamily="secondary" fontSize="fs14">
            POINTS EARNED
          </BodyCopy>
        </Col>
      </Row>

      {pointdata}

      <Row>
        <Col colSize={{ large: 4, medium: 3, small: 2 }}>
          <Anchor
            fontSizeVariation="small"
            underline
            anchorVariation="primary"
            to=""
          >
            Points History
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
    lbl_common_current_points: PropTypes.string,
  }),
};

PointsHistory.defaultProps = {
  className: '',
  labels: {
    lbl_common_current_points: '',
  },
};

export default withStyles(PointsHistory, styles);
export { PointsHistory as PointsHistoryVanilla };
