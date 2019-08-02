import React from 'react'; //eslint-disable-line
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/RewardsPoints.view.style';

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 */

const MyAccountLayoutView = ({
  className,
  pointsToNextReward,
  currentPoints,
  totalRewards,
  labels,
}) => {
  return (
    <div className={className}>
      <div className="divWidth">
        <Row>
          <Col colSize={{ large: 4, medium: 3, small: 2 }}>
            <BodyCopy fontFamily="secondary" fontSize="fs14">
              {`${labels.ACC_LBL_MY_REWARDS_CURRENT_POINTS}: `}
              <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
                {currentPoints}
              </BodyCopy>
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 8, medium: 5, small: 4 }}>
            <BodyCopy component="p" fontFamily="secondary" fontSize="fs14">
              {`${labels.ACC_LBL_MY_REWARDS_HEADING}: `}
              <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
                {`$`}
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
              {`${labels.ACC_LBL_MY_REWARDS_NEXT_REWARD}: `}
              <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
                {pointsToNextReward}
              </BodyCopy>
            </BodyCopy>
          </Col>
        </Row>
      </div>
    </div>
  );
};

MyAccountLayoutView.propTypes = {
  className: PropTypes.string,
  pointsToNextReward: PropTypes.number,
  currentPoints: PropTypes.number,
  totalRewards: PropTypes.number,
  labels: PropTypes.shape({}),
};

MyAccountLayoutView.defaultProps = {
  className: '',
  pointsToNextReward: null,
  currentPoints: null,
  totalRewards: null,
  labels: {},
};

export default withStyles(MyAccountLayoutView, styles);
export { MyAccountLayoutView as MyAccountLayoutViewVanilla };
