/* eslint-disable react-native/no-color-literals */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Anchor } from '../../../atoms';
import Ribbon from '../../Ribbon';
import LinkText from '../../LinkText';
import {
  isGymboree,
  getScreenWidth,
  LAZYLOAD_HOST_NAME,
  getLocator,
} from '../../../../../utils/index.native';
import {
  ImageContainer,
  ButtonContainer,
  ModuleContainer,
  TCPOverlayTextContainer,
  GymboreeOverlayTextContainer,
  StyledImage,
} from '../ModuleS.style.native';
import config, {
  BUTTON_WIDTH,
  RIBBON_COLOR,
  RIBBON_HEIGHT,
  RIBBON_WIDTH,
  MODULE_WITH_RIBBON_HEIGHT,
  TEXT_COLOR_WHITE,
  TEXT_COLOR_GYM,
  MODULE_GYM_HEIGHT,
  MODULE_TCP_HEIGHT,
} from '../ModuleS.config';

/**
 * This function returns named transformations from config
 */
const getImageConfig = hasRibbon => {
  if (hasRibbon) {
    return config.IMG_DATA_GYM_RIBBON.crops[0];
  }

  return isGymboree() ? config.IMG_DATA_GYM.crops[0] : config.IMG_DATA_TCP.crops[0];
};

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
const getImageHeight = (hasRibbon, hasVideo = false) => {
  if (hasRibbon) {
    return MODULE_WITH_RIBBON_HEIGHT;
  }

  if (hasVideo) {
    return isGymboree() ? MODULE_GYM_HEIGHT : MODULE_TCP_HEIGHT;
  }

  return '';
};

/**
 * This method return image wrapped inside an anchor tag
 * @param {*} props
 * @param {*} hasRibbon
 */
const getLinkedImage = (props, hasRibbon) => {
  const {
    navigation,
    linkedImage: [{ image, link, video }],
  } = props;

  let hasVideo = false;
  let videoData = {};
  if (video && video.url) {
    hasVideo = true;
    videoData = {
      ...video,
      videoWidth: getImageWidth(hasRibbon),
      videoHeight: getImageHeight(hasRibbon, hasVideo),
    };
  }
  const imgData = image || {};
  if (imgData && Object.keys(imgData).length > 0) {
    return (
      <Anchor url={link.url} navigation={navigation}>
        <StyledImage
          width={getImageWidth(hasRibbon)}
          height={getImageHeight(hasRibbon)}
          url={imgData.url}
          host={LAZYLOAD_HOST_NAME.HOME}
          imgConfig={imgData.crop_m || getImageConfig(hasRibbon)}
        />
      </Anchor>
    );
  }
  return videoData && Object.keys(videoData).length > 0 ? (
    <StyledImage
      width={getImageWidth(hasRibbon)}
      height={getImageHeight(hasRibbon)}
      host={LAZYLOAD_HOST_NAME.HOME}
      videoData={videoData}
      imgConfig={imgData.crop_m || getImageConfig(hasRibbon)}
    />
  ) : null;
};

const ButtonView = props => {
  const { singleCTAButton, navigation, hasRibbon } = props;

  let fill = '';

  if (isGymboree() && !hasRibbon) {
    fill = 'transparent';
  }

  return (
    <ButtonContainer>
      <Button
        width={BUTTON_WIDTH}
        accessibilityLabel={singleCTAButton.title}
        text={singleCTAButton.text}
        testID={getLocator('moduleD_button')}
        url={singleCTAButton.url}
        navigation={navigation}
        fill={fill}
      />
    </ButtonContainer>
  );
};

const HeaderView = props => {
  const { navigation, headerText } = props;

  const color = !isGymboree() ? TEXT_COLOR_WHITE : TEXT_COLOR_GYM;

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

const RibbonBannerVariation = props => {
  const hasRibbon = true;

  return (
    <ModuleContainer>
      <HeaderView {...props} />
      <ImageContainer>{getLinkedImage(props, hasRibbon)}</ImageContainer>
      <Ribbon {...props} width={RIBBON_WIDTH} height={RIBBON_HEIGHT} color={RIBBON_COLOR} />
      <ButtonView {...props} hasRibbon />
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

RibbonBannerVariation.propTypes = ModulePropTypes;
ModuleS.propTypes = ModulePropTypes;
ButtonView.propTypes = {
  ...ModulePropTypes,
  hasRibbon: PropTypes.bool,
};
ButtonView.defaultProps = {
  hasRibbon: false,
};
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
        video: PropTypes.shape({
          url: PropTypes.string,
        }),
      })
    )
  ).isRequired,
};

export default ModuleS;
