import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import styles from '../../../styles/PlaceRewards.section.style';
import withStyles from '../../../../../../common/hoc/withStyles';
import MyRewards from '../../../molecules/MyRewards';

const PlaceRewardsSection = ({ labels, className }) => {
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
        <Row fullBleed className="place-rewards-sections-row1">
          <Col
            colSize={{
              small: 6,
              large: 6,
              medium: 4,
            }}
            className="place-rewards-col1"
          >
            First
          </Col>
          <Col
            colSize={{
              small: 6,
              large: 6,
              medium: 4,
            }}
            className="place-rewards-col2"
          >
            Second
          </Col>
        </Row>
        <Row fullBleed className="place-rewards-sections-row2">
          <Col
            colSize={{
              small: 6,
              large: 6,
              medium: 4,
            }}
            className="place-rewards-col3"
          >
            Third
          </Col>
          <Col
            colSize={{
              small: 6,
              large: 6,
              medium: 4,
            }}
            className="place-rewards-col4"
          >
            Fourth
          </Col>
        </Row>
      </Row>
      <MyRewards labels={labels} />
    </div>
  );
};

PlaceRewardsSection.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string,
};

PlaceRewardsSection.defaultProps = {
  labels: { common: {}, myPlaceRewards: {} },
  className: '',
};

export default withStyles(PlaceRewardsSection, styles);
export { PlaceRewardsSection as PlaceRewardsSectionVanilla };
