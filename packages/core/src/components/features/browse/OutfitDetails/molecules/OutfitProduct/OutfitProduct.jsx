import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Image, BodyCopy, Anchor } from '../../../../../common/atoms';
import ProductBasicInfo from '../../../ProductDetail/molecules/ProductBasicInfo/ProductBasicInfo';
import ProductPrice from '../../../ProductDetail/molecules/ProductPrice/ProductPrice';
import {
  getPrices,
  getMapSliceForColorProductId,
} from '../../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import ProductAddToBagContainer from '../../../../../common/molecules/ProductAddToBag';
import withStyles from '../../../../../common/hoc/withStyles';
import OutfitProductStyle from './OutfitProduct.style';

const OutfitDetailsView = ({
  className,
  outfitProduct,
  colorProductId,
  productIndexText,
  plpLabels,
  isCanada,
  isPlcc,
  isInternationalShipping,
  currencySymbol,
  priceCurrency,
  currencyExchange,
}) => {
  const { imagesByColor, colorFitsSizesMap } = outfitProduct;
  const colorProduct =
    outfitProduct && getMapSliceForColorProductId(colorFitsSizesMap, colorProductId);
  const prices = outfitProduct && getPrices(outfitProduct, colorProduct.color.name);

  // TODO - this is temporary - just for the display - once the form values are fetched, it would be updated
  const color = Object.keys(imagesByColor)[0];

  return (
    <Row className={className}>
      <Col
        colSize={{ small: 6, medium: 3, large: 4 }}
        ignoreGutter={{ small: true }}
        hideCol={{ small: true, medium: true, large: false }}
      >
        <BodyCopy>{productIndexText}</BodyCopy>
        <Image src={imagesByColor[color].basicImageUrl} />
        <Anchor to={outfitProduct.pdpUrl.replace('/p', '?pid=')} asPath={outfitProduct.pdpUrl}>
          View Product Details
        </Anchor>
      </Col>
      <Col
        colSize={{ small: 6, medium: 8, large: 8 }}
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        <div className="tablet-image-section">
          <BodyCopy>{productIndexText}</BodyCopy>
          <Image src={imagesByColor[color].basicImageUrl} />
          <Anchor
            underline
            fontSizeVariation="large"
            to={outfitProduct.pdpUrl.replace('/p', '?pid=')}
            asPath={outfitProduct.pdpUrl}
          >
            View Product Details
          </Anchor>
        </div>
        <div className="product-information">
          <ProductBasicInfo
            productInfo={outfitProduct}
            isCanada={isCanada}
            isPlcc={isPlcc}
            isInternationalShipping={isInternationalShipping}
          />
          <ProductPrice
            currencySymbol={currencySymbol}
            priceCurrency={priceCurrency}
            currencyExchange={currencyExchange}
            {...prices}
            isCanada={isCanada}
            isPlcc={isPlcc}
            isInternationalShipping={isInternationalShipping}
          />
        </div>
        <ProductAddToBagContainer
          handleFormSubmit={() => {}}
          errorOnHandleSubmit={() => {}}
          currentProduct={outfitProduct}
          plpLabels={plpLabels}
          onChangeColor={() => {}}
        />
      </Col>
    </Row>
  );
};

OutfitDetailsView.propTypes = {
  className: PropTypes.string,
  outfitProduct: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  colorProductId: PropTypes.string,
  productIndexText: PropTypes.string,
  plpLabels: PropTypes.shape({}),
  isCanada: PropTypes.bool,
  isPlcc: PropTypes.bool,
  isInternationalShipping: PropTypes.bool,
  currencySymbol: PropTypes.string,
  priceCurrency: PropTypes.string,
  currencyExchange: PropTypes.shape({}),
};

OutfitDetailsView.defaultProps = {
  className: '',
  outfitProduct: {},
  colorProductId: '',
  productIndexText: '',
  plpLabels: {},
  isCanada: false,
  isPlcc: false,
  isInternationalShipping: false,
  currencySymbol: '$',
  priceCurrency: 'USD',
  currencyExchange: [{ exchangevalue: 1 }],
};

export default withStyles(OutfitDetailsView, OutfitProductStyle);
