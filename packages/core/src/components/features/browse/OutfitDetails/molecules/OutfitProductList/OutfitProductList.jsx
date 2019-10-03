import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../../../common/atoms';
import ProductBasicInfo from '../../../ProductDetail/molecules/ProductBasicInfo/ProductBasicInfo';
import ProductPrice from '../../../ProductDetail/molecules/ProductPrice/ProductPrice';
import {
  getPrices,
  getMapSliceForColorProductId,
} from '../../../ProductListing/molecules/ProductList/utils/productsCommonUtils';

const OutfitDetailsView = ({ className, outfitProduct, colorProductId }) => {
  const colorProduct =
    outfitProduct && getMapSliceForColorProductId(outfitProduct.colorFitsSizesMap, colorProductId);
  const prices = outfitProduct && getPrices(outfitProduct, colorProduct.color.name);
  return (
    <div className={className}>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 3, large: 4 }} ignoreGutter={{ small: true }}>
          <div>Image</div>
        </Col>
        <Col
          colSize={{ small: 6, medium: 5, large: 8 }}
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          <ProductBasicInfo
            productInfo={outfitProduct}
            isCanada={false}
            isPlcc={false}
            isInternationalShipping={false}
          />
          <ProductPrice
            currencySymbol="$"
            priceCurrency="USD"
            currencyExchange="1"
            {...prices}
            isCanada={false}
            isPlcc={false}
            isInternationalShipping={false}
          />
        </Col>
      </Row>
    </div>
  );
};

OutfitDetailsView.propTypes = {
  className: PropTypes.string,
  outfitProduct: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  colorProductId: PropTypes.string,
};

OutfitDetailsView.defaultProps = {
  className: '',
  outfitProduct: {},
  colorProductId: '',
};

export default OutfitDetailsView;
