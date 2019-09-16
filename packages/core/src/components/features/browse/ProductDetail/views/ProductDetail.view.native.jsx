import React from 'react';
import { Text } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import ImageCarousel from '../molecules/ImageCarousel';
import PageContainer from '../styles/ProductDetail.style.native';

class ProductDetailView extends React.PureComponent {
  onImageClick = () => {};

  render() {
    const { currentProduct, selectedColorProductId } = this.props;
    const { name, shortDescription } = currentProduct;
    return (
      <PageContainer>
        <ImageCarousel
          item={currentProduct}
          selectedColorProductId={selectedColorProductId}
          onImageClick={this.onImageClick}
        />
        <Text>{name}</Text>
        <Text>{shortDescription}</Text>
      </PageContainer>
    );
  }
}

ProductDetailView.propTypes = {
  currentProduct: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
};

ProductDetailView.defaultProps = {
  currentProduct: {},
};

export default withStyles(ProductDetailView);
