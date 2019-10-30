import React from 'react';
import PropTypes from 'prop-types';
import { getLocator, getIconPath } from '../../../../utils';
import { RibbonWrapper, RibbonContainer, RibbonPromoBanner } from './Ribbon.style';

const ribbonLeftImage = getIconPath('modules-s-left-ribbon');
const ribbonRightImage = getIconPath('modules-s-right-ribbon');

const getImgPath = ribbonBanner => {
  const [ribbonDetails] = ribbonBanner;
  return ribbonDetails.ribbonPlacement === 'left' ? ribbonLeftImage : ribbonRightImage;
};
const RibbonComponent = props => {
  const { ribbonBanner, locator, width, height } = props;
  let position = 'right';
  if (ribbonBanner) {
    const [ribbonDetails] = ribbonBanner;
    position = ribbonDetails.ribbonPlacement;
  }
  return (
    <RibbonWrapper position={position}>
      {ribbonBanner && (
        <RibbonContainer width={width} height={height} imgPath={getImgPath(ribbonBanner)}>
          <RibbonPromoBanner promoBanner={ribbonBanner} data-locator={getLocator(locator)} />
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
