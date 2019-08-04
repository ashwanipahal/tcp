import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, getLocator } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import ProductEditForm from '../../../../CartItemTile/organisms/ProductCustomizeForm';
import ProductInformationStyle from '../styles/ProductTile.style';

class ProductTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
    this.data = {
      isGiftCard: false,
      brand: 'tcp',
      quantity: 123,
      skuInfo: {
        color: {
          name: 'Black',
        },
        fit: 'regular',
      },
    };
    this.labels = {
      colorLabel: 'Color',
      sizeLabel: 'Size',
      qtyLabel: 'Qty',
    };

    this.item = {
      productInfo: {
        generalProductId: '1281542',
        productPartNumber: '3000627_635',
        skuId: '1282072',
        itemPartNumber: '00193511013253',
        variantNo: '3000627001',
        name: 'Boys Basic Skinny Jeans - Dark Rinse Wash',
        upc: '00193511013253',
        size: '4',
        fit: 'regular',
        pdpUrl: '/us/p/Boys-Basic-Skinny-Jeans---Dark-Rinse-Wash-3000627-635',
        color: { name: 'DKRINSEWSH' },
        isGiftCard: false,
        colorFitSizeDisplayNames: {},
        orderType: 'ECOM',
      },
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
    };
    this.initialValues = { color: { name: 'DKRINSEWSH' }, fit: 'regular', size: '1282072' };
  }

  render() {
    const { isEdit } = this.state;
    return (
      <ProductInformationStyle>
        <Row fullBleed className="product">
          <Col key="productDetails" colSize={{ small: 2, medium: 2, large: 3 }}>
            <Image
              alt="Product"
              className="product-image"
              src="https://dummyimage.com/600x400/000/fff"
              data-locator="addedtobag-productimage"
            />
            {!this.data.isGiftCard && (
              <Image
                alt="Brand"
                className="brand-image"
                src={
                  this.data.brand === 'tcp'
                    ? getIconPath(`header__brand-tab--${this.data.brand}`)
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
                  {'This is product name'}
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
                      {this.data.isGiftCard === true ? `Design` : `${this.labels.colorLabel}`}
                      {':'}
                    </BodyCopy>
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      className="itemDesc"
                      dataLocator="addedtobag-productcolor"
                    >
                      {` ${this.data.skuInfo.color.name} | `}
                    </BodyCopy>
                  </div>

                  <div className="itemList padding-left">
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      fontWeight={['extrabold']}
                    >
                      {this.data.isGiftCard === true ? ` Size` : ` ${this.labels.sizeLabel}`}
                      {':'}
                    </BodyCopy>
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      className="itemDesc"
                      dataLocator="addedtobag-productsize"
                    >
                      {` ${this.data.skuInfo.size}`}
                      {!this.data.skuInfo.fit || this.data.skuInfo.fit === 'regular'
                        ? ' '
                        : this.data.skuInfo.fit}
                      {` | `}
                    </BodyCopy>
                  </div>

                  <div className="itemList padding-left">
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      fontWeight={['extrabold']}
                    >
                      {` ${this.labels.qtyLabel}`}
                      {':'}
                    </BodyCopy>
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs13"
                      className="itemDesc"
                      dataLocator="addedtobag-productqty"
                    >
                      {` ${this.data.quantity}`}
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
                initialValues={this.initialValues}
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
                  Price:
                </BodyCopy>
              </Col>
              <Col colSize={{ small: 2, medium: 3, large: 8 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs13"
                  fontWeight={['extrabold']}
                >
                  $124
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
                  124
                </BodyCopy>
              </Col>
            </Row>
            <Row className="padding-top-15" fullBleed>
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

export default ProductTile;
