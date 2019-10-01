/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { DamImage, Image } from '../../../atoms';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';
import { isGymboree, getScreenWidth, LAZYLOAD_HOST_NAME } from '../../../../../utils/index.native';

/**
 * Module height and width.
 * Height is fixed for mobile : TCP & Gymb
 * Width can vary as per device width.
 */
const MODULE_TCP_HEIGHT = 300;
const MODULE_GYM_HEIGHT = 500;
const MODULE_WIDTH = getScreenWidth();

const ribbonLeftImage = require('../../../../../assets/module-a-ribbon-left.png');
const ribbonRightImage = require('../../../../../assets/module-a-ribbon-right.png');

const RibbonView = ({ ribbonBanner, navigation, position }) => {
  let ribbonConfig = {
    width: '200px',
    height: '54px',
    source: ribbonLeftImage,
  };
  if (position === 'right') {
    ribbonConfig = {
      ...ribbonConfig,
      source: ribbonRightImage,
    };
  }
  return (
    <View>
      {ribbonBanner && (
        <React.Fragment>
          <Image {...ribbonConfig} style={{ tintColor: 'red' }} />
          <PromoBanner
            promoBanner={ribbonBanner}
            navigation={navigation}
            locator="moduleS_promoribbonbanner_text"
          />
        </React.Fragment>
      )}
    </View>
  );
};

const ModuleS = props => {
  const {
    headerText,
    navigation,
    linkedImage: [{ image }],
  } = props;
  return (
    <View>
      <DamImage
        width={MODULE_WIDTH}
        height={isGymboree() ? MODULE_GYM_HEIGHT : MODULE_TCP_HEIGHT}
        url={image.url}
        host={LAZYLOAD_HOST_NAME.HOME}
        crop={image.crop_m}
        // imgConfig={isGymboree() ? IMG_DATA_GYM.crops[0] : IMG_DATA_TCP.crops[0]}
      />
      {headerText && (
        <LinkText
          type="heading"
          fontFamily="primary"
          fontSize="fs36"
          fontWeight="black"
          navigation={navigation}
          headerText={headerText}
          locator="moduleS_header_text"
          textAlign="center"
        />
      )}
      <RibbonView {...props} />
    </View>
  );
};

RibbonView.propTypes = {
  ribbonBanner: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  position: PropTypes.string.isRequired,
};

ModuleS.propTypes = {
  headerText: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  linkedImage: PropTypes.arrayOf(
    PropTypes.oneOfType(
      PropTypes.shape({
        image: PropTypes.shape({
          url: PropTypes.string,
          alt: PropTypes.string,
          title: PropTypes.string,
          crop_m: PropTypes.string,
        }),
        link: PropTypes.shape({
          url: PropTypes.string,
          text: PropTypes.string,
          title: PropTypes.string,
          target: PropTypes.string,
        }),
      })
    )
  ).isRequired,
};

export default ModuleS;
