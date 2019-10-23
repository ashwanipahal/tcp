import React from 'react';
import PropTypes from 'prop-types';
import PromoBanner from '../PromoBanner';
import { getLocator, getIconPath } from '../../../../utils';
import { RibbonWrapper, RibbonContainer } from './Ribbon.style';

const ribbonLeftImage = getIconPath('modules-s-left-ribbon');
const ribbonRightImage = getIconPath('modules-s-right-ribbon');

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
          <PromoBanner
            promoBanner={ribbonBanner}
            data-locator={getLocator(locator)}
            color="white"
            fontFamily="secondary"
            fontWeight="black"
          />
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
