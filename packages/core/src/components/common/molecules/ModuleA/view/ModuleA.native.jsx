/* eslint-disable no-shadow */
// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ButtonList from '../../ButtonList';
import Carousel from '../../Carousel';
import { Image } from '../../../atoms';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
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
import { getScreenWidth } from '../../../../../utils/utils.app';

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
    </ContainerView>
  );
};

const renderView = (item, navigation, varient, position) => {
  let PromoBannerComponent;
  let HeaderComponent;
  const {
    item: {
      headerText,
      promoBanner,
      ribbonBanner,
      linkedImage: [{ image }],
    },
  } = item;
  if (varient === 'tcp') {
    PromoBannerComponent = ContainerView;
    HeaderComponent = ContainerView;
  } else {
    PromoBannerComponent = PromoBannerWrapper;
    HeaderComponent = HeaderView;
  }

  return (
    <ContainerView>
      <Image
        width={MODULE_WIDTH}
        height={varient === 'tcp' ? MODULE_TCP_HEIGHT : MODULE_GYM_HEIGHT}
        url={image.url}
      />
      <HeaderWrapper>
        <HeaderComponent>
          {headerText && (
            <LinkText
              type="heading"
              color="text.primary"
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

      {varient === 'gym' && ribbonView({ ribbonBanner, navigation, position })}
    </ContainerView>
  );
};

const renderCarousel = (largeCompImageCarousel, navigation, varient, position) => {
  let config = {};
  if (varient === 'tcp') {
    config = {
      height: MODULE_TCP_HEIGHT,
    };
  } else {
    config = {
      height: MODULE_GYM_HEIGHT,
      buttonPosition: position,
    };
  }
  return (
    <ContainerView>
      <Carousel
        {...config}
        data={largeCompImageCarousel}
        renderItem={item => renderView(item, navigation, varient, position)}
        width={MODULE_WIDTH}
        carouselConfig={{
          autoplay: true,
        }}
        showDots
        overlap
      />
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
      {renderCarousel(largeCompImageCarousel, navigation, 'gym', 'left')}

      {ctaType === 'imageCTAList' && (
        <DivImageCTAContainer>
          {renderButtonList(ctaType, navigation, ctaItems, 'moduleA_cta_links', 'black')}
        </DivImageCTAContainer>
      )}

      {ctaType === 'stackedCTAList' && (
        <ContainerView>
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

renderCarousel.propTypes = {
  config: PropTypes.shape({}).isRequired,
};
renderCarousel.defaultProps = {};

ribbonView.propTypes = {
  ribbonBanner: PropTypes.shape([]).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  position: PropTypes.string.isRequired,
};
ribbonView.defaultProps = {};

export default ModuleA;
export { ModuleA as ModuleAVanilla };
