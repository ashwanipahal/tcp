import React from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import ModalNative from '../../../../common/molecules/Modal';

import withStyles from '../../../../common/hoc/withStyles.native';
import ImageCarousel from '../molecules/ImageCarousel';
import PageContainer, { ModalCarousel } from '../styles/ProductDetail.style.native';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import ProductSummary from '../molecules/ProductSummary';
import { getScreenHeight } from '../../../../../utils/index.native';

class ProductDetailView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { zoomImage: false };
  }

  onImageClick = () => {
    this.toggleModal();
  };

  toggleModal = () => {
    const { zoomImage } = this.state;
    this.setState({ zoomImage: !zoomImage });
  };

  renderCarousel = () => {
    const { currentProduct, selectedColorProductId } = this.props;
    const { zoomImage } = this.state;
    const fullWidth = {
      width: '100%',
      alignItems: 'flex-end',
    };

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
          <ImageCarousel
            item={currentProduct}
            selectedColorProductId={selectedColorProductId}
            showFavorites={false}
            allowZoom
          />
        </ModalCarousel>
      </ModalNative>
    );
  };

  render() {
    const { currentProduct, selectedColorProductId, plpLabels, handleSubmit } = this.props;
    const isDataAvailable = JSON.stringify(currentProduct) !== '{}';

    return (
      <ScrollView>
        <PageContainer>
          <ImageCarousel
            item={currentProduct}
            selectedColorProductId={selectedColorProductId}
            onImageClick={this.onImageClick}
          />
          <ProductSummary
            productData={currentProduct}
            selectedColorProductId={selectedColorProductId}
          />
          {isDataAvailable && (
            <ProductAddToBagContainer
              currentProduct={currentProduct}
              plpLabels={plpLabels}
              handleSubmit={handleSubmit}
              selectedColorProductId={selectedColorProductId}
            />
          )}
          {this.renderCarousel()}
        </PageContainer>
      </ScrollView>
    );
  }
}

ProductDetailView.propTypes = {
  currentProduct: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
  plpLabels: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
};

ProductDetailView.defaultProps = {
  currentProduct: {},
  plpLabels: null,
  handleSubmit: null,
};

export default withStyles(ProductDetailView);

export { ProductDetailView as ProductDetailViewVanilla };
