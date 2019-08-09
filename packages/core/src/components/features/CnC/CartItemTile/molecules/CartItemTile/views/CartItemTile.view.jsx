import React from 'react';
import PropTypes from 'prop-types';
import ProductEditForm from '@tcp/web/src/components/features/CnC/MiniBag/molecules/ProductCustomizeForm/ProductCustomizeForm';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';
import endpoints from '../../../../../../../service/endpoint';
import { Image, Row, BodyCopy, Col } from '../../../../../../common/atoms';

import { getIconPath, getLocator } from '../../../../../../../utils';
import getModifiedString from '../../../utils';
import ProductInformationStyle from '../styles/CartItemTile.style';

class ProductTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  render() {
    const { isEdit } = this.state;
    const { productDetail, labels } = this.props;
    const initialValues = {
      color: { name: productDetail.itemInfo.color },
      fit: productDetail.itemInfo.fit,
      size: productDetail.itemInfo.size,
    };
    return (
      <ProductInformationStyle>
        <ErrorMessage error="This item is unavailable" />

        <Row fullBleed className="product">
          <Col
            key="productDetails"
            className="image-wrapper"
            colSize={{ small: 2, medium: 2, large: 3 }}
          >
            <Image
              alt={labels.productImageAlt}
              className="product-image"
              src={endpoints.global.baseURI + productDetail.itemInfo.imagePath}
              data-locator="addedtobag-productimage"
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
                data-locator={getLocator('header__brand-tab--tcp')}
              />
            )}
          </Col>
          <Col key="productDetails" colSize={{ small: 4, medium: 6, large: 9 }}>
            {productDetail.miscInfo.badge && (
              <Row>
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
            )}
            <Row>
              <Col className="productImgBrand" colSize={{ small: 6, medium: 8, large: 12 }}>
                <BodyCopy
                  fontFamily="secondary"
                  tag="span"
                  fontSize="fs14"
                  fontWeight={['extrabold']}
                  dataLocator="addedtobag-productname"
                >
                  {productDetail.itemInfo.name}
                </BodyCopy>
              </Col>
            </Row>
            {!isEdit ? (
              <React.Fragment>
                <Row className="padding-top-10">
                  <div>
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                      fontWeight={['extrabold']}
                      textAlign="left"
                    >
                      {productDetail.itemInfo.isGiftItem === true
                        ? `${labels.design}`
                        : `${labels.color}`}
                      {':'}
                    </BodyCopy>
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                      className="itemDesc"
                      dataLocator="addedtobag-productcolor"
                    >
                      {` ${productDetail.itemInfo.color} | `}
                    </BodyCopy>
                  </div>

                  {productDetail.itemInfo.fit && (
                    <div className="padding-left">
                      <BodyCopy
                        fontFamily="secondary"
                        component="span"
                        fontSize="fs12"
                        fontWeight={['extrabold']}
                      >
                        {labels.fit}
                        {':'}
                      </BodyCopy>
                      <BodyCopy
                        fontFamily="secondary"
                        component="span"
                        fontSize="fs12"
                        className="itemDesc"
                        dataLocator="addedtobag-productsize"
                      >
                        {` ${productDetail.itemInfo.fit} | `}
                      </BodyCopy>
                    </div>
                  )}
                  <div className="padding-left">
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                      fontWeight={['extrabold']}
                    >
                      {`${labels.size}`}
                      {':'}
                    </BodyCopy>
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                      className="itemDesc"
                      dataLocator="addedtobag-productsize"
                    >
                      {` ${productDetail.itemInfo.size}`}
                    </BodyCopy>
                  </div>

                  <div className="padding-left">
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                      fontWeight={['extrabold']}
                    >
                      {` ${labels.qty}`}
                      {':'}
                    </BodyCopy>
                    <BodyCopy
                      fontFamily="secondary"
                      component="span"
                      fontSize="fs12"
                      className="itemDesc"
                      dataLocator="addedtobag-productqty"
                    >
                      {` ${productDetail.itemInfo.qty}`}
                    </BodyCopy>
                  </div>
                  <BodyCopy
                    fontFamily="secondary"
                    fontSize="fs12"
                    component="div"
                    className="padding-left-10 edit-top-padding"
                    onClick={() => {
                      this.setState({ isEdit: true });
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
            <Row className="padding-top-10">
              <Col colSize={{ large: 4, medium: 3, small: 2 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs12"
                  fontWeight={['extrabold']}
                >
                  {`${labels.price}: `}
                </BodyCopy>
              </Col>
              <Col colSize={{ small: 2, medium: 3, large: 8 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs12"
                  fontWeight={['extrabold']}
                >
                  {productDetail.itemInfo.price}
                </BodyCopy>
              </Col>
            </Row>
            <Row>
              <Col colSize={{ large: 4, medium: 3, small: 2 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs12"
                  fontWeight={['extrabold']}
                >
                  {`${labels.points}:`}
                </BodyCopy>
              </Col>
              <Col colSize={{ small: 2, medium: 3, large: 8 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="span"
                  fontSize="fs12"
                  fontWeight={['extrabold']}
                >
                  {productDetail.itemInfo.myPlacePoints}
                </BodyCopy>
              </Col>
            </Row>
            <Row className="padding-top-15 padding-bottom-20" fullBleed>
              <Col className="padding-left-13" colSize={{ small: 4, medium: 5, large: 7 }}>
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
              <Col colSize={{ small: 2, medium: 3, large: 4 }}>
                <BodyCopy fontFamily="secondary" fontSize="fs12" component="span">
                  <u>{labels.saveForLater}</u>
                </BodyCopy>
                <BodyCopy fontFamily="secondary" fontSize="fs12" component="span">
                  <u>update</u>
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
