import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { isCanada } from '@tcp/core/src/utils';
import { getLabelValue } from '@tcp/core/src/utils/utils';

import styles from '../styles/PlaceRewards.section.style';
import MyRewards from '../../../../common/organism/MyRewards';
import RewardsPoints from '../../../../common/organism/RewardsPoints';
import PointsHistory from '../../../../common/organism/PointsHistory';
import EarnExtraPointsTileContainer from '../../../../common/organism/EarnExtraPointsTile';
import BonusPointsDays from '../../../molecules/BonusPointsDays';

const PlaceRewardsSection = ({ labels, className, ...otherProps }) => {
  const isCA = isCanada();
  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 8,
          }}
        >
          <BodyCopy
            fontFamily="primary"
            fontSize="fs16"
            fontWeight="extrabold"
            component="h4"
            className="place-rewards__heading"
            data-locator="place-rewards-heading"
          >
            {getLabelValue(labels, 'ACC_LBL_PLACE_REWARDS_HEADING', 'placeRewards')}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed>
        {!isCA && (
          <Row fullBleed className="place-rewards-sections-row1">
            <Col
              colSize={{
                small: 6,
                large: 6,
                medium: 4,
              }}
              className="place-rewards-col1"
            >
              <Row fullBleed>
                <Col
                  colSize={{
                    small: 4,
                    large: 10,
                    medium: 6,
                  }}
                >
                  <BodyCopy
                    fontFamily="secondary"
                    fontSize="fs16"
                    fontWeight="extrabold"
                    component="h4"
                    className="elem-mb-SM elem-ml-SM"
                  >
                    {getLabelValue(labels, 'lbl_my_rewards_point_balance', 'placeRewards')}
                  </BodyCopy>
                </Col>
              </Row>
              <Row fullBleed className="elem-mb-MED reward-points">
                <Col
                  colSize={{
                    small: 4,
                    large: 10,
                    medium: 6,
                  }}
                  className="reward-points-section"
                >
                  <div className="my-place-reward-section">
                    <RewardsPoints labels={getLabelValue(labels, 'placeRewards')} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col
              colSize={{
                small: 6,
                large: 6,
                medium: 4,
              }}
              className="place-rewards-col2"
            >
              <Row fullBleed>
                <Col
                  colSize={{
                    small: 4,
                    large: 10,
                    medium: 6,
                  }}
                >
                  <BodyCopy
                    fontFamily="secondary"
                    fontSize="fs16"
                    fontWeight="extrabold"
                    component="h4"
                    className="elem-mb-SM elem-ml-SM"
                    data-locator="pointshistorylbl"
                  >
                    {getLabelValue(labels, 'lbl_my_rewards_points_history', 'placeRewards')}
                  </BodyCopy>
                </Col>
              </Row>
              <Row fullBleed className="elem-mb-MED">
                <Col
                  colSize={{
                    small: 6,
                    large: 11,
                    medium: 8,
                  }}
                >
                  <PointsHistory />
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        <Row fullBleed className="place-rewards-sections-row2">
          <Col
            colSize={{
              small: 6,
              large: 6,
              medium: 4,
            }}
            className="place-rewards-col3"
          >
            <div className="bonusPointsWrapper">
              <BonusPointsDays />
            </div>
          </Col>
          <Col
            colSize={{
              small: 6,
              large: 6,
              medium: 4,
            }}
            className="place-rewards-col4"
          >
            <EarnExtraPointsTileContainer />
          </Col>
        </Row>
      </Row>
      {!isCA && <MyRewards labels={labels} showLink {...otherProps} />}
    </div>
  );
};

PlaceRewardsSection.propTypes = {
  labels: PropTypes.shape({ placeRewards: {} }),
  className: PropTypes.string,
};

PlaceRewardsSection.defaultProps = {
  labels: { placeRewards: { ACC_LBL_PLACE_REWARDS_HEADING: '' } },
  className: '',
};

export default withStyles(PlaceRewardsSection, styles);
export { PlaceRewardsSection as PlaceRewardsSectionVanilla };
