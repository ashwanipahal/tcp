import React from 'react';
import PropTypes from 'prop-types';
import { UrlHandler, getScreenWidth } from '@tcp/core/src/utils';
import Button from '../../../atoms/Button';
import LinkText from '../../LinkText';

import {
  MainWrapper,
  WrapperView,
  PromoTextBannerWrapper,
  HeaderWrapper,
} from '../ModuleK.style.native';
import { ImageGrid, PromoBanner, Carousel } from '../..';

const MODULE_HEIGHT = 260;
const MODULE_WIDTH = getScreenWidth();

class ModuleK extends React.PureComponent {
  /**
   * @function renderCarouselSlide : renders module K Images.
   * @param {Object} item : Grid image object which has keys mediaList, promoTextBanner, SingleCTAButton.
   * @return {Node} : Returns Image element.
   */
  renderCarouselSlide = ({ item }, navigation) => {
    const { mediaLinkedList, slideIndex, promoBanner, singleCTAButton } = item;

    return (
      <React.Fragment>
        <HeaderWrapper>
          {promoBanner && (
            <PromoTextBannerWrapper>
              <PromoBanner
                testID={`moduleK_promobanner_text_${slideIndex}`}
                promoBanner={promoBanner}
                navigation={navigation}
              />
            </PromoTextBannerWrapper>
          )}
        </HeaderWrapper>
        <ImageGrid
          testID={`moduleK_image_${slideIndex}`}
          mediaList={mediaLinkedList}
          navigation={navigation}
        />
        {singleCTAButton && (
          <WrapperView width={getScreenWidth()}>
            <Button
              width="225px"
              height="42px"
              buttonVariation="variable-width"
              text={singleCTAButton.text || `Shop Now`}
              testID={`moduleK_button_set_${slideIndex}`}
              onPress={() => UrlHandler(singleCTAButton.url)}
            />
          </WrapperView>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { headerText, masonryGrid, autoplayInterval, navigation } = this.props;
    const indexedMasonryGrid = masonryGrid.map((item, i) => {
      return { ...item, slideIndex: i };
    });

    return (
      <MainWrapper>
        <HeaderWrapper>
          {headerText && (
            <LinkText
              headerText={headerText}
              navigation={navigation}
              fontSize="fs36"
              fontWeight="black"
              color="text.primary"
              fontFamily="primary"
              textAlign="center"
              dataLocator="moduleK_header_text"
            />
          )}
        </HeaderWrapper>
        {indexedMasonryGrid && (
          <Carousel
            data={indexedMasonryGrid}
            renderItem={item => this.renderCarouselSlide(item, navigation)}
            height={MODULE_HEIGHT}
            width={MODULE_WIDTH}
            carouselConfig={{
              autoplay: true,
            }}
            autoplayInterval={autoplayInterval * 1000}
            showDots
            ref={c => {
              this.carousel = c;
            }}
          />
        )}
      </MainWrapper>
    );
  }
}

ModuleK.defaultProps = {
  headerText: [],
  masonryGrid: [],
  autoplayInterval: 2,
  navigation: {},
};

ModuleK.propTypes = {
  headerText: PropTypes.shape([]),
  masonryGrid: PropTypes.shape([]),
  autoplayInterval: PropTypes.number, // 2 means 2 seconds
  navigation: PropTypes.shape({}),
};

export default ModuleK;
export { ModuleK as ModuleKVanilla };
