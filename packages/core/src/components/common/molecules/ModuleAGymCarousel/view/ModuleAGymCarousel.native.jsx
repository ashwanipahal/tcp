// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../../Carousel';
import { getScreenWidth } from '../../../../../utils/utils.app';
import { Image } from '../../../atoms';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import {
  Container,
  PromoTextBannerWrapper,
  HeaderWrapper,
  ContainerView,
  HeaderView,
  PromoRibbonWrapperRight,
  PromoRibbonWrapperLeft,
  MessageContainer,
} from '../ModuleAGymCarousel.style.native';

const MODULE_HEIGHT = 500;
const MODULE_WIDTH = getScreenWidth();

const ribbonLeftImage = require('../../../../../assets/module-a-ribbon-left.png');
const ribbonRightImage = require('../../../../../assets/module-a-ribbon-right.png');

const position = 'left';

const ribbonView = ({ ribbonBanner, navigation }) => {
  return (
    <ContainerView>
      {position === 'right' ? (
        <PromoRibbonWrapperLeft>
          <Image width="200px" height="54px" source={ribbonLeftImage} />
          <MessageContainer>
            <PromoBanner
              promoBanner={ribbonBanner}
              navigation={navigation}
              locator="moduleA_promoribbonbanner_text"
            />
          </MessageContainer>
        </PromoRibbonWrapperLeft>
      ) : (
        <PromoRibbonWrapperRight>
          <Image width="200px" height="54px" source={ribbonRightImage} />
          <MessageContainer>
            <PromoBanner
              promoBanner={ribbonBanner}
              navigation={navigation}
              locator="moduleA_promoribbonbanner_text"
            />
          </MessageContainer>
        </PromoRibbonWrapperRight>
      )}
    </ContainerView>
  );
};

const renderView = (item, navigation) => {
  const {
    item: {
      headerText,
      promoBanner,
      ribbonBanner,
      linkedImage: [{ image }],
    },
  } = item;
  return (
    <ContainerView>
      <Image width={MODULE_WIDTH} height="500px" url={image.url} />
      <HeaderWrapper>
        {headerText && (
          <HeaderView>
            <LinkText
              type="heading"
              color="white"
              fontFamily="primary"
              fontSize="fs36"
              fontWeight="black"
              navigation={navigation}
              headerText={headerText}
              locator="moduleA_header_text"
              textAlign="center"
            />
          </HeaderView>
        )}
        <PromoTextBannerWrapper>
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              navigation={navigation}
              locator="moduleA_promobanner_text"
            />
          )}
        </PromoTextBannerWrapper>
      </HeaderWrapper>
      {ribbonView({ ribbonBanner, navigation })}
    </ContainerView>
  );
};

const ModuleAGymCarousel = (props: Props) => {
  const { largeCompImageCarousel, navigation } = props;

  return (
    <Container>
      <Carousel
        buttonPosition={position}
        data={largeCompImageCarousel}
        renderItem={item => renderView(item, navigation)}
        height={MODULE_HEIGHT}
        width={MODULE_WIDTH}
        carouselConfig={{
          autoplay: true,
        }}
        showDots
        overlap
      />
    </Container>
  );
};
ribbonView.propTypes = {
  ribbonBanner: PropTypes.shape([]).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

ribbonView.defaultProps = {};

export default ModuleAGymCarousel;
export { ModuleAGymCarousel as ModuleAGymCarouselVanilla };
