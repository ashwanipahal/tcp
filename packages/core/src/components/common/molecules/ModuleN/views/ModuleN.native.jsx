// @flow
import React from 'react';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import ButtonList from '../../ButtonList/views/ButtonList.native';
import {
  Container,
  PromoTextBannerWrapper,
  ButtonContainer,
  Border,
  ContainerView,
  DivImageCTAContainer,
} from '../ModuleN.styles.native';
import config from '../ModuleN.config';

/**
 * @param {object} props : Props for Module N multi type of banner list, button list, header text.
 * @desc This is Module N global component. It has capability to display
 * featured content module with 1 background color tiles ,links and a CTA Button list.
 * Author can surface teaser content leading to corresponding pages.
 */

// TODO: keys will be changed once we get the actual data from CMS

const { ctaTypes } = config;

const ModuleN = (props: Props) => {
  const {
    ctaItems,
    headerText,
    navigation,
    promoBanner,
    set: [set = {}],
  } = props;

  const ctaType = ctaTypes[set.val];

  return (
    <Container background="red">
      {headerText && (
        <LinkText
          type="heading"
          fontFamily="primary"
          fontSize="fs20"
          letterSpacing="ls271"
          textAlign="center"
          color="white"
          navigation={navigation}
          headerText={headerText}
          locator="moduleN_header_text"
        />
      )}
      <PromoTextBannerWrapper>
        {promoBanner && (
          <PromoBanner
            promoBanner={promoBanner}
            navigation={navigation}
            locator="moduleN_promobanner_text"
          />
        )}
      </PromoTextBannerWrapper>

      {ctaType === 'imageCTAList' && (
        <DivImageCTAContainer>
          <ButtonList
            buttonListVariation={ctaType}
            navigation={navigation}
            buttonsData={ctaItems}
            locator="moduleN_cta_links"
          />
        </DivImageCTAContainer>
      )}

      {ctaType === 'stackedCTAList' && (
        <ContainerView>
          <ButtonList
            buttonListVariation={ctaType}
            navigation={navigation}
            buttonsData={ctaItems}
            locator="moduleN_cta_links"
          />
          <Border background="red" />
        </ContainerView>
      )}

      {ctaType === 'scrollCTAList' && (
        <ButtonContainer>
          <ButtonList
            buttonListVariation={ctaType}
            navigation={navigation}
            buttonsData={ctaItems}
            locator="moduleN_cta_links"
          />
        </ButtonContainer>
      )}
      {ctaType === 'linkCTAList' && (
        <ButtonContainer>
          <ButtonList
            buttonListVariation={ctaType}
            navigation={navigation}
            buttonsData={ctaItems}
            locator="moduleN_cta_links"
          />
        </ButtonContainer>
      )}
    </Container>
  );
};

export default ModuleN;
export { ModuleN as ModuleNVanilla };
