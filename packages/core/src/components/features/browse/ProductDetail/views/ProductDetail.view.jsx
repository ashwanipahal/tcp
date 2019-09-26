import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import { Row, Col, RichText } from '../../../../common/atoms';
import FulfillmentSection from '../../../../common/organisms/FulfillmentSection';
import withStyles from '../../../../common/hoc/withStyles';
import ProductDetailStyle from '../ProductDetail.style';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { breakpoints } from '../../../../../../styles/themes/TCP/mediaQuery';
import Product from '../molecules/Product/views/Product.view';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import ProductPickupContainer from '../../../../common/organisms/ProductPickup';
import { getLocator } from '../../../../../utils';

import ProductImagesWrapper from '../molecules/ProductImagesWrapper/views/ProductImagesWrapper.view';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';

const getProductColorId = (productInfo, currentProduct) => {
  let colorProduct = {};
  if (productInfo && productInfo.colorFitsSizesMap && productInfo.generalProductId) {
    colorProduct = getMapSliceForColorProductId(
      productInfo.colorFitsSizesMap,
      currentProduct.generalProductId
    );
  }
  return colorProduct;
};
const ProductDetailView = ({
  className,
  productDetails,
  longDescription,
  breadCrumbs,
  currency,
  productInfo,
  plpLabels,
  isPickupModalOpen,
  pdpLabels,
  handleAddToBag,
  addToBagError,
}) => {
  const currentProduct = productDetails && productDetails.get('currentProduct');
  const isWeb =
    ExecutionEnvironment.canUseDOM && document.body.offsetWidth >= breakpoints.values.lg;
  let imagesToDisplay = [];
  const noProductData = Object.keys(productInfo).length === 0;
  if (!noProductData) {
    const colorProduct = getMapSliceForColorProductId(
      productInfo.colorFitsSizesMap,
      /* colorProductId would not be hard coded and it will be replaced in near future when it done */
      productInfo.colorFitsSizesMap[0].colorProductId
    );
    imagesToDisplay = getImagesToDisplay({
      imagesByColor: productInfo.imagesByColor,
      curentColorEntry: colorProduct,
      isAbTestActive: false,
      isFullSet: true,
    });
  }

  // TODO - replace with correct colorProductId - it should be conditionally generalProductId
  const colorProduct = getProductColorId(productInfo, currentProduct);

  return noProductData ? null : (
    <div className={className}>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          {/* <div className="promo-area-1">BREAD CRUMB</div> */}
          {breadCrumbs && <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />}
        </Col>
      </Row>
      <Row className="placeholder product-detail-image-wrapper">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-1">PROMO AREA 1</div>
        </Col>
      </Row>
      <Row>
        <Col className="product-image-wrapper" colSize={{ small: 6, medium: 4, large: 7 }}>
          <ProductImagesWrapper
            productName={productInfo.name}
            isThumbnailListVisible={isWeb}
            images={imagesToDisplay}
            pdpLabels={pdpLabels}
            isZoomEnabled
          />
        </Col>
        <Col
          id="productDetailsSection"
          className="product-detail-section"
          colSize={{ small: 6, medium: 4, large: 5 }}
        >
          <Product productDetails={productDetails} currencySymbol={currency} />
          {currentProduct && (
            <ProductAddToBagContainer
              handleFormSubmit={handleAddToBag}
              errorOnHandleSubmit={addToBagError}
              currentProduct={currentProduct}
              plpLabels={plpLabels}
            />
          )}
          {productInfo && colorProduct && (
            <ProductPickupContainer
              productInfo={productInfo}
              formName={`ProductAddToBag-${productInfo.generalProductId}`}
              miscInfo={colorProduct.miscInfo}
              // onPickUpOpenClick={onPickUpOpenClick}
            />
          )}
          <div className="fulfillment-section">
            <FulfillmentSection
              btnClassName="added-to-bag"
              dataLocator={getLocator('global_addtocart_Button')}
              buttonLabel={plpLabels.addToBag}
              currentProduct={currentProduct}
            />
          </div>
          {isPickupModalOpen ? <PickupStoreModal /> : null}
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">PROMO AREA 3</div>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">
            <RichText richTextHtml={longDescription} />
          </div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">COMPLETE THE LOOK</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">YOU MAY ALSO LIKE</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">RECENTLY VIEWED</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">MY STYLE PLACE</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">RATINGS AND REVIEWS</div>
        </Col>
      </Row>
      {/* <PickupStoreModal /> */}
    </div>
  );
};

ProductDetailView.propTypes = {
  className: PropTypes.string,
  addToBagError: PropTypes.string,
  handleAddToBag: PropTypes.func.isRequired,
  productDetails: PropTypes.shape({}),
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE,
  longDescription: PropTypes.string,
  breadCrumbs: PropTypes.shape({}),
  pdpLabels: PropTypes.shape({}),
  currency: PropTypes.string,
  plpLabels: PropTypes.shape({
    lbl_sort: PropTypes.string,
  }),
  isPickupModalOpen: PropTypes.bool,
};

ProductDetailView.defaultProps = {
  className: '',
  productDetails: {},
  longDescription: '',
  breadCrumbs: {},
  currency: '',
  plpLabels: {
    lbl_sort: '',
  },
  productInfo: {},
  pdpLabels: {},
  addToBagError: '',
  isPickupModalOpen: false,
};

export default withStyles(ProductDetailView, ProductDetailStyle);
