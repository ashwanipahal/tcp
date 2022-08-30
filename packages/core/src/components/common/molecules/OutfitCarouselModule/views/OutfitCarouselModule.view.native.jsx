import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { configureInternalNavigationFromCMSUrl, navigateToPage } from '@tcp/core/src/utils';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import { getScreenWidth } from '@tcp/core/src/utils/index.native';
import { Container, ImageTouchableOpacity } from '../styles/OutfitCarouselModule.style.native';
import { BodyCopy, DamImage } from '../../../atoms';

const horizontalMargin = 10;
const sliderWidth = getScreenWidth();
const slideWidth = sliderWidth / 2 - 42;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 304;

export class OutfitCarouselModule extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({}),
    navigation: PropTypes.shape({}),
  };

  static defaultProps = {
    data: {},
    navigation: {},
  };

  getImageUrl = item => {
    return get(item, 'image.url', '');
  };

  getImageTitle = item => {
    return get(item, 'link.text', '');
  };

  getTitle = data => {
    return get(data, 'headLine[0].text', '');
  };

  getSubTitle = data => {
    return get(data, 'subHeadLine[0].text', '');
  };

  navigateToNextScreen = item => {
    const { navigation } = this.props;
    const url = get(item, 'link.url', '');
    const cmsValidatedUrl = configureInternalNavigationFromCMSUrl(url);
    navigateToPage(cmsValidatedUrl, navigation);
  };

  itemRenderer = itemData => {
    // const { imageWidth, imageHeight, itemMargin, itemPadding, itemBackgroundColor } = props;
    const { index, item } = itemData;
    const imgUrl = this.getImageUrl(item) || '';
    return (
      <ImageTouchableOpacity
        onPress={() => this.navigateToNextScreen(item)}
        accessible={index}
        accessibilityRole="image"
        accessibilityLabel={`image ${index + 1}`}
        itemMargin={0}
        key={index.toString()}
        width={slideWidth}
      >
        <DamImage key={index.toString()} url={imgUrl} width="100%" height={274} />
        <BodyCopy
          width="125"
          margin="16px 0 0 0"
          dataLocator="lbl_promo_jeans_img_title"
          mobileFontFamily="primary"
          fontSize="fs10"
          fontWeight="regular"
          color="gray.900"
          textAlign="center"
          text={this.getImageTitle(item)}
        />
      </ImageTouchableOpacity>
    );
  };

  render() {
    const { data } = this.props;
    const bannerData = get(data, 'mediaLinkedList', null);
    return (
      <Container>
        <BodyCopy
          width="125"
          dataLocator="lbl_promo_jeans_img_title"
          mobileFontFamily="primary"
          fontSize="fs16"
          fontWeight="extrabold"
          color="gray.900"
          textAlign="center"
          text={this.getTitle(data)}
        />
        <BodyCopy
          width="125"
          margin="10px 0 16px 0"
          dataLocator="lbl_promo_jeans_img_title"
          mobileFontFamily="primary"
          fontSize="fs14"
          fontWeight="regular"
          color="gray.900"
          textAlign="center"
          text={this.getSubTitle(data)}
        />
        <Carousel
          data={bannerData}
          renderItem={this.itemRenderer}
          height={itemHeight}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          loop
          activeSlideAlignment="start"
          inactiveSlideOpacity={1}
          variation="show-arrow"
          autoplay={false}
          options={{
            autoplay: false,
          }}
          sampleTestingText="OutFitCarousel"
          isUseLeftArrowIcon
          isUseRightArrowIcon
        />
      </Container>
    );
  }
}

export { OutfitCarouselModule as OutfitCarouselModuleVanilla };
export default OutfitCarouselModule;
