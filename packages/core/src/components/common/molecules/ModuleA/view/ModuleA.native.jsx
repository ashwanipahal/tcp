// @flow
import React from 'react';
import ModuleATcpCarousel from '../../ModuleATcpCarousel';
import ModuleAGymCarousel from '../../ModuleAGymCarousel';
import ButtonList from '../../ButtonList';
import {
  Container,
  ButtonContainer,
  Border,
  ContainerView,
  DivImageCTAContainer,
  ButtonLinksContainer,
} from '../ModuleA.style.native';
import config from '../../ModuleN/ModuleN.config';

// TODO: keys will be changed once we get the actual data from CMS
const { ctaTypes } = config;

const variant = 'tcp';

/**
 * This method return the ButtonList View according to the different variation .
 *  @ctaType are four types : 'imageCTAList' ,'stackedCTAList','scrollCTAList','linkCTAList'.
 *  @naviagtion is used to navigate the page.
 */
const renderView = (ctaType, navigation, ctaItems, locator, color) => {
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
      {variant === 'tcp' ? (
        <ModuleATcpCarousel
          navigation={navigation}
          largeCompImageCarousel={largeCompImageCarousel}
        />
      ) : (
        <ModuleAGymCarousel
          navigation={navigation}
          largeCompImageCarousel={largeCompImageCarousel}
        />
      )}

      {ctaType === 'imageCTAList' && (
        <DivImageCTAContainer>
          {renderView(ctaType, navigation, ctaItems, 'moduleA_cta_links', 'black')}
        </DivImageCTAContainer>
      )}

      {ctaType === 'stackedCTAList' && (
        <ContainerView>
          {renderView(ctaType, navigation, ctaItems, 'stacked_cta_list', 'gray')}
          <Border background="gray" />
        </ContainerView>
      )}

      {ctaType === 'scrollCTAList' && (
        <ButtonContainer>
          {renderView(ctaType, navigation, ctaItems, 'scroll_cta_list', 'gray')}
        </ButtonContainer>
      )}

      {ctaType === 'linkCTAList' && (
        <ButtonLinksContainer>
          {renderView(ctaType, navigation, ctaItems, 'link_cta_list', 'gray')}
        </ButtonLinksContainer>
      )}
    </Container>
  );
};

export default ModuleA;
export { ModuleA as ModuleAVanilla };
