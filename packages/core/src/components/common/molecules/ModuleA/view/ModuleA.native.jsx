// @flow
import React from 'react';
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
} from '../ModuleA.style.native';
import config from '../../ModuleN/ModuleN.config';
import { getScreenWidth } from '../../../../../utils/utils.app';

/**
 * Module height and width.
 * Height is fixed for mobile : TCP & Gymb
 * Width can vary as per device width.
 */
const MODULE_TCP_HEIGHT = 200;
const MODULE_WIDTH = getScreenWidth();

// TODO: keys will be changed once we get the actual data from CMS
const { ctaTypes } = config;

const renderView = (item, navigation) => {
  const {
    item: {
      headerText,
      promoBanner,
      linkedImage: [{ image }],
    },
  } = item;
  return (
    <ContainerView>
      <Image width={MODULE_WIDTH} height="311px" url={image.url} />
      <HeaderWrapper>
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
          />
        )}

        <ContainerView>
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              navigation={navigation}
              locator="moduleA_promobanner_text"
            />
          )}
        </ContainerView>
      </HeaderWrapper>
    </ContainerView>
  );
};

const renderCarousel = (largeCompImageCarousel, navigation) => {
  return (
    <ContainerView>
      <Carousel
        data={largeCompImageCarousel}
        renderItem={item => renderView(item, navigation)}
        height={MODULE_TCP_HEIGHT}
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
      {renderCarousel(largeCompImageCarousel, navigation)}

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

export default ModuleA;
export { ModuleA as ModuleAVanilla };
