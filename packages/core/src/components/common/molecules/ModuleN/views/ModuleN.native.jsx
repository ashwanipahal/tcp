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
import moduleN from '../mock';

const datamoduleN = { ...moduleN };

/**
 * @param {object} props : Props for Module N multi type of banner list, button list, header text.
 * @desc This is Module N global component. It has capability to display
 * featured content module with 1 backckground color tiles ,links and a CTA Button list.
 * Author can surface teaser content leading to corresponding pages.
 */

const ModuleN = (props: Props) => {
  const { navigation } = props;
  const {
    headerText,
    promoBanner,
    stackedCTAButtons,
    divImageCTACarousel,
    scrollCTAButtons,
    linkList,
  } = datamoduleN.moduleN.composites;
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
      {divImageCTACarousel && (
        <DivImageCTAContainer>
          <ButtonList
            buttonListVariation="imageCTAList"
            navigation={navigation}
            divImageCTACarousel={divImageCTACarousel}
            locator="moduleN_cta_links"
          />
        </DivImageCTAContainer>
      )}

      {stackedCTAButtons && (
        <ContainerView>
          <ButtonList
            buttonListVariation="stackedCTAList"
            navigation={navigation}
            stackedCTAButtons={stackedCTAButtons}
            locator="moduleN_cta_links"
          />
          <Border background="red" />
        </ContainerView>
      )}

      {scrollCTAButtons && (
        <ButtonContainer>
          <ButtonList
            buttonListVariation="scrollCTAList"
            navigation={navigation}
            scrollCTAButtons={scrollCTAButtons}
            locator="moduleN_cta_links"
          />
        </ButtonContainer>
      )}
      {linkList && (
        <ButtonContainer>
          <ButtonList
            buttonListVariation="linkCTAList"
            navigation={navigation}
            linkList={linkList}
            locator="moduleN_cta_links"
          />
        </ButtonContainer>
      )}
    </Container>
  );
};

export default ModuleN;
export { ModuleN as ModuleNVanilla };
