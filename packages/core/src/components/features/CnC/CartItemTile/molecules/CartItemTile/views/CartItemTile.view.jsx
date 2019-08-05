import React from 'react';
import PropTypes from 'prop-types';
import ProductEditForm from '@tcp/web/src/components/features/CnC/MiniBag/molecules/ProductCustomizeForm/ProductCustomizeForm';
import endpoints from '../../../../../../../service/endpoint';
import { Image, Row, BodyCopy, Col } from '../../../../../../common/atoms';
import { getIconPath, getLocator } from '../../../../../../../utils';
import ProductInformationStyle from '../styles/CartItemTile.style';

class ProductTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
    this.item = {
      itemInfo: {
        quantity: 4,
        itemId: '3001550090',
        itemPoints: 234,
        listPrice: 78,
        offerPrice: 78,
        wasPrice: 19.5,
        salePrice: 19.5,
      },
      miscInfo: {
        isOnlineOnly: false,
        isBopisEligible: true,
        isBossEligible: true,
        badge: { matchBadge: false, defaultBadge: '' },
        store: null,
        storeId: null,
        storeAddress: null,
        storePhoneNumber: null,
        vendorColorDisplayId: '3000627_635',
        storeItemsCount: 0,
        orderItemType: 'ECOM',
      },
      productInfo: {
        itemPartNumber: '1234',
      },
    };
  }

  render() {
    const { isEdit } = this.state;
    const { productDetail, labels } = this.props;
    const initialValues = {
      color: { name: productDetail.color },
      fit: productDetail.fit,
      size: productDetail.size,
    };
    return (
      <ProductInformationStyle>
        <Row fullBleed className="product">
          <Col key="productDetails" colSize={{ small: 2, medium: 2, large: 3 }}>
            <Image
              alt="Product"
              className="product-image"
              src={endpoints.global.baseURI + productDetail.imagePath}
              data-locator="addedtobag-productimage"
            />
            {!productDetail.isGiftItem && (
              <Image
                alt="Brand"
                className="brand-image"
                src={
                  productDetail.itemBrand === 'TCP'
                    ? getIconPath(`header__brand-tab--tcp`)
                    : getIconPath('header__brand-tab-gymboree')
                }
                data-locator={getLocator('header__brand-tab--tcp')}
              />
            )}
          </Col>
          <Col key="productDetails" colSize={{ small: 4, medium: 6, large: 9 }}>
            <Row>
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <BodyCopy
                  fontFamily="secondary"
                  tag="span"
                  fontSize="fs10"
                  fontWeight={['extrabold']}
                  dataLocator="addedtobag-productname"
                >
                  {'Online Exclusive'}
                </BodyCopy>
              </Col>
            </Row>
            <Row>
              <Col className="productImgBrand" colSize={{ small: 6, medium: 8, large: 12 }}>
                <BodyCopy
                  fontFamily="secondary"
                  tag="span"
                  fontSize="fs14"
                  fontWeight={['extrabold']}
                  dataLocator="addedtobag-productname"
                >
                  {productDetail.name}
                </BodyCopy>
              </Col>
            </Row>
            {!isEdit ? (
              <React.Fragment>
                <Row className="padding-top-10">
                  <div className="itemList">
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      fontWeight={['extrabold']}
                      textAlign="left"
                    >
                      {productDetail.isGiftItem === true ? `${labels.design}` : `${labels.color}`}
                      {':'}
                    </BodyCopy>
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      className="itemDesc"
                      dataLocator="addedtobag-productcolor"
                    >
                      {` ${productDetail.color} | `}
                    </BodyCopy>
                  </div>

                  {productDetail.fit && (
                    <div className="itemList padding-left">
                      <BodyCopy
                        fontFamily="secondary"
                        component="span"
                        fontSize="fs13"
                        fontWeight={['extrabold']}
                      >
                        {`Fit`}
                        {':'}
                      </BodyCopy>
                      <BodyCopy
                        fontFamily="secondary"
                        component="span"
                        fontSize="fs13"
                        className="itemDesc"
                        dataLocator="addedtobag-productsize"
                      >
                        {` ${productDetail.fit} | `}
                      </BodyCopy>
                    </div>
                  )}
                  <div className="itemList padding-left">
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      fontWeight={['extrabold']}
                    >
                      {`${labels.size}`}
                      {':'}
                    </BodyCopy>
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      className="itemDesc"
                      dataLocator="addedtobag-productsize"
                    >
                      {` ${productDetail.size}`}
                    </BodyCopy>
                  </div>

                  <div className="itemList padding-left">
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      fontWeight={['extrabold']}
                    >
                      {` ${labels.qty}`}
                      {':'}
                    </BodyCopy>
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      className="itemDesc"
                      dataLocator="addedtobag-productqty"
                    >
                      {` ${productDetail.qty}`}
                    </BodyCopy>
                  </div>
                  <BodyCopy
                    fontFamily="secondary"
                    fontSize="fs12"
                    component="div"
                    className="padding-left-10"
                    onClick={() => {
                      this.setState({ isEdit: true });
                    }}
                  >
                    <u>Edit</u>
                  </BodyCopy>
                </Row>
              </React.Fragment>
            ) : (
              <ProductEditForm
                item={this.item}
                colorFitsSizesMap={undefined}
                handleSubmit={() => {}}
                initialValues={initialValues}
              />
            )}
            <Row className="padding-top-10">
              <Col colSize={{ large: 4, medium: 3, small: 2 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs13"
                  fontWeight={['extrabold']}
                >
                  {`${labels.price}: `}
                </BodyCopy>
              </Col>
              <Col colSize={{ small: 2, medium: 3, large: 8 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs13"
                  fontWeight={['extrabold']}
                >
                  {productDetail.price}
                </BodyCopy>
              </Col>
            </Row>
            <Row>
              <Col colSize={{ large: 4, medium: 3, small: 2 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs13"
                  fontWeight={['extrabold']}
                >
                  Points:
                </BodyCopy>
              </Col>
              <Col colSize={{ small: 2, medium: 3, large: 8 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs13"
                  fontWeight={['extrabold']}
                >
                  {productDetail.myPlacePoints}
                </BodyCopy>
              </Col>
            </Row>
            <Row className="padding-top-15 padding-bottom-20" fullBleed>
              <Col className="padding-left-13" colSize={{ small: 4, medium: 6, large: 8 }}>
                <BodyCopy
                  fontFamily="secondary"
                  color="gray.600"
                  component="span"
                  fontSize="fs10"
                  fontWeight={['extrabold']}
                >
                  I will pickup store at union square today
                </BodyCopy>
              </Col>
              <Col colSize={{ small: 1, medium: 1, large: 3 }}>
                <BodyCopy fontFamily="secondary" fontSize="fs12" component="span">
                  <u>Save for later</u>
                </BodyCopy>
              </Col>
            </Row>
          </Col>
        </Row>
      </ProductInformationStyle>
    );
  }
}

ProductTile.propTypes = {
  productDetail: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
};

export default ProductTile;
