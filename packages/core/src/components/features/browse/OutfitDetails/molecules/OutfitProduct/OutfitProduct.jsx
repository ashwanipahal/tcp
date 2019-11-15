import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy, Anchor, DamImage } from '../../../../../common/atoms';
import ProductBasicInfo from '../../../ProductDetail/molecules/ProductBasicInfo/ProductBasicInfo';
import ProductPrice from '../../../ProductDetail/molecules/ProductPrice/ProductPrice';
import { SIZE_CHART_LINK_POSITIONS } from '../../../../../common/molecules/ProductAddToBag/views/ProductAddToBag.view';
import {
  getPrices,
  getMapSliceForColorProductId,
  getProductListToPath,
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
  labels,
  isCanada,
  isPlcc,
  isInternationalShipping,
  currencySymbol,
  currencyExchange,
  handleAddToBag,
  addToBagError,
  isLoggedIn,
  addToFavorites,
  isBundleProduct,
}) => {
  const { imagesByColor, colorFitsSizesMap, isGiftCard, name } = outfitProduct;
  const colorProduct =
    outfitProduct && getMapSliceForColorProductId(colorFitsSizesMap, colorProductId);
  const prices = outfitProduct && getPrices(outfitProduct, colorProduct.color.name);
  const badges = colorProduct.miscInfo.badge1;
  const badge1 = badges && badges.defaultBadge ? badges.defaultBadge : badges.matchBadge;

  // TODO - this is temporary - just for the display - once the form values are fetched, it would be updated
  const color = Object.keys(imagesByColor)[0];

  const currentColorPdpUrl = outfitProduct && outfitProduct.pdpUrl;
  const pdpToPath = getProductListToPath(currentColorPdpUrl);
  const viewDetails = labels && labels.lbl_outfit_viewdetail;
  const imgData = {
    alt: name,
    url: imagesByColor[color].basicImageUrl,
  };
  const sizeChartLinkVisibility = !isGiftCard ? SIZE_CHART_LINK_POSITIONS.AFTER_SIZE : null;

  return (
    <Row className={className}>
      <Col
        colSize={{ small: 6, medium: 3, large: 4 }}
        ignoreGutter={{ small: true }}
        hideCol={{ small: true, medium: true, large: false }}
        className="desktop-image-section"
      >
        <BodyCopy fontSize="fs10" fontFamily="secondary" className="image-section">
          {productIndexText}
        </BodyCopy>
        <DamImage
          className="full-size-desktop-image"
          imgData={imgData}
          itemProp="contentUrl"
          isProductImage
        />
        <BodyCopy className="view-detail-anchor">
          <Anchor underline fontSizeVariation="large" to={pdpToPath} asPath={outfitProduct.pdpUrl}>
            {viewDetails}
          </Anchor>
        </BodyCopy>
      </Col>
      <Col
        colSize={{ small: 6, medium: 8, large: 8 }}
        ignoreGutter={{ small: true, medium: true, large: true }}
        className="tablet-product-info"
      >
        <div className="tablet-image-section">
          <BodyCopy fontSize="fs10" fontFamily="secondary" className="image-section">
            {productIndexText}
          </BodyCopy>

          <BodyCopy component="div" className="outfit-mobile-image">
            <DamImage
              className="full-size-desktop-image"
              imgData={imgData}
              itemProp="contentUrl"
              isProductImage
            />
          </BodyCopy>

          <BodyCopy className="view-detail-anchor">
            <Anchor
              underline
              fontSizeVariation="large"
              to={pdpToPath}
              asPath={outfitProduct.pdpUrl}
            >
              {viewDetails}
            </Anchor>
          </BodyCopy>
        </div>
        <div className="product-information">
          <ProductBasicInfo
            productInfo={outfitProduct}
            isCanada={isCanada}
            isPlcc={isPlcc}
            isInternationalShipping={isInternationalShipping}
            onAddItemToFavorites={addToFavorites}
            isLoggedIn={isLoggedIn}
            badge={badge1}
          />
          <ProductPrice
            currencySymbol={currencySymbol}
            currencyExchange={currencyExchange}
            {...prices}
            isCanada={isCanada}
            isPlcc={isPlcc}
            isInternationalShipping={isInternationalShipping}
            promotionalMessage={outfitProduct.promotionalMessage}
          />
        </div>
        <div className="outfit-sku">
          <ProductAddToBagContainer
            handleFormSubmit={handleAddToBag}
            currentProduct={outfitProduct}
            plpLabels={plpLabels}
            isOutfitPage
            errorOnHandleSubmit={addToBagError}
            isPickup
            isBundleProduct={isBundleProduct}
            sizeChartLinkVisibility={sizeChartLinkVisibility}
          />
        </div>
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
  currencyExchange: PropTypes.number,
  handleAddToBag: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  addToBagError: PropTypes.bool,
  addToFavorites: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  isBundleProduct: PropTypes.bool,
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
  currencySymbol: 'USD',
  currencyExchange: 1,
  labels: {},
  addToBagError: false,
  isLoggedIn: false,
  isBundleProduct: false,
};

export default withStyles(OutfitDetailsView, OutfitProductStyle);
