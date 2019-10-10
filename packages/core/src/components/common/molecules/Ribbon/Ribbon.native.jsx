import React from 'react';
import PropTypes from 'prop-types';
import PromoBanner from '../PromoBanner';
import { Image } from '../../atoms';
import { RibbonContainer, PromoTextContainer } from './Ribbon.style.native';

const ribbonLeftImage = require('../../../../assets/module-a-ribbon-left.png');
const ribbonRightImage = require('../../../../assets/module-a-ribbon-right.png');

const RibbonComponent = ({ ribbonBanner, navigation, width, height, color }) => {
  let ribbonConfig = {
    width,
    height,
    source: ribbonLeftImage,
  };
  if (ribbonBanner && ribbonBanner[0].ribbonPlacement === 'right') {
    ribbonConfig = {
      ...ribbonConfig,
      source: ribbonRightImage,
    };
  }
  return (
    <RibbonContainer position={ribbonBanner && ribbonBanner[0].ribbonPlacement}>
      {ribbonBanner && (
        <React.Fragment>
          <Image
            {...ribbonConfig}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              tintColor: color,
            }}
          />
          <PromoTextContainer position={ribbonBanner[0].ribbonPlacement}>
            <PromoBanner
              promoBanner={ribbonBanner}
              navigation={navigation}
              locator="moduleS_promoribbonbanner_text"
              color="white"
              fontFamily="secondary"
              fontWeight="black"
            />
          </PromoTextContainer>
        </React.Fragment>
      )}
    </RibbonContainer>
  );
};

RibbonComponent.propTypes = {
  ribbonBanner: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string,
};

RibbonComponent.defaultProps = {
  color: '',
};

export default RibbonComponent;
