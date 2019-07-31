import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-native-snap-carousel';

import Button from '../../../atoms/Button';
import LinkText from '../../LinkText';

import {
  MainWrapper,
  WrapperView,
  PromoTextBannerWrapper,
  BodyCopy,
} from '../ModuleK.style.native';
import { ImageGrid, PromoTextBanner, Carousel } from '../..';

import { UrlHandler, getScreenWidth } from '../../../../../utils/utils.native';

const MODULE_HEIGHT = 260;
const MODULE_WIDTH = 347;

const bodyCopyStyles = {
  style1: props => <BodyCopy fontSize="fs36" fontWeight="black" {...props} />,
  style2: props => <BodyCopy fontSize="fs42" textAlign="center" lineHeight="42px" {...props} />,
  style3: props => (
    <BodyCopy
      fontSize="fs64"
      fontWeight="black"
      color="black"
      lineHeight="64px"
      textAlign="center"
      {...props}
    />
  ),
};

class ModuleK extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
    };
  }

  getPagination() {
    const { activeSlide } = this.state;
    const { masonryGrid } = this.props;

    /* eslint-disable  */
    return (
      <Pagination
        dotsLength={masonryGrid.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingVertical: 24 }}
        dotContainerStyle={{ marginHorizontal: 4 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          borderColor: '#575757',
          borderWidth: 1,
          backgroundColor: '#ffffff',
        }}
        inactiveDotStyle={{
          backgroundColor: '#575757',
          width: 6,
          height: 6,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
    // eslint-enable
  }

  /**
   * @function renderCarouselSlide : renders module K Images.
   * @param {Object} item : Grid image object which has keys mediaList, promoTextBanner, SingleCTAButton.
   * @return {Node} : Returns Image element.
   */
  renderCarouselSlide = ({ item, index }) => {
    const { mediaList, slideIndex, promoTextBanner, singleCTAButton } = item;

    return (
      <>
        {promoTextBanner && (
          <PromoTextBannerWrapper>
            <PromoTextBanner
              dataLocator={`moduleK_promobanner_text_${slideIndex}`}
              promoTextBanner={promoTextBanner}
              bodyCopyStyles={bodyCopyStyles}
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
    const { props } = this;

    const [headerText] = props.headerText;
    const { promoTextBanner: outerPromoTextBanner, masonryGrid, autoplayInterval } = props;
    let indexedMasonryGrid = masonryGrid.map((item, i) => {
      item.slideIndex = i;
      return item;
    });

    return (
      <MainWrapper>
        {headerText && (
          <LinkText
            textItems={headerText.textItems}
            link={headerText.link}
            fontSize="fs36"
            fontWeight="black"
            textAlign="center"
            dataLocator="moduleK_header_text"
            onPress={() => UrlHandler(headerText.link.url)}
          />
        )}
        {outerPromoTextBanner && (
          <PromoTextBanner
            dataLocator="moduleK_outerPromoBanner_text"
            promoTextBanner={outerPromoTextBanner}
            bodyCopyStyles={bodyCopyStyles}
          />
        )}
        <Carousel
          data={indexedMasonryGrid}
          renderItem={this.renderCarouselSlide}
          height={MODULE_HEIGHT}
          width={MODULE_WIDTH}
          carouselConfig={{
            autoplay: false,
          }}
          hidePlayStopButton
          defaultAutoplay={false}
          autoplayInterval={autoplayInterval * 1000}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />
        {this.getPagination()}
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
  headerText: PropTypes.array,
  promoTextBanner: PropTypes.array,
  masonryGrid: PropTypes.array,
  autoplayInterval: PropTypes.number, // 2 means 2 seconds
};

export default ModuleK;
