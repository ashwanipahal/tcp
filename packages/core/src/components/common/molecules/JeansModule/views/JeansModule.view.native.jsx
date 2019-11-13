import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { configureInternalNavigationFromCMSUrl, navigateToPage } from '@tcp/core/src/utils';
import BannerCarousel from '@tcp/core/src/components/common/molecules/BannerCarousel';
import {
  Container,
  VerticalBanner,
  getVerticalTextStyle,
  ImageTouchableOpacity,
} from '../styles/JeansModule.style.native';
import { BodyCopy, DamImage } from '../../../atoms';
import LineComp from '../../../atoms/Line';

export class JeansModule extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({}),
    navigation: PropTypes.shape({}),
  };

  static defaultProps = {
    data: {},
    navigation: {},
  };

  getImageUrl = item => {
    return get(item, 'imageStyled[0].image.url', '');
  };

  getImageTitle = item => {
    return get(item, 'imageStyled[0].styled.text', '');
  };

  navigateToNextScreen = item => {
    const { navigation } = this.props;
    const url = get(item, 'singleCTAButton.url', '');
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
        <LineComp marginTop={12} marginLeft={12} marginRight={12} margin borderColor="blue.500" />
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
    const bannerTitle = data.headLine[0].text || 'YOUR DENIM PLACE';
    const bannerData = get(data, 'imageTileWrapper', null);
    return (
      <Container>
        <VerticalBanner>
          <BodyCopy
            dataLocator="lbl_promo_jeans_module"
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="semibold"
            color="white"
            text={bannerTitle}
            style={getVerticalTextStyle()}
          />
        </VerticalBanner>
        <BannerCarousel
          data={bannerData}
          getImageUrl={this.getImageUrl}
          itemPadding="0 8px 0 0"
          itemBackgroundColor="#f1f0f0"
          customRenderer={this.itemRenderer}
        />
      </Container>
    );
  }
}

export { JeansModule as JeansModuleVanilla };
export default JeansModule;
