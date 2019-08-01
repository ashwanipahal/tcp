import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../atoms/Button';
import LinkText from '../../LinkText';

import { MainWrapper, WrapperView, PromoTextBannerWrapper } from '../ModuleK.style.native';
import { ImageGrid, PromoTextBanner, Carousel } from '../..';

import { UrlHandler, getScreenWidth } from '../../../../../utils/utils.native';

const MODULE_HEIGHT = 260;
const MODULE_WIDTH = 347;

class ModuleK extends React.PureComponent {
  /**
   * @function renderCarouselSlide : renders module K Images.
   * @param {Object} item : Grid image object which has keys mediaList, promoTextBanner, SingleCTAButton.
   * @return {Node} : Returns Image element.
   */
  renderCarouselSlide = ({ item }) => {
    const { mediaList, slideIndex, promoTextBanner, singleCTAButton } = item;

    return (
      <>
        {promoTextBanner && (
          <PromoTextBannerWrapper>
            <PromoTextBanner
              dataLocator={`moduleK_promobanner_text_${slideIndex}`}
              promoTextBanner={promoTextBanner}
            />
          </PromoTextBannerWrapper>
        )}
        <ImageGrid dataLocator={`moduleK_image_${slideIndex}`} mediaList={mediaList} />
        {singleCTAButton && (
          <WrapperView width={getScreenWidth() - 20}>
            <Button
              width="225px"
              height="42px"
              buttonVariation="variable-width"
              text={singleCTAButton.text || `Shop Now`}
              dataLocator={`moduleK_button_set_${slideIndex}`}
              onPress={() => UrlHandler(singleCTAButton.url)}
            />
          </WrapperView>
        )}
      </>
    );
  };

  render() {
    const {
      headerText,
      promoTextBanner: outerPromoTextBanner,
      masonryGrid,
      autoplayInterval,
    } = this.props;
    const indexedMasonryGrid = masonryGrid.map((item, i) => {
      return { ...item, slideIndex: i };
    });

    return (
      <MainWrapper>
        {headerText && (
          <LinkText
            textItems={headerText[0].textItems}
            link={headerText[0].link}
            fontSize="fs36"
            fontWeight="black"
            textAlign="center"
            dataLocator="moduleK_header_text"
            onPress={() => UrlHandler(headerText[0].link.url)}
          />
        )}
        {outerPromoTextBanner && (
          <PromoTextBanner
            dataLocator="moduleK_outerPromoBanner_text"
            promoTextBanner={outerPromoTextBanner}
          />
        )}
        <Carousel
          data={indexedMasonryGrid}
          renderItem={this.renderCarouselSlide}
          height={MODULE_HEIGHT}
          width={MODULE_WIDTH}
          carouselConfig={{
            autoplay: true,
          }}
          autoplayInterval={autoplayInterval * 1000}
          defaultAutoplay
          showDots
        />
      </MainWrapper>
    );
  }
}

ModuleK.defaultProps = {
  headerText: [],
  promoTextBanner: [],
  masonryGrid: [],
  autoplayInterval: 2,
};

ModuleK.propTypes = {
  headerText: PropTypes.shape([]),
  promoTextBanner: PropTypes.shape([]),
  masonryGrid: PropTypes.shape([]),
  autoplayInterval: PropTypes.number, // 2 means 2 seconds
};

export default ModuleK;
