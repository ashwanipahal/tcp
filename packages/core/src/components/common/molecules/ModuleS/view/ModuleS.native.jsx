/* eslint-disable react-native/no-color-literals */
import React from 'react';
import PropTypes from 'prop-types';
import { DamImage, Image, Button, Anchor } from '../../../atoms';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';
import {
  isGymboree,
  getScreenWidth,
  LAZYLOAD_HOST_NAME,
  getLocator,
} from '../../../../../utils/index.native';
import {
  RibbonContainer,
  PromoBannerContainer,
  ImageContainer,
  ButtonContainer,
  ModuleContainer,
  TCPOverlayTextContainer,
  GymboreeOverlayTextContainer,
} from '../ModuleS.style.native';

/**
 * This method returns Image width for the module
 * @param {*} hasRibbon
 */
const getImageWidth = hasRibbon => {
  const MODULE_WIDTH = getScreenWidth();
  return hasRibbon ? MODULE_WIDTH - 28 : MODULE_WIDTH;
};

/**
 * Module height and width.
 * Height is fixed for mobile : TCP & Gymb
 * Width can vary as per device width.
 */
const getImageHeight = hasRibbon => {
  const MODULE_TCP_HEIGHT = 356;
  const MODULE_WITH_RIBBON_HEIGHT = 273;
  const MODULE_GYM_HEIGHT = 420;

  if (hasRibbon) {
    return MODULE_WITH_RIBBON_HEIGHT;
  }

  return isGymboree() ? MODULE_GYM_HEIGHT : MODULE_TCP_HEIGHT;
};

/**
 * This method return image wrapped inside an anchor tag
 * @param {*} props
 * @param {*} hasRibbon
 */
const getLinkedImage = (props, hasRibbon) => {
  const {
    navigation,
    linkedImage: [{ image, link }],
  } = props;
  return link ? (
    <Anchor url={link.url} navigation={navigation}>
      <DamImage
        width={getImageWidth(hasRibbon)}
        height={getImageHeight(hasRibbon)}
        url={image.url}
        host={LAZYLOAD_HOST_NAME.HOME}
        // crop={image.crop_m}
        // imgConfig={isGymboree() ? IMG_DATA_GYM.crops[0] : IMG_DATA_TCP.crops[0]}
      />
    </Anchor>
  ) : (
    <DamImage
      width={getImageWidth(hasRibbon)}
      height={getImageHeight(hasRibbon)}
      url={image.url}
      host={LAZYLOAD_HOST_NAME.HOME}
      // crop={image.crop_m}
      // imgConfig={isGymboree() ? IMG_DATA_GYM.crops[0] : IMG_DATA_TCP.crops[0]}
    />
  );
};

const ButtonView = props => {
  const { singleCTAButton, navigation } = props;
  return (
    <ButtonContainer>
      <Button
        width="225px"
        accessibilityLabel={singleCTAButton.title}
        buttonVariation="variable-width"
        text={singleCTAButton.text}
        testID={getLocator('moduleD_button')}
        url={singleCTAButton.url}
        navigation={navigation}
      />
    </ButtonContainer>
  );
};

const HeaderView = props => {
  const { navigation, headerText } = props;

  const color = !isGymboree() ? 'white' : '';

  return (
    headerText && (
      <LinkText
        type="heading"
        fontFamily="primary"
        fontWeight="black"
        navigation={navigation}
        headerText={headerText}
        locator="moduleS_header_text"
        textAlign="center"
        renderComponentInNewLine
        useStyle
        color={color}
      />
    )
  );
};

const ribbonLeftImage = require('../../../../../assets/module-a-ribbon-left.png');
const ribbonRightImage = require('../../../../../assets/module-a-ribbon-right.png');

const RibbonView = ({ ribbonBanner, navigation }) => {
  let ribbonConfig = {
    width: '250px',
    height: '71px',
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
              tintColor: '#c9182e',
            }}
          />
          <PromoBannerContainer position={ribbonBanner[0].ribbonPlacement}>
            <PromoBanner
              promoBanner={ribbonBanner}
              navigation={navigation}
              locator="moduleS_promoribbonbanner_text"
              color="white"
              fontFamily="secondary"
              fontWeight="black"
            />
          </PromoBannerContainer>
        </React.Fragment>
      )}
    </RibbonContainer>
  );
};

const RibbonBannerVariation = props => {
  const hasRibbon = true;

  return (
    <ModuleContainer>
      <HeaderView {...props} />
      <ImageContainer>{getLinkedImage(props, hasRibbon)}</ImageContainer>
      <RibbonView {...props} />
      <ButtonView {...props} />
    </ModuleContainer>
  );
};

const ModuleS = props => {
  const { ribbonBanner } = props;

  if (ribbonBanner) {
    return <RibbonBannerVariation {...props} />;
  }

  const OverlayTextContainer = isGymboree()
    ? GymboreeOverlayTextContainer
    : TCPOverlayTextContainer;

  return (
    <ModuleContainer>
      {getLinkedImage(props)}
      <OverlayTextContainer>
        <HeaderView {...props} />
        <ButtonView {...props} />
      </OverlayTextContainer>
    </ModuleContainer>
  );
};

const ModulePropTypes = {
  headerText: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  ribbonBanner: PropTypes.shape({}).isRequired,
  singleCTAButton: PropTypes.shape({}).isRequired,
};

RibbonView.propTypes = {
  ...ModulePropTypes,
  ribbonPlacement: PropTypes.string.isRequired,
};
RibbonBannerVariation.propTypes = ModulePropTypes;
ModuleS.propTypes = ModulePropTypes;
ButtonView.propTypes = ModulePropTypes;
HeaderView.propTypes = ModulePropTypes;
getLinkedImage.propTypes = {
  ...ModulePropTypes,
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
