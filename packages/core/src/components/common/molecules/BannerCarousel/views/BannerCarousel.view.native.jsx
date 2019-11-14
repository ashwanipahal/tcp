import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { DamImage } from '../../../atoms';
import {
  Container,
  ImageTouchableOpacity,
  getContentContainerStyle,
} from '../styles/BannerCarousel.style.native';

class BannerCarousel extends React.PureComponent {
  itemRenderer = imgSource => {
    const {
      onImageClick,
      imageWidth,
      imageHeight,
      getImageUrl,
      itemMargin,
      itemPadding,
      itemBackgroundColor,
    } = this.props;
    const { index, item } = imgSource;
    const imgUrl = (getImageUrl && getImageUrl(item)) || '';
    return (
      <ImageTouchableOpacity
        onPress={onImageClick}
        accessible={index}
        accessibilityRole="image"
        accessibilityLabel={`image ${index + 1}`}
        itemMargin={itemMargin}
        itemPadding={itemPadding}
        itemBackgroundColor={itemBackgroundColor}
      >
        <DamImage key={index.toString()} url={imgUrl} width={imageWidth} height={imageHeight} />
      </ImageTouchableOpacity>
    );
  };

  render() {
    const { data, margins, customRenderer } = this.props;
    return (
      <Container margins={margins}>
        <FlatList
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          contentContainerStyle={getContentContainerStyle()}
          initialNumToRender={3}
          initialScrollIndex={0}
          refreshing={false}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          listKey={(_, index) => index.toString()}
          renderItem={
            !customRenderer ? this.itemRenderer : item => customRenderer({ ...this.props }, item)
          }
        />
      </Container>
    );
  }
}

BannerCarousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onImageClick: PropTypes.func,
  margins: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  getImageUrl: PropTypes.func,
  itemMargin: PropTypes.string,
  itemPadding: PropTypes.string,
  itemBackgroundColor: PropTypes.string,
  customRenderer: PropTypes.element,
};

BannerCarousel.defaultProps = {
  data: [],
  margins: null,
  onImageClick: () => {},
  imageWidth: 125,
  imageHeight: 250,
  getImageUrl: null,
  itemMargin: null,
  itemPadding: null,
  itemBackgroundColor: null,
  customRenderer: null,
};

export default BannerCarousel;
export { BannerCarousel as BannerCarouselVanilla };
