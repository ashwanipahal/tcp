/* eslint-disable no-shadow */
// @flow
import React from 'react';
import ButtonList from '../../ButtonList';
import { Image } from '../../../atoms';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import { getScreenWidth } from '../../../../../utils/index.native';

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
import config from '../ModuleB.config';
import mock from '../../../../../services/abstractors/common/moduleB/mock';

/**
 * Module height and width.
 * Height is fixed for mobile : TCP & Gymb
 * Width can vary as per device width.
 */
const MODULE_HEIGHT_WITHOUT_OVERLAY = 295;
const MODULE_HEIGHT_WITH_OVERLAY = 413;
const MARGIN = 12;
const MODULE_WIDTH = getScreenWidth() - MARGIN * 2;

// TODO: keys will be changed once we get the actual data from CMS
const { ctaTypes, bannerPositionTypes } = config;

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
      linkedImage: [{ image }],
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
      <Image width={MODULE_WIDTH} height={moduleHeight} url={image.url} />
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
 * @function findKeyInSet
 * finds and returns value of key from set
 *
 * @param {*} set
 * @param {*} key
 * @returns
 */
const findKeyInSet = (set, key) => {
  const variationSet = set.filter(s => s.key === key);
  return variationSet && variationSet.length > 0 && variationSet[0].val;
};

/**
 * @param {object} props : Props for Module B multi type of banner list, button list, header text.
 * @desc This is Module B global component. It has capability to display
 * featured content module with 1 background color tiles ,links and a CTA Button list.
 */

const ModuleB = (props: Props) => {
  // TODO: All items need to be derived from props once cms integration is done
  const {
    set = [],
    composites: { ctaItems, largeCompImage },
  } = mock.moduleB;

  const { navigation } = props;

  const ctaType = ctaTypes[findKeyInSet(set, 'ctaType')];
  const bannerPosition = findKeyInSet(set, 'bannerPostition');
  return (
    <Container>
      {renderImageComponent({ item: largeCompImage[0], bannerPosition }, navigation)}

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
  );
};

export default ModuleB;
export { ModuleB as ModuleBVanilla };
