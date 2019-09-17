import React from 'react';
import { Text, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import ImageCarousel from '../molecules/ImageCarousel';
import PageContainer from '../styles/ProductDetail.style.native';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';

class ProductDetailView extends React.PureComponent {
  onImageClick = () => {};

  render() {
    const { currentProduct, selectedColorProductId, plpLabels } = this.props;
    const { name, shortDescription, colorFitsSizesMap } = currentProduct;

    return (
      <ScrollView>
        <PageContainer>
          <ImageCarousel
            item={currentProduct}
            selectedColorProductId={selectedColorProductId}
            onImageClick={this.onImageClick}
          />
          <Text>{name}</Text>
          <Text>{shortDescription}</Text>
          <ProductAddToBagContainer colorFitsSizesMap={colorFitsSizesMap} plpLabels={plpLabels} />
        </PageContainer>
      </ScrollView>
    );
  }
}

ProductDetailView.propTypes = {
  currentProduct: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
  plpLabels: PropTypes.shape({}),
};

ProductDetailView.defaultProps = {
  currentProduct: {},
  plpLabels: null,
};

export default withStyles(ProductDetailView);
