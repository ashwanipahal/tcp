import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy } from '../../../../../../../common/atoms';
import withStyles from '../../../../../../../common/hoc/withStyles';
import styles from '../../styles/RewardsPoints.style';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const RewardsPointsSlider = ({
  className,
  pointsToNextReward,
  currentPoints,
  totalRewards,
  labels,
}) => {
  return (
    <div className={className}>
      <Row>
        <Col colSize={{ large: 4, medium: 3, small: 2 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {`${labels.lbl_common_current_points}: `}
            <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
              {currentPoints}
            </BodyCopy>
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 8, medium: 5, small: 4 }}>
          <BodyCopy component="p" fontFamily="secondary" fontSize="fs14">
            {`${labels.lbl_common_heading}: `}
            <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
              {labels.lbl_common_currency}
              {totalRewards && Math.trunc(totalRewards)}
            </BodyCopy>
          </BodyCopy>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <div className="progress-container elem-mt-MED elem-mt-MED elem-mb-SM">
            <div className="progressbar-rewards" style={{ width: `${currentPoints}%` }} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {`${labels.lbl_common_next_reward}: `}
            <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
              {pointsToNextReward}
            </BodyCopy>
          </BodyCopy>
        </Col>
      </Row>
    </div>
  );
};

RewardsPointsSlider.propTypes = {
  className: PropTypes.string,
  pointsToNextReward: PropTypes.number,
  currentPoints: PropTypes.number,
  totalRewards: PropTypes.number,
  labels: PropTypes.shape({
    lbl_common_current_points: PropTypes.string,
    lbl_common_heading: PropTypes.string,
    lbl_common_next_reward: PropTypes.string,
    lbl_common_currency: PropTypes.string,
  }),
};

RewardsPointsSlider.defaultProps = {
  className: '',
  pointsToNextReward: '',
  currentPoints: '',
  totalRewards: '',
  labels: {
    lbl_common_current_points: '',
    lbl_common_heading: '',
    lbl_common_next_reward: '',
    lbl_common_currency: '',
  },
};

export default withStyles(RewardsPointsSlider, styles);
export { RewardsPointsSlider as RewardsPointsSliderVanilla };
