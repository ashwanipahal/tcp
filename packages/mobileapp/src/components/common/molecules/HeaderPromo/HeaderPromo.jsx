import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { BodyCopy, RichText } from '@tcp/core/src/components/common/atoms';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import { getScreenWidth, UrlHandler, getLocator } from '@tcp/core/src/utils';
import {
  MessageContainer,
  TextStyle1,
  TextStyle2,
  TextStyle3,
  Container,
} from './HeaderPromo.style';

/**
 * Module height and width.
 * Height is fixed for mobile
 * Width can vary as per device width.
 */
const MODULE_HEIGHT = 30;
const MODULE_WIDTH = getScreenWidth();

/**
 * To manage the TextStyle on the basis of CMS
 */
const manageTextStyles = style => {
  if (style === 'style1') {
    return TextStyle1;
  }
  if (style === 'style2') {
    return TextStyle2;
  }
  return TextStyle3;
};

/**
 * This Component return the mobile Promo Banner
 */
class HeaderPromo extends React.PureComponent {
  /**
   * @desc Returns updated Banner text details with styles.
   * Content render on the basis of style type .
   */
  renderView = ({ item }) => {
    return (
      item.textItems &&
      item.textItems.length && (
        <MessageContainer
          accessibilityRole="text"
          width={MODULE_WIDTH}
          onPress={() => UrlHandler(item.linkClass.url)}
        >
          {item.textItems[0] && (
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              textAlign="center"
              fontWeight="black"
              text={item.textItems[0].text}
              style={manageTextStyles(item.textItems[0].style)}
              data-locator={getLocator('global_promobanner_title_0')}
            />
          )}
          {item.textItems[1] && (
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              textAlign="center"
              color="black"
              fontWeight="regular"
              text={item.textItems[1].text}
              data-locator={getLocator('global_promobanner_title_1')}
            />
          )}
        </MessageContainer>
      )
    );
  };

  render() {
    const { headerPromo, promoHtmlBannerCarousel } = this.props;

    if (headerPromo) {
      return (
        <View>
          <Carousel
            data={headerPromo}
            renderItem={this.renderView}
            height={MODULE_HEIGHT}
            width={MODULE_WIDTH}
            variation="show-arrow"
            carouselConfig={{
              autoplay: true,
            }}
          />
        </View>
      );
    }

    return (
      <Container>
        {promoHtmlBannerCarousel && (
          <RichText
            source={{
              html: promoHtmlBannerCarousel && promoHtmlBannerCarousel[0].text,
            }}
          />
        )}
      </Container>
    );
  }
}

HeaderPromo.propTypes = {
  headerPromo: PropTypes.shape({}),
  promoHtmlBannerCarousel: PropTypes.shape([]),
}

 HeaderPromo.defaultProps = {
  headerPromo: {},
  promoHtmlBannerCarousel: [],
}


export default HeaderPromo;
export { HeaderPromo as HeaderPromoVanilla };
