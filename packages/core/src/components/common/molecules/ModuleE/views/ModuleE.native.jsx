/* eslint-disable no-shadow */
// @flow
import React from 'react';
import { View } from 'react-native';
import ButtonList from '../../ButtonList';
import Carousel from '../../Carousel';
import { DamImage } from '../../../atoms';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import { isGymboree, getScreenWidth, LAZYLOAD_HOST_NAME } from '../../../../../utils/index.native';
import {
  Container,
  ButtonContainer,
  Border,
  ContainerView,
  DivImageCTAContainer,
  ButtonLinksContainer,
  HeaderWrapper,
  PromoBannerWrapper,
  HeaderView,
} from '../styles/ModuleE.style.native';
import config from '../config';

/**
 * Module height and width.
 * Height is fixed for mobile : TCP & Gymb
 * Width can vary as per device width.
 */

const MODULE_TCP_HEIGHT = 300;
const MODULE_GYM_HEIGHT = 500;
const MODULE_WIDTH = getScreenWidth();

// TODO: keys will be changed once we get the actual data from CMS
const { ctaTypes, IMG_DATA_TCP, IMG_DATA_GYM } = config;

const renderView = (item, navigation) => {
  let PromoBannerComponent;
  let HeaderComponent;
  let HeaderConfig = {};
  const {
    item: {
      headerText,
      promoBanner,
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
      <DamImage
        width={MODULE_WIDTH}
        height={MODULE_TCP_HEIGHT}
        url={image.url}
        host={LAZYLOAD_HOST_NAME.HOME}
        crop={image.crop_m}
        imgConfig={isGymboree() ? IMG_DATA_GYM.crops[0] : IMG_DATA_TCP.crops[0]}
      />
      <HeaderWrapper>
        <HeaderComponent>
          {headerText && (
            <LinkText
              {...HeaderConfig}
              type="heading"
              fontFamily="primary"
              fontSize="fs32"
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
          renderItem={item => renderView(item, navigation)}
          width={MODULE_WIDTH}
          carouselConfig={{
            autoplay: true,
          }}
          showDots
          overlap
        />
      ) : (
        <View>{renderView({ item: largeCompImageCarousel[0] }, navigation)}</View>
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

const ModuleE = (props: Props) => {
  const { navigation, largeCompImageCarousel, ctaItems, ctaType } = props;
  const ctaTypeValue = ctaTypes[ctaType];

  return (
    <Container>
      {renderCarousel(largeCompImageCarousel, navigation, 'left')}

      {ctaTypeValue === ctaTypes.divImageCTACarouse && (
        <DivImageCTAContainer>
          {renderButtonList(ctaTypeValue, navigation, ctaItems, 'moduleA_cta_links', 'black')}
        </DivImageCTAContainer>
      )}

      {ctaTypeValue === ctaTypes.stackedCTAButtons && (
        <ContainerView>
          <Border background="gray" />
          {renderButtonList(ctaTypeValue, navigation, ctaItems, 'stacked_cta_list', 'fixed-width')}
          <Border background="gray" />
        </ContainerView>
      )}

      {ctaTypeValue === ctaTypes.CTAButtonCarousel && (
        <ButtonContainer>
          {renderButtonList(ctaTypeValue, navigation, ctaItems, 'scroll_cta_list', 'gray')}
        </ButtonContainer>
      )}

      {ctaTypeValue === ctaTypes.linkList && (
        <ButtonLinksContainer>
          {renderButtonList(ctaTypeValue, navigation, ctaItems, 'link_cta_list', 'gray')}
        </ButtonLinksContainer>
      )}
    </Container>
  );
};

export default ModuleE;
export { ModuleE as ModuleEVanilla };
