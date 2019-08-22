// @flow
import React from 'react';
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
} from '../ModuleATcpCarousel.native';

const MODULE_HEIGHT = 200;
const MODULE_WIDTH = getScreenWidth();

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

        <PromoTextBannerWrapper>
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              navigation={navigation}
              locator="moduleN_promobanner_text"
            />
          )}
        </PromoTextBannerWrapper>
      </HeaderWrapper>
    </ContainerView>
  );
};

const ModuleATcpCarousel = (props: Props) => {
  const { largeCompImageCarousel, navigation } = props;
  return (
    <Container>
      <Carousel
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

export default ModuleATcpCarousel;
export { ModuleATcpCarousel as ModuleATcpCarouselVanilla };
