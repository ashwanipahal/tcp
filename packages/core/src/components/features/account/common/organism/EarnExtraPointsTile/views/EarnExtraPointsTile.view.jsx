import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Row, Col, Anchor } from '@tcp/core/src/components/common/atoms';
import { routerPush, getIconPath } from '@tcp/core/src/utils';
import internalEndpoints from '@tcp/core/src/components/features/account/common/internalEndpoints';
import styles from '../styles/EarnExtraPointsTile.style';
import carouselConfig from '../EarnExtraPointsTile.config';
import DetailedEarnExtraPointsTile from '../../../molecule/DetailedEarnExtraPointsTile';

const onClickHandler = () => {
  return routerPush(internalEndpoints.profilePage.link, internalEndpoints.profilePage.path);
};

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const EarnExtraPointsTile = ({ className, labels, waysToEarn }) => {
  if (waysToEarn && waysToEarn.length > 8) {
    carouselConfig.dots = false;
  }

  return (
    <div className={className}>
      <Row>
        <Col colSize={{ large: 10, medium: 6, small: 4 }}>
          <BodyCopy
            component="div"
            fontSize="fs16"
            fontWeight="extrabold"
            fontFamily="secondary"
            data-locator="earnExtraPointsHeading"
          >
            {labels.lbl_common_earnExtraPoints}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 2, medium: 2, small: 2 }}>
          <Anchor
            fontSizeVariation="medium"
            anchorVariation="primary"
            data-locator="earnExtraPointsViewAll"
            underline
          >
            {labels.lbl_common_viewAll}
          </Anchor>
        </Col>
      </Row>
      <BodyCopy component="div" textAlign="center" className="earnExtraPointsWrapper">
        <Carousel
          options={carouselConfig}
          carouselConfig={{
            customArrowLeft: getIconPath('smallright'),
            customArrowRight: getIconPath('smallright'),
            type: 'light',
          }}
          carouselTheme="dark"
          className={className}
        >
          {waysToEarn &&
            waysToEarn.map((item, index) => {
              return (
                <DetailedEarnExtraPointsTile
                  key={index.toString()}
                  waysToEarnRow={item}
                  onClickHandler={onClickHandler}
                  labels={labels}
                />
              );
            })}
        </Carousel>
      </BodyCopy>
    </div>
  );
};

EarnExtraPointsTile.propTypes = {
  className: PropTypes.string,
  waysToEarn: PropTypes.shape([]),
  labels: PropTypes.shape({
    lbl_common_earnExtraPoints: PropTypes.string,
    lbl_common_viewAll: PropTypes.string,
  }),
};

EarnExtraPointsTile.defaultProps = {
  className: '',
  waysToEarn: [],
  labels: {
    lbl_common_earnExtraPoints: '',
    lbl_common_viewAll: '',
  },
};

export default withStyles(EarnExtraPointsTile, styles);
export { EarnExtraPointsTile as EarnExtraPointsTileVanilla };
