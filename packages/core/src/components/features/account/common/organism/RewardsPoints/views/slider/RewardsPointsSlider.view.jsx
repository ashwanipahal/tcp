import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
  plccUser,
}) => {
  return (
    <div className={className}>
      <Row>
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <div className="current-points">
            <span>
              <BodyCopy
                component="span"
                data-locator="slidercurrentpointslbl"
                fontFamily="secondary"
                fontSize="fs13"
              >
                {`${getLabelValue(labels, 'lbl_rewardPoints_currentPoints')}: `}
                <BodyCopy
                  data-locator="slidercurrentpointsvalue"
                  component="span"
                  fontWeight="black"
                  fontFamily="secondary"
                  fontSize="fs13"
                >
                  {currentPoints}
                </BodyCopy>
              </BodyCopy>
            </span>
            <span className="my-rewards">
              <BodyCopy
                data-locator="slidermyrewardslbl"
                component="span"
                fontFamily="secondary"
                fontSize="fs13"
              >
                {`${getLabelValue(labels, 'lbl_rewardPoints_heading')}: `}
                <BodyCopy
                  data-locator="slidermyrewardsvalue"
                  component="span"
                  fontWeight="black"
                  fontFamily="secondary"
                  fontSize="fs13"
                >
                  {getLabelValue(labels, 'lbl_rewardPoints_currency')}
                  {totalRewards && Math.trunc(totalRewards)}
                </BodyCopy>
              </BodyCopy>
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <div
            data-locator="sliderpointsgraph"
            className={`progress-container${
              plccUser ? '_plcc' : ''
            } elem-mt-MED elem-mt-MED elem-mb-SM`}
          >
            <div
              className={`progressbar-rewards currentpoint-slider ${
                plccUser ? 'progressbar-rewards_plcc' : 'progressbar-rewards'
              } `}
              style={{ width: `${currentPoints}%` }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <BodyCopy
            data-locator="slidernextrewardspointslbl"
            fontFamily="secondary"
            fontSize="fs13"
          >
            {`${getLabelValue(labels, 'lbl_rewardPoints_nextReward')}: `}
            <BodyCopy
              data-locator="slidernextrewardspointsvalue"
              component="span"
              fontWeight="black"
              fontFamily="secondary"
              fontSize="fs13"
            >
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
  plccUser: PropTypes.bool,
  labels: PropTypes.shape({
    lbl_rewardPoints_currentPoints: PropTypes.string,
    lbl_rewardPoints_heading: PropTypes.string,
    lbl_rewardPoints_nextReward: PropTypes.string,
    lbl_rewardPoints_currency: PropTypes.string,
  }),
};

RewardsPointsSlider.defaultProps = {
  className: '',
  pointsToNextReward: '',
  currentPoints: '',
  totalRewards: '',
  plccUser: false,
  labels: {
    lbl_rewardPoints_currentPoints: '',
    lbl_rewardPoints_heading: '',
    lbl_rewardPoints_nextReward: '',
    lbl_rewardPoints_currency: '',
  },
};

export default withStyles(RewardsPointsSlider, styles);
export { RewardsPointsSlider as RewardsPointsSliderVanilla };
