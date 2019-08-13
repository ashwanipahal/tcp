import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import styles from '../styles/PlaceRewards.section.style';
import withStyles from '../../../../../../common/hoc/withStyles';
import MyRewards from '../../../molecules/MyRewards';
import RewardsPoints from '../../../../common/organism/RewardsPoints';
import PointsHistory from '../../../../common/organism/PointsHistory';
import { isCanada } from '../../../../../../../utils';
import BonusPointsDays from '../../../molecules/BonusPointsDays';
import FPO from '../../../../../../common/atoms/FPO';

const PlaceRewardsSection = ({ labels, className }) => {
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
            {labels.myPlaceRewards.ACC_LBL_PLACE_REWARDS_HEADING}
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
                    {labels.myPlaceRewards.lbl_my_rewards_point_balance}
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
                  <RewardsPoints labels={labels.common} />
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
                    {labels.myPlaceRewards.lbl_my_rewards_points_history}
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
            <BonusPointsDays />
          </Col>
          <Col
            colSize={{
              small: 6,
              large: 6,
              medium: 4,
            }}
            className="place-rewards-col4"
          >
            <FPO />
          </Col>
        </Row>
      </Row>
      <MyRewards labels={labels} />
    </div>
  );
};

PlaceRewardsSection.propTypes = {
  labels: PropTypes.shape({ myPlaceRewards: {} }),
  className: PropTypes.string,
};

PlaceRewardsSection.defaultProps = {
  labels: { myPlaceRewards: { ACC_LBL_PLACE_REWARDS_HEADING: '' } },
  className: '',
};

export default withStyles(PlaceRewardsSection, styles);
export { PlaceRewardsSection as PlaceRewardsSectionVanilla };
