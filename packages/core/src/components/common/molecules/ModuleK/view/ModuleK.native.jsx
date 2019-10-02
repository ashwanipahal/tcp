import React from 'react';
import PropTypes from 'prop-types';
import { getScreenWidth } from '@tcp/core/src/utils';
import Button from '../../../atoms/Button';
import LinkText from '../../LinkText';
import config from '../config';

import {
  MainWrapper,
  WrapperView,
  PromoTextBannerWrapper,
  HeaderWrapper,
} from '../ModuleK.style.native';
import { ImageGrid, PromoBanner, Carousel } from '../..';

const MODULE_HEIGHT = 260;
const MODULE_WIDTH = getScreenWidth();

/**
 * @class ModuleK - global reusable component will provide featured content module
 * with a composite background image and 2-6 CTAs
 * This component is plug and play at any given slot in layout by passing required data
 * @param {mediaLinkedList} mediaLinkedList the list of data for carousel images
 * @param {promoBanner} promoBanner promo banner data
 * @param {singleCTAButton} singleCTAButton button data
 */
class ModuleK extends React.PureComponent {
  /**
   * @function renderCarouselSlide : renders module K Images.
   * @param {Object} item : Grid image object which has keys mediaList, promoTextBanner, SingleCTAButton.
   * @return {Node} : Returns Image element.
   */
  renderCarouselSlide = ({ item }, navigation) => {
    const { mediaLinkedList, slideIndex, promoBanner, singleCTAButton } = item;
    const { IMG_DATA } = config;
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
        {mediaLinkedList && (
          <ImageGrid
            testID={`moduleK_image_${slideIndex}`}
            mediaList={mediaLinkedList}
            navigation={navigation}
            IMG_DATA={IMG_DATA}
          />
        )}
        {singleCTAButton && (
          <WrapperView width={getScreenWidth()}>
            <Button
              width="225px"
              buttonVariation="variable-width"
              text={singleCTAButton.text || `Shop Now`}
              testID={`moduleK_button_set_${slideIndex}`}
              url={singleCTAButton.url}
              navigation={navigation}
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
