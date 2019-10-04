import React from 'react';
import { PropTypes } from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';
import PaginationDots from '../PaginationDots';
import ModalNative from '../Modal';
import { getScreenHeight, getScreenWidth } from '../../../../utils/index.native';
import { ModalCarousel, PaginationContainer } from './styles/FullScreenImageCarousel.style.native';

class FullScreenImageCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { zoomImage: true, activeSlideIndex: 0 };
  }

  toggleModal = () => {
    const { zoomImage } = this.state;
    this.setState({ zoomImage: !zoomImage, activeSlideIndex: 0 });
  };

  // this method call when tap on the pagination dots and navigate to clicked image
  onPageChange = dotClickedIndex => {
    this.setState({ activeSlideIndex: dotClickedIndex });
  };

  render() {
    const { imageUrls } = this.props;
    const { zoomImage, activeSlideIndex } = this.state;
    const fullWidth = {
      width: '100%',
      alignItems: 'flex-end',
    };

    const imageObjects = imageUrls.map(item => ({
      url: item.regularSizeImageUrl,
      width: getScreenWidth() - 24,
      height: getScreenHeight() / 2,
      props: {
        accessible: true,
        accessibilityRole: 'image',
        accessibilityLabel: `product image ${activeSlideIndex + 1}`,
      },
    }));

    return (
      <ModalNative
        isOpen={zoomImage}
        onRequestClose={this.toggleModal}
        overlayClassName="TCPModal__Overlay"
        closeIconDataLocator=""
        closeIconLeftAligned={false}
        horizontalBar={false}
        headerStyle={fullWidth}
        isOverlay
      >
        <ModalCarousel height={getScreenHeight()}>
          <ImageViewer
            imageUrls={imageObjects}
            backgroundColor="white"
            saveToLocalByLongPress={false}
            doubleClickInterval={500}
            renderIndicator={() => null}
            onChange={index => {
              this.setState({ activeSlideIndex: index });
            }}
            index={activeSlideIndex}
            enablePreload
          />
          <PaginationContainer>
            <PaginationDots
              numberOfDots={(imageUrls && imageUrls.length) || 0}
              selectedIndex={activeSlideIndex}
              onPress={this.onPageChange}
            />
          </PaginationContainer>
        </ModalCarousel>
      </ModalNative>
    );
  }
}

FullScreenImageCarousel.propTypes = {
  imageUrls: PropTypes.arrayOf(Object),
};

FullScreenImageCarousel.defaultProps = {
  imageUrls: [],
};

export default FullScreenImageCarousel;
