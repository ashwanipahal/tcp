import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { DamImage } from '../../../atoms';
import { Container, ImageTouchableOpacity } from '../styles/ImageCarousel.style.native';

class ImageCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    const { setActiveIndex } = props;
    this.state = {
      activeSlideIndex: setActiveIndex,
    };
  }

  // this method set current visible image
  setActiveSlideIndex = index => {
    const { getActiveIndex } = this.props;
    const { activeSlideIndex } = this.state;
    if (index !== activeSlideIndex) {
      this.setState(
        {
          activeSlideIndex: index,
        },
        () => {
          if (getActiveIndex) getActiveIndex(index);
        }
      );
    }
  };

  // this method when swipe image and return changed view
  onViewableItemsChanged = ({ changed }) => {
    const len = (changed && changed.length) || 0;
    for (let i = 0; i < len; i += 1) {
      const item = changed[i];
      const { isViewable, index } = item;
      if (isViewable) {
        this.setActiveSlideIndex(index);
        break;
      }
    }
  };

  renderNormalImage = imgSource => {
    const { onImageClick, imageWidth, imageHeight, imageUrlKey } = this.props;
    const { activeSlideIndex } = this.state;
    const { index, item } = imgSource;
    const imgUrl = (item && item[imageUrlKey]) || '';
    return (
      <ImageTouchableOpacity
        onPress={onImageClick}
        accessible={index === activeSlideIndex}
        accessibilityRole="image"
        accessibilityLabel={`product image ${index + 1}`}
      >
        <DamImage
          key={index.toString()}
          url={imgUrl}
          isProductImage
          width={imageWidth}
          height={imageHeight}
        />
      </ImageTouchableOpacity>
    );
  };

  render() {
    const { imageUrls, margins } = this.props;
    return (
      <Container margins={margins}>
        <FlatList
          ref={ref => {
            this.flatListRef = ref;
          }}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          initialNumToRender={1}
          initialScrollIndex={0}
          refreshing={false}
          data={imageUrls}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          listKey={(_, index) => index.toString()}
          renderItem={this.renderNormalImage}
        />
      </Container>
    );
  }
}

ImageCarousel.propTypes = {
  imageUrls: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.shape({
        regularSizeImageUrl: PropTypes.string.isRequired,
      }),
    })
  ),
  onImageClick: PropTypes.func,
  margins: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  getActiveIndex: PropTypes.func,
  setActiveIndex: PropTypes.number,
  imageUrlKey: PropTypes.string,
};

ImageCarousel.defaultProps = {
  imageUrls: [],
  margins: null,
  onImageClick: () => {},
  imageWidth: 103, // thumb nail image size i.e. collection pdp thumb image size
  imageHeight: 127, // thumb nail image size i.e. collection pdp thumb image size
  getActiveIndex: null,
  setActiveIndex: 0,
  imageUrlKey: 'listingSizeImageUrl',
};

export default ImageCarousel;
export { ImageCarousel as ImageCarouselVanilla };
