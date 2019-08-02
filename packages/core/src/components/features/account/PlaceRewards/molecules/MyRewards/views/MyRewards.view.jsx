import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import LabelsUtil from '../../../../../../../utils/labels.util';
import styles from '../MyRewards.style';
import withStyles from '../../../../../../common/hoc/withStyles';
import Button from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';

const MyRewards = ({ labels, className }) => {
  const heading = LabelsUtil.replacePlaceholderValues(
    labels.myPlaceRewards.ACC_LBL_MY_REWARDS_HEADING,
    [0]
  );
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
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="extrabold"
            className="my-rewards-heading"
            data-locator="my-rewards-heading"
          >
            {heading}
          </BodyCopy>
        </Col>
        <Col
          colSize={{
            small: 4,
            large: 12,
            medium: 8,
          }}
          offsetLeft={{ large: 0, small: 1, medium: 0 }}
        >
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="bold"
            className="no-rewards-msg"
            data-locator="no_rewards_msg"
          >
            {LabelsUtil.getLabel(labels, 'myPlaceRewards.ACC_LBL_MY_REWARDS_NO_REWARDS_MSG')}
          </BodyCopy>
        </Col>
        <Col
          colSize={{
            small: 6,
            large: 2,
            medium: 4,
          }}
          offsetLeft={{ large: 4, small: 0, medium: 2 }}
          className="shop-now-btn-wrapper"
        >
          <Button buttonVariation="fixed-width" fill="BLUE" color="white" className="shop-now-btn">
            {LabelsUtil.getLabel(labels, 'myPlaceRewards.ACC_LBL_MY_REWARDS_SHOP_NOW')}
          </Button>
        </Col>
        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 8,
          }}
          className="anchor-wrapper"
        >
          <Anchor
            fontSizeVariation="small"
            underline
            noLink
            href="https://www.childrensplace.com/us/content/myplace-rewards-page"
            anchorVariation="primary"
            data-locator="my-rewards-program-details"
            target="_blank"
          >
            {LabelsUtil.getLabel(labels, 'myPlaceRewards.ACC_LBL_MY_REWARDS_PROGRAM_DETAILS')}
          </Anchor>
          <Anchor
            fontSizeVariation="small"
            underline
            noLink
            href="https://www.childrensplace.com/us/help-center/#termsAndConditionsli"
            anchorVariation="primary"
            data-locator="my-rewards-tnc"
            className="elem-ml-XXL"
            target="_self"
          >
            {LabelsUtil.getLabel(labels, 'common.ACC_LBL_TNC')}
          </Anchor>
        </Col>
      </Row>
    </div>
  );
};

MyRewards.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string,
};

MyRewards.defaultProps = {
  labels: { common: {}, myPlaceRewards: {} },
  className: '',
};

export default withStyles(MyRewards, styles);
export { MyRewards as MyRewardsVanilla };
