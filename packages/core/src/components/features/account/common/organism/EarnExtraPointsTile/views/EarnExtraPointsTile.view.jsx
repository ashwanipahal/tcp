import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Row, Col, Anchor } from '@tcp/core/src/components/common/atoms';
import { routerPush, getIconPath, getLabelValue } from '@tcp/core/src/utils';
import internalEndpoints from '@tcp/core/src/components/features/account/common/internalEndpoints';
import styles from '../styles/EarnExtraPointsTile.style';
import carouselConfig from '../EarnExtraPointsTile.config';
import DetailedEarnExtraPointsTile from '../../../molecule/DetailedEarnExtraPointsTile';
import EARNEXTRAPOINTS_CONSTANTS from '../EarnExtraPointsTile.constants';

const onViewActivityDetails = () => {
  return routerPush(internalEndpoints.extraPointsPage.link, internalEndpoints.extraPointsPage.path);
};

/**
 * @function EarnExtraPointsTile The EarnExtraPointsTile component will provide Carousel with tiles data
 */

const EarnExtraPointsTile = ({ className, labels, waysToEarn, isAccountOverview }) => {
  if (waysToEarn && waysToEarn.length > EARNEXTRAPOINTS_CONSTANTS.MAX_TILE_COUNT) {
    carouselConfig.dots = false;
  }

  return (
    <div className={className}>
      {!isAccountOverview && (
        <Row>
          <Col colSize={{ large: 10, medium: 6, small: 4 }}>
            <BodyCopy
              component="div"
              fontSize="fs16"
              fontWeight="extrabold"
              fontFamily="secondary"
              data-locator="earnExtraPointsHeading"
            >
              {getLabelValue(labels, 'lbl_common_earnExtraPoints')}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 2, medium: 2, small: 2 }} className="textRight">
            <Anchor
              fontSizeVariation="medium"
              anchorVariation="primary"
              to={internalEndpoints.extraPointsPage.link}
              asPath={internalEndpoints.extraPointsPage.path}
              data-locator="earnExtraPointsViewAll"
              underline
            >
              {getLabelValue(labels, 'lbl_common_viewAll')}
            </Anchor>
          </Col>
        </Row>
      )}
      <BodyCopy
        component="div"
        textAlign="center"
        className={isAccountOverview ? 'onAccountOverview' : 'earnExtraPointsWrapper'}
      >
        <Carousel
          options={carouselConfig}
          carouselConfig={{
            customArrowLeft: getIconPath('smallright'),
            customArrowRight: getIconPath('smallright'),
            arrow: 'small',
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
                  onViewActivityDetails={onViewActivityDetails}
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
  isAccountOverview: PropTypes.bool,
};

EarnExtraPointsTile.defaultProps = {
  className: '',
  waysToEarn: [],
  labels: {
    lbl_common_earnExtraPoints: '',
    lbl_common_viewAll: '',
  },
  isAccountOverview: false,
};

export default withStyles(EarnExtraPointsTile, styles);
export { EarnExtraPointsTile as EarnExtraPointsTileVanilla };
