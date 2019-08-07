// @flow
import React from 'react';
import LinkText from '../../LinkText';
import PromoTextBanner from '../../PromoTextBanner';
import ButtonList from '../../ButtonList/views/ButtonList.native';
import { Container, PromoTextBannerWrapper, ButtonContainer } from '../ModuleN.styles.native';
import moduleN from '../mock';
import { Anchor } from '../../../atoms';

const datamoduleN = { ...moduleN };

/**
 * @param {object} props : Props for Module N multi list banner.
 * @desc This is Module N global component. It has capability to display
 * featured content module with 1 backckground color tiles ,links and a CTA Button list.
 * Author can surface teaser content leading to corresponding pages.
 */

const ModuleN = (props: Props) => {
  const { navigation } = props;
  const {
    headerText,
    promoTextBanner,
    stackedCTAButtons,
    divImageCTACarousel,
    linkList,
  } = datamoduleN.moduleN.composites;
  return (
    <Container background="red">
      <Anchor>
        <LinkText
          type="heading"
          fontFamily="primary"
          fontSize="fs20"
          letterSpacing="ls271"
          textAlign="center"
          color="white"
          textItems={headerText[0].textItems}
        />
      </Anchor>
      <PromoTextBannerWrapper>
        <PromoTextBanner promoTextBanner={promoTextBanner} />
      </PromoTextBannerWrapper>

      <ButtonList
        buttonListVariation="stackedCTAList"
        navigation={navigation}
        stackedCTAButtons={stackedCTAButtons}
      />

      <ButtonList
        buttonListVariation="imageCTAList"
        navigation={navigation}
        divImageCTACarousel={divImageCTACarousel}
      />

      <ButtonContainer>
        <ButtonList
          buttonListVariation="scrollCTAList"
          navigation={navigation}
          stackedCTAButtons={stackedCTAButtons}
        />
      </ButtonContainer>
      <ButtonContainer>
        <ButtonList buttonListVariation="linkCTAList" navigation={navigation} linkList={linkList} />
      </ButtonContainer>
    </Container>
  );
};

export default ModuleN;
export { ModuleN as ModuleNVanilla };
