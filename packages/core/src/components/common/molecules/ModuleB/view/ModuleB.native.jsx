/* eslint-disable no-shadow */
// @flow
import React from 'react';
import ButtonList from '../../ButtonList';
import { DamImage, Anchor } from '../../../atoms';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import { getScreenWidth, LAZYLOAD_HOST_NAME } from '../../../../../utils/index.native';

import {
  Container,
  ButtonContainer,
  Border,
  ContainerView,
  DivImageCTAContainer,
  HeaderWrapper,
  SeparatorView,
  MainContainerView,
} from '../ModuleB.style.native';
import { ctaTypes, bannerPositionTypes, IMG_DATA } from '../config';

/**
 * Module height and width.
 * Height is fixed for mobile : TCP & Gymb
 * Width can vary as per device width.
 */
const MODULE_HEIGHT_WITHOUT_OVERLAY = 295;
const MODULE_HEIGHT_WITH_OVERLAY = 413;
const MARGIN = 12;
const MODULE_WIDTH = getScreenWidth() - MARGIN * 2;

/**
 * @function renderHeaderAndBanner
 * renders header component with link text and promobanner
 *
 * @param {*} item
 * @param {*} navigation
 * @returns
 */
const renderHeaderAndBanner = (item, navigation) => {
  const {
    item: { headerText, promoBanner },
    bannerPosition,
  } = item;

  return (
    <HeaderWrapper bannerPosition={bannerPosition}>
      {headerText && bannerPosition === bannerPositionTypes.overlay && (
        <ContainerView>
          <LinkText
            type="heading"
            fontFamily="primary"
            fontSize="fs12"
            fontWeight="regular"
            navigation={navigation}
            headerText={headerText}
            locator="moduleB_header_text"
            textAlign="center"
            renderComponentInNewLine
            useStyle
          />
          <SeparatorView />
        </ContainerView>
      )}
      <ContainerView>
        {promoBanner && (
          <PromoBanner
            promoBanner={promoBanner}
            navigation={navigation}
            bannerPosition={bannerPosition}
            locator="moduleB_promobanner_text"
          />
        )}
      </ContainerView>
    </HeaderWrapper>
  );
};

/**
 * @function renderImageComponent
 * renders image component with header and banner
 * handles bannerPosition - top/bottom/overlay
 * display header and banner as overlay over image if bannerPosition is overlay
 *
 * @param {*} item
 * @param {*} navigation
 * @returns
 */
const renderImageComponent = (item, navigation) => {
  const {
    item: {
      linkedImage: [{ image, link }],
    },
    bannerPosition,
  } = item;

  // set module height as same as screen width to make it a square for bannerPosition as overlay
  const moduleHeight =
    bannerPosition === bannerPositionTypes.overlay
      ? MODULE_HEIGHT_WITH_OVERLAY
      : MODULE_HEIGHT_WITHOUT_OVERLAY;
  return (
    <MainContainerView>
      {bannerPosition === bannerPositionTypes.top || bannerPosition === bannerPositionTypes.overlay
        ? renderHeaderAndBanner(item, navigation)
        : null}
      <Anchor url={link.url} navigation={navigation}>
        <DamImage
          width={MODULE_WIDTH}
          height={moduleHeight}
          url={image.url}
          host={LAZYLOAD_HOST_NAME.HOME}
          alt={image.alt}
          crop={image.crop_m}
          imgConfig={
            bannerPosition === bannerPositionTypes.overlay
              ? IMG_DATA.imgOverlayConfig[0]
              : IMG_DATA.imgDefaultConfig[0]
          }
        />
      </Anchor>
      {bannerPosition === bannerPositionTypes.bottom
        ? renderHeaderAndBanner(item, navigation)
        : null}
    </MainContainerView>
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
 * @param {object} props : Props for Module B multi type of banner list, button list, header text.
 * @desc This is Module B global component. It has capability to display
 * featured content module with 1 background color tiles ,links and a CTA Button list.
 */

const ModuleB = (props: Props) => {
  // TODO: All items need to be derived from props once cms integration is done
  const { ctaItems, largeCompImage, ctaType: ctaItemsType, bannerPosition, navigation } = props;

  const ctaType = ctaTypes[ctaItemsType];

  let bannerPositionInterpreted = bannerPosition;
  if (bannerPosition === 'topAlt') {
    bannerPositionInterpreted = 'top';
  }

  return largeCompImage ? (
    <Container>
      {renderImageComponent(
        { item: largeCompImage[0], bannerPosition: bannerPositionInterpreted },
        navigation
      )}

      {ctaType === 'imageCTAList' && (
        <DivImageCTAContainer>
          {renderButtonList(ctaType, navigation, ctaItems, 'moduleB_cta_links', 'black')}
        </DivImageCTAContainer>
      )}

      {ctaType === 'stackedCTAList' && (
        <ContainerView>
          <Border background="gray" />
          {renderButtonList(ctaType, navigation, ctaItems, 'stacked_cta_list', 'fixed-width')}
          <Border background="gray" />
        </ContainerView>
      )}

      {ctaType === 'scrollCTAList' && (
        <ButtonContainer>
          {renderButtonList(ctaType, navigation, ctaItems, 'scroll_cta_list', 'gray')}
        </ButtonContainer>
      )}
    </Container>
  ) : (
    <Container />
  );
};

export default ModuleB;
export { ModuleB as ModuleBVanilla };
