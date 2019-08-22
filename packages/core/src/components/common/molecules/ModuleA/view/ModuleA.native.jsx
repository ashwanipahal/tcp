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

/**
 * @param {object} props : Props for Module A multi type of banner list, button list, header text.
 * @desc This is Module A global component. It has capability to display
 * featured content module with 1 backckground color tiles ,links and a CTA Button list.
 * Author can surface teaser content leading to corresponding pages.
 */

// TODO: keys will be changed once we get the actual data from CMS

// const { ctaTypes } = config;
const variant = 'tcp';

const ModuleA = (props: Props) => {
  const { navigation, largeCompImageCarousel, ctaItems } = props;
  const ctaType = 'imageCTAList';

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
          <ButtonList
            buttonListVariation={ctaType}
            navigation={navigation}
            buttonsData={ctaItems}
            locator="moduleA_cta_links"
            color="black"
          />
        </DivImageCTAContainer>
      )}

      {ctaType === 'stackedCTAList' && (
        <ContainerView>
          <ButtonList
            buttonListVariation={ctaType}
            navigation={navigation}
            buttonsData={ctaItems}
            locator="moduleA_cta_links"
            color="text"
          />
          <Border background="text" />
        </ContainerView>
      )}

      {ctaType === 'scrollCTAList' && (
        <ButtonContainer>
          <ButtonList
            buttonListVariation={ctaType}
            navigation={navigation}
            buttonsData={ctaItems}
            locator="moduleA_cta_links"
            color="text"
          />
        </ButtonContainer>
      )}
      {ctaType === 'linkCTAList' && (
        <ButtonLinksContainer>
          <ButtonList
            buttonListVariation={ctaType}
            navigation={navigation}
            buttonsData={ctaItems}
            locator="moduleA_cta_links"
          />
        </ButtonLinksContainer>
      )}
    </Container>
  );
};

export default ModuleA;
export { ModuleA as ModuleAVanilla };
