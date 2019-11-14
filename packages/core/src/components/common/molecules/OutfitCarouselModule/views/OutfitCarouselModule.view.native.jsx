import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import BannerCarousel from '@tcp/core/src/components/common/molecules/BannerCarousel';
import { configureInternalNavigationFromCMSUrl, navigateToPage } from '@tcp/core/src/utils';
import { Container, ImageTouchableOpacity } from '../styles/OutfitCarouselModule.style.native';
import { BodyCopy, DamImage } from '../../../atoms';

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
    return get(item, 'link.text', 'Not Available');
  };

  getTitle = data => {
    return get(data, 'headLine[0].text', 'No Heading');
  };

  getSubTitle = data => {
    return get(data, 'subHeadLine[0].text', 'No Sub Heading');
  };

  navigateToNextScreen = item => {
    const { navigation } = this.props;
    const url = get(item, 'link.url', '');
    const cmsValidatedUrl = configureInternalNavigationFromCMSUrl(url);
    navigateToPage(cmsValidatedUrl, navigation);
  };

  itemRenderer = (props, itemData) => {
    const { imageWidth, imageHeight, itemMargin, itemPadding, itemBackgroundColor } = props;
    const { index, item } = itemData;
    const imgUrl = this.getImageUrl(item) || '';
    return (
      <ImageTouchableOpacity
        onPress={() => this.navigateToNextScreen(item)}
        accessible={index}
        accessibilityRole="image"
        accessibilityLabel={`image ${index + 1}`}
        itemMargin={itemMargin}
        itemPadding={itemPadding}
        itemBackgroundColor={itemBackgroundColor}
      >
        <DamImage key={index.toString()} url={imgUrl} width={imageWidth} height={imageHeight} />
        <BodyCopy
          width="125"
          margin="16px 0 0 0"
          dataLocator="lbl_promo_jeans_img_title"
          mobileFontFamily="primary"
          fontSize="fs14"
          fontWeight="extrabold"
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
          margin="10px 0 0 0"
          dataLocator="lbl_promo_jeans_img_title"
          mobileFontFamily="primary"
          fontSize="fs14"
          fontWeight="regular"
          color="gray.900"
          textAlign="center"
          text={this.getSubTitle(data)}
        />
        <BannerCarousel
          margins="16px 0 0 0"
          data={bannerData}
          getImageUrl={this.getImageUrl}
          itemPadding="0 20px 0 0"
          customRenderer={this.itemRenderer}
          imageWidth={142}
          imageHeight={274}
          listLeftMargin={0}
          listRightMargin={20}
        />
      </Container>
    );
  }
}

export { OutfitCarouselModule as OutfitCarouselModuleVanilla };
export default OutfitCarouselModule;
