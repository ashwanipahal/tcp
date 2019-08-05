import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/RewardsPoints.view.style';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const RewardsPointsView = ({
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
            {`${labels.lbl_my_rewards_current_points}: `}
            <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
              {currentPoints}
            </BodyCopy>
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 8, medium: 5, small: 4 }}>
          <BodyCopy component="p" fontFamily="secondary" fontSize="fs14">
            {`${labels.lbl_my_rewards_heading}: `}
            <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
              {labels.lbl_my_rewards_currency}
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
            {`${labels.lbl_my_rewards_next_reward}: `}
            <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
              {pointsToNextReward}
            </BodyCopy>
          </BodyCopy>
        </Col>
      </Row>
    </div>
  );
};

RewardsPointsView.propTypes = {
  className: PropTypes.string,
  pointsToNextReward: PropTypes.number,
  currentPoints: PropTypes.number,
  totalRewards: PropTypes.number,
  labels: PropTypes.shape({
    lbl_my_rewards_current_points: PropTypes.string,
    lbl_my_rewards_heading: PropTypes.string,
    lbl_my_rewards_next_reward: PropTypes.string,
    lbl_my_rewards_currency: PropTypes.string,
  }),
};

RewardsPointsView.defaultProps = {
  className: '',
  pointsToNextReward: '',
  currentPoints: '',
  totalRewards: '',
  labels: {
    lbl_my_rewards_current_points: '',
    lbl_my_rewards_heading: '',
    lbl_my_rewards_next_reward: '',
    lbl_my_rewards_currency: '',
  },
};

export default withStyles(RewardsPointsView, styles);
export { RewardsPointsView as RewardsPointsViewVanilla };
