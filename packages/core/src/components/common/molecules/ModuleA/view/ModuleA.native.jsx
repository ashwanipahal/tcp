/* eslint-disable no-shadow */
// @flow
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ButtonList from '../../ButtonList';
import Carousel from '../../Carousel';
import { Image } from '../../../atoms';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import { isGymboree, getScreenWidth } from '../../../../../utils/index.native';
import {
  Container,
  ButtonContainer,
  Border,
  ContainerView,
  DivImageCTAContainer,
  ButtonLinksContainer,
  HeaderWrapper,
  PromoRibbonWrapperLeft,
  PromoRibbonWrapperRight,
  MessageContainer,
  RibbonBannerHeight,
  RibbonBannerWidth,
  PromoBannerWrapper,
  HeaderView,
} from '../ModuleA.style.native';
import config from '../../ModuleN/ModuleN.config';

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

// TODO: keys will be changed once we get the actual data from CMS
const { ctaTypes } = config;

const ribbonView = ({ ribbonBanner, navigation, position }) => {
  let ribbonConfig = {};
  let Component;
  if (position === 'right') {
    ribbonConfig = {
      width: RibbonBannerHeight,
      height: RibbonBannerWidth,
      source: ribbonLeftImage,
    };
    Component = PromoRibbonWrapperLeft;
  } else {
    ribbonConfig = {
      width: RibbonBannerHeight,
      height: RibbonBannerWidth,
      source: ribbonRightImage,
    };
    Component = PromoRibbonWrapperRight;
  }
  return (
    <ContainerView>
      {ribbonBanner && (
        <Component>
          <Image {...ribbonConfig} />
          <MessageContainer>
            <PromoBanner
              promoBanner={ribbonBanner}
              navigation={navigation}
              locator="moduleA_promoribbonbanner_text"
            />
          </MessageContainer>
        </Component>
      )}
    </ContainerView>
  );
};

const renderView = (item, navigation, position) => {
  let PromoBannerComponent;
  let HeaderComponent;
  let HeaderConfig = {};
  const {
    item: {
      headerText,
      promoBanner,
      ribbonBanner,
      linkedImage: [{ image }],
    },
  } = item;
  if (isGymboree()) {
    PromoBannerComponent = PromoBannerWrapper;
    HeaderComponent = HeaderView;
    HeaderConfig = { color: 'white' };
  } else {
    PromoBannerComponent = ContainerView;
    HeaderComponent = ContainerView;
    HeaderConfig = { color: 'text.primary' };
  }

  return (
    <ContainerView>
      <Image
        width={MODULE_WIDTH}
        height={isGymboree() === false ? MODULE_TCP_HEIGHT : MODULE_GYM_HEIGHT}
        url={image.url}
      />
      <HeaderWrapper>
        <HeaderComponent>
          {headerText && (
            <LinkText
              {...HeaderConfig}
              type="heading"
              fontFamily="primary"
              fontSize="fs36"
              fontWeight="black"
              navigation={navigation}
              headerText={headerText}
              locator="moduleA_header_text"
              textAlign="center"
            />
          )}
        </HeaderComponent>
        <PromoBannerComponent>
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              navigation={navigation}
              locator="moduleA_promobanner_text"
            />
          )}
        </PromoBannerComponent>
      </HeaderWrapper>

      {isGymboree() === true && ribbonView({ ribbonBanner, navigation, position })}
    </ContainerView>
  );
};

const renderCarousel = (largeCompImageCarousel, navigation, position) => {
  let config = {};
  if (isGymboree()) {
    config = {
      height: MODULE_GYM_HEIGHT,
      buttonPosition: position,
    };
  } else {
    config = {
      height: MODULE_TCP_HEIGHT,
    };
  }
  return (
    <ContainerView>
      {largeCompImageCarousel && largeCompImageCarousel.length > 1 ? (
        <Carousel
          {...config}
          data={largeCompImageCarousel}
          renderItem={item => renderView(item, navigation, position)}
          width={MODULE_WIDTH}
          carouselConfig={{
            autoplay: true,
          }}
          showDots
          overlap
        />
      ) : (
        <View>{renderView({ item: largeCompImageCarousel[0] }, navigation, position)}</View>
      )}
    </ContainerView>
  );
};

/**
 * This method return the ButtonList View according to the different variation .
 *  @ctaType are four types : 'imageCTAList' ,'stackedCTAList','scrollCTAList','linkCTAList'.
 *  @naviagtion is used to navigate the page.
 */
const renderButtonList = (ctaType, navigation, ctaItems, locator, color) => {
  return (
    <ButtonList
      buttonListVariation={ctaType}
      navigation={navigation}
      buttonsData={ctaItems}
      locator={locator}
      color={color}
    />
  );
};

/**
 * @param {object} props : Props for Module A multi type of banner list, button list, header text.
 * @desc This is Module A global component. It has capability to display
 * featured content module with 1 backckground color tiles ,links and a CTA Button list.
 * Author can surface teaser content leading to corresponding pages.
 * To manage the TCP And Gymboree View .
 */

const ModuleA = (props: Props) => {
  const {
    navigation,
    largeCompImageCarousel,
    ctaItems,
    set: [set = {}],
  } = props;
  const ctaType = ctaTypes[set.val];

  return (
    <Container>
      {renderCarousel(largeCompImageCarousel, navigation, 'left')}

      {ctaType === 'imageCTAList' && (
        <DivImageCTAContainer>
          {renderButtonList(ctaType, navigation, ctaItems, 'moduleA_cta_links', 'black')}
        </DivImageCTAContainer>
      )}

      {ctaType === 'stackedCTAList' && (
        <ContainerView>
          <Border background="gray" />
          {renderButtonList(ctaType, navigation, ctaItems, 'stacked_cta_list', 'gray')}
          <Border background="gray" />
        </ContainerView>
      )}

      {ctaType === 'scrollCTAList' && (
        <ButtonContainer>
          {renderButtonList(ctaType, navigation, ctaItems, 'scroll_cta_list', 'gray')}
        </ButtonContainer>
      )}

      {ctaType === 'linkCTAList' && (
        <ButtonLinksContainer>
          {renderButtonList(ctaType, navigation, ctaItems, 'link_cta_list', 'gray')}
        </ButtonLinksContainer>
      )}
    </Container>
  );
};

ribbonView.propTypes = {
  ribbonBanner: PropTypes.shape([]).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  position: PropTypes.string.isRequired,
};
ribbonView.defaultProps = {};

export default ModuleA;
export { ModuleA as ModuleAVanilla };
