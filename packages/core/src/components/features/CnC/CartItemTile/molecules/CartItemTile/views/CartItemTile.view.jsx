import React from 'react';
import PropTypes from 'prop-types';
import ProductEditForm from '@tcp/web/src/components/features/CnC/MiniBag/molecules/ProductCustomizeForm/ProductCustomizeForm';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CartItemRadioButtons from '@tcp/core/src/components/features/CnC/CartItemTile/molecules/CartItemRadioButtons/views/CartItemRadioButtons';
import endpoints from '../../../../../../../service/endpoint';
import { Image, Row, BodyCopy, Col } from '../../../../../../common/atoms';
import { getIconPath, getLocator } from '../../../../../../../utils';
import getModifiedString from '../../../utils';
import styles from '../styles/CartItemTile.style';

class CartItemTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  getBossBopisDetailsForMiniBag = (productDetail, labels) => {
    return (
      <Col className="padding-left-13" colSize={{ small: 4, medium: 6, large: 8 }}>
        {productDetail.miscInfo.store && (
          <BodyCopy
            fontFamily="secondary"
            color="gray.600"
            component="span"
            fontSize="fs10"
            fontWeight={['extrabold']}
          >
            {getModifiedString(
              labels,
              productDetail.miscInfo.store,
              productDetail.miscInfo.orderItemType,
              productDetail.miscInfo.bossStartDate,
              productDetail.miscInfo.bossEndDate
            )}
          </BodyCopy>
        )}
      </Col>
    );
  };

  getBadgeDetails = productDetail => {
    return (
      <Row className="product-detail-row">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <BodyCopy
            fontFamily="secondary"
            tag="span"
            fontSize="fs10"
            fontWeight={['extrabold']}
            dataLocator="addedtobag-productname"
          >
            {productDetail.miscInfo.badge}
          </BodyCopy>
        </Col>
      </Row>
    );
  };

  getColorLabel = (productDetail, labels) => {
    return productDetail.itemInfo.isGiftItem === true ? `${labels.design}:` : `${labels.color}:`;
  };

  getPointsColor = pageView => {
    return pageView !== 'myBag' ? 'gray.900' : 'orange.800';
  };

  getProductItemUpcNumber = (productDetail, pageView) => {
    if (pageView === 'myBag') {
      return (
        <Row className="product-detail-row">
          <Col className="productImgBrand" colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy
              fontFamily="secondary"
              tag="span"
              fontSize="fs10"
              dataLocator={getLocator('cart_item_upc')}
            >
              {`Upc: ${productDetail.productInfo.upc}`}
            </BodyCopy>
          </Col>
        </Row>
      );
    }
    return '';
  };

  getProductPriceList = (productDetail, pageView) => {
    return (
      <Col className="value-responsive" colSize={{ small: 2, medium: 3, large: 8 }}>
        <BodyCopy
          fontFamily="secondary"
          component="span"
          fontSize="fs12"
          dataLocator={getLocator('cart_item_price')}
          fontWeight={['extrabold']}
        >
          {pageView === 'myBag'
            ? `$${productDetail.itemInfo.unitOfferPrice}`
            : `$${productDetail.itemInfo.price}`}
        </BodyCopy>
        {pageView === 'myBag' && productDetail.itemInfo.itemPrice !== productDetail.itemInfo.price && (
          <BodyCopy className="list-price" fontFamily="secondary" component="span" fontSize="fs12">
            {`$${productDetail.itemInfo.itemPrice}`}
          </BodyCopy>
        )}
      </Col>
    );
  };

  render() {
    const { isEdit } = this.state;
    const { productDetail, labels, className, pageView } = this.props;
    const initialValues = {
      color: { name: productDetail.itemInfo.color },
      fit: productDetail.itemInfo.fit,
      size: productDetail.itemInfo.size,
    };
    return (
      <div className={className}>
        <Row
          fullBleed
          className={['product', pageView === 'myBag' ? 'product-tile-wrapper' : ''].join(' ')}
        >
          <Col
            key="productDetails"
            className="align-product-img product-brand-img-wrapper"
            colSize={{ small: 2, medium: 2, large: 3 }}
          >
            <Image
              alt={labels.productImageAlt}
              className="product-image"
              src={endpoints.global.baseURI + productDetail.itemInfo.imagePath}
              data-locator={getLocator('cart_item_image')}
            />
            {!productDetail.itemInfo.isGiftItem && (
              <Image
                alt={labels.productBandAlt}
                className="brand-image"
                src={
                  productDetail.itemInfo.itemBrand === 'TCP'
                    ? getIconPath(`header__brand-tab--tcp`)
                    : getIconPath('header__brand-tab-gymboree')
                }
                data-locator={getLocator('cart_item_brand_logo')}
              />
            )}
          </Col>
          <Col
            className="bag-product-detail-wrapper"
            key="productDetails"
            colSize={{ small: 4, medium: 6, large: 9 }}
          >
            {productDetail.miscInfo.badge && this.getBadgeDetails(productDetail)}
            <Row className="product-detail-row">
              <Col className="productImgBrand" colSize={{ small: 6, medium: 8, large: 12 }}>
                <BodyCopy
                  fontFamily="secondary"
                  tag="span"
                  fontSize="fs14"
                  fontWeight={['extrabold']}
                  dataLocator={getLocator('cart_item_title')}
                >
                  {productDetail.itemInfo.name}
                </BodyCopy>
              </Col>
            </Row>
            {this.getProductItemUpcNumber(productDetail, pageView)}
            {!isEdit ? (
              <React.Fragment>
                <Row className="product-detail-row padding-top-10 color-map-size-fit">
                  <div>
                    <div className="color-size-fit-label">
                      <BodyCopy
                        fontFamily="secondary"
                        component="span"
                        fontSize="fs12"
                        fontWeight={['extrabold']}
                        textAlign="left"
                      >
                        {this.getColorLabel(productDetail, labels)}
                      </BodyCopy>
                    </div>
                    <BodyCopy
                      className="padding-left-10"
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                      dataLocator={getLocator('cart_item_color')}
                    >
                      {`${productDetail.itemInfo.color}`}
                    </BodyCopy>
                    <BodyCopy
                      className="color-fit-size-separator"
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                    >
                      |
                    </BodyCopy>
                  </div>

                  {productDetail.itemInfo.fit && (
                    <div>
                      <div className="color-size-fit-label color-fit-size-desktop">
                        <BodyCopy
                          fontFamily="secondary"
                          component="span"
                          fontSize="fs12"
                          fontWeight={['extrabold']}
                        >
                          {labels.fit}
                          {':'}
                        </BodyCopy>
                      </div>
                      <BodyCopy
                        className="padding-left-10"
                        fontFamily="secondary"
                        component="span"
                        fontSize="fs12"
                        dataLocator="addedtobag-productsize"
                      >
                        {`${productDetail.itemInfo.fit}`}
                      </BodyCopy>
                      <BodyCopy
                        className="color-fit-size-separator"
                        fontFamily="secondary"
                        component="span"
                        fontSize="fs12"
                      >
                        |
                      </BodyCopy>
                    </div>
                  )}
                  <div>
                    <div className="color-size-fit-label color-fit-size-desktop">
                      <BodyCopy
                        fontFamily="secondary"
                        component="span"
                        fontSize="fs12"
                        fontWeight={['extrabold']}
                      >
                        {`${labels.size}`}
                        {':'}
                      </BodyCopy>
                    </div>
                    <BodyCopy
                      className="padding-left-10"
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                      dataLocator={getLocator('cart_item_size')}
                    >
                      {`${productDetail.itemInfo.size}`}
                    </BodyCopy>
                    <BodyCopy
                      className="color-fit-size-separator"
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                    >
                      |
                    </BodyCopy>
                  </div>

                  <div>
                    <div className="color-size-fit-label color-fit-size-desktop">
                      <BodyCopy
                        fontFamily="secondary"
                        component="span"
                        fontSize="fs12"
                        fontWeight={['extrabold']}
                      >
                        {` ${labels.qty}`}
                        {':'}
                      </BodyCopy>
                    </div>
                    <BodyCopy
                      className="padding-left-10"
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                      dataLocator="addedtobag-productqty"
                    >
                      {`${productDetail.itemInfo.qty}`}
                    </BodyCopy>
                  </div>
                  <BodyCopy
                    fontFamily="secondary"
                    fontSize="fs12"
                    component="div"
                    dataLocator={getLocator('cart_item_edit_link')}
                    className="padding-left-10 responsive-edit-css"
                    onClick={() => {
                      if (pageView !== 'myBag') {
                        this.setState({ isEdit: true });
                      }
                    }}
                  >
                    <u>{labels.edit}</u>
                  </BodyCopy>
                </Row>
              </React.Fragment>
            ) : (
              <ProductEditForm
                item={productDetail}
                colorFitsSizesMap={undefined}
                handleSubmit={() => {}}
                initialValues={initialValues}
                labels={labels}
              />
            )}
            <Row className="product-detail-row label-responsive-wrapper padding-top-10">
              <Col className="label-responsive" colSize={{ large: 4, medium: 3, small: 2 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs12"
                  fontWeight={['extrabold']}
                >
                  {`${labels.price}: `}
                </BodyCopy>
              </Col>
              {this.getProductPriceList(productDetail, pageView)}
            </Row>
            <Row className="product-detail-row label-responsive-wrapper">
              <Col className="label-responsive" colSize={{ large: 4, medium: 3, small: 2 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs12"
                  fontWeight={['extrabold']}
                >
                  {`${labels.points}:`}
                </BodyCopy>
              </Col>
              <Col className="value-responsive" colSize={{ small: 2, medium: 3, large: 8 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs12"
                  fontWeight={['extrabold']}
                  color={this.getPointsColor(pageView)}
                  dataLocator={getLocator('cart_item_points')}
                >
                  {productDetail.itemInfo.myPlacePoints}
                </BodyCopy>
              </Col>
            </Row>
            <Row className="padding-top-15 padding-bottom-20" fullBleed>
              {pageView !== 'myBag' && this.getBossBopisDetailsForMiniBag(productDetail, labels)}
              <Col className="save-for-later-label" colSize={{ small: 1, medium: 1, large: 3 }}>
                <BodyCopy fontFamily="secondary" fontSize="fs12" component="span">
                  <u>{labels.saveForLater}</u>
                </BodyCopy>
              </Col>
              {pageView === 'myBag' && (
                <BodyCopy
                  className="price-label"
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs16"
                  fontWeight={['extrabold']}
                  dataLocator={getLocator('cart_item_total_price')}
                >
                  {`$${productDetail.itemInfo.price}`}
                </BodyCopy>
              )}
            </Row>
          </Col>
        </Row>
        {pageView === 'myBag' && (
          <Row fullBleed>
            <CartItemRadioButtons productDetail={productDetail} labels={labels} />
          </Row>
        )}
      </div>
    );
  }
}

CartItemTile.defaultProps = {
  pageView: '',
};

CartItemTile.propTypes = {
  productDetail: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  pageView: PropTypes.string,
};

export default withStyles(CartItemTile, styles);
export { CartItemTile as CartItemTileVanilla };
