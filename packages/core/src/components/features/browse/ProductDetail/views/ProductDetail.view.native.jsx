import React from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import ImageCarousel from '../molecules/ImageCarousel';
import PageContainer from '../styles/ProductDetail.style.native';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import ProductSummary from '../molecules/ProductSummary';

class ProductDetailView extends React.PureComponent {
  onImageClick = () => {};

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
