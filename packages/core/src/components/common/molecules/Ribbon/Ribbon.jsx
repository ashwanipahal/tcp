import React from 'react';
import PropTypes from 'prop-types';
import PromoBanner from '../PromoBanner';
import { getLocator } from '../../../../utils';
import { RibbonWrapper, RibbonContainer } from './Ribbon.style';

const ribbonLeftImage = '/static/images/module-a-ribbon-left.png';
const ribbonRightImage = '/static/images/module-a-ribbon-right.png';

const getImgPath = ribbonBanner => {
  const [ribbonDetails] = ribbonBanner;
  return ribbonDetails.ribbonPlacement === 'left' ? ribbonLeftImage : ribbonRightImage;
};
const RibbonComponent = props => {
  const { ribbonBanner, locator, width, height } = props;
  return (
    <RibbonWrapper>
      {ribbonBanner && (
        <RibbonContainer width={width} height={height} imgPath={getImgPath(ribbonBanner)}>
          <PromoBanner promoBanner={ribbonBanner} data-locator={getLocator(locator)} />
        </RibbonContainer>
      )}
    </RibbonWrapper>
  );
};

RibbonComponent.propTypes = {
  ribbonBanner: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  locator: PropTypes.string,
};

RibbonComponent.defaultProps = {
  locator: '',
};

export default RibbonComponent;
