import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, getLocator, getBrand, isCanada } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { PriceCurrency } from '@tcp/core/src/components/common/molecules';
import DamImage from '../../../../../../common/atoms/DamImage';
import ProductInformationStyle from '../styles/ProductInformation.style';

// @flow

type Props = {
  data: Object,
  labels: any,
  quantity: String,
  inheritedStyles: Object,
  isDoubleAddedToBag: Boolean,
  bagLoading: Boolean,
  isInternationalShipping: Boolean,
};

const showPoints = isInternationalShipping => {
  return !isCanada() && !isInternationalShipping;
};

const showItemPoints = (bagLoading, data) => {
  return !bagLoading ? data.itemPoints : <LoaderSkelton width="50px" />;
};

const ProductInformation = ({
  data,
  labels,
  inheritedStyles,
  quantity,
  isDoubleAddedToBag,
  bagLoading,
  isInternationalShipping,
}: Props) => {
  return (
    <ProductInformationStyle inheritedStyles={inheritedStyles}>
      <Row tagName="ul" className="product">
        <Col
          tagName="li"
          key="productDetails"
          className="product-logo"
          colSize={{ small: 2, medium: 2, large: 3 }}
        >
          {/* <Image
            alt="Product"
            className="product-image"
            src={data.skuInfo.imageUrl}
            data-locator="addedtobag-productimage"
          /> */}
          <DamImage
            imgData={{
              alt: 'Product',
              url: data.skuInfo.imageUrl,
            }}
            className="product-image"
            data-locator="addedtobag-productimage"
            isProductImage
          />
          {!data.isGiftCard && (
            <Image
              alt="Brand"
              className="brand-image"
              src={
                getBrand() === 'gym'
                  ? getIconPath(`header__brand-tab-gymboree`)
                  : getIconPath(`header__brand-tab--${getBrand()}`)
              }
              data-locator={getLocator('header__brand-tab--tcp')}
            />
          )}
        </Col>
        <Col tagName="li" key="productDetails" colSize={{ small: 4, medium: 6, large: 9 }}>
          <Row tagName="ul" className="product-details">
            <Col
              tagName="li"
              key="product-title"
              className="productImgBrand"
              colSize={{ small: 6, medium: 8, large: 12 }}
            >
              <BodyCopy
                tag="span"
                fontSize="fs14"
                fontWeight={['semibold']}
                textAlign="left"
                className="product-title"
                dataLocator="addedtobag-productname"
              >
                {data.productName}
              </BodyCopy>
            </Col>
          </Row>
          <Row tagName="ul" className="product-description">
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 2, medium: 3, large: 4 }}
            >
              <BodyCopy tag="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {data.isGiftCard === true ? `${labels.giftDesign}: ` : `${labels.colorLabel}: `}
              </BodyCopy>
            </Col>
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 4, medium: 5, large: 8 }}
            >
              <BodyCopy
                tag="span"
                fontSize="fs13"
                textAlign="left"
                className="itemDesc"
                dataLocator="addedtobag-productcolor"
              >
                {data.skuInfo.color.name}
              </BodyCopy>
            </Col>
          </Row>
          <Row tagName="ul" className="product-description">
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 2, medium: 3, large: 4 }}
            >
              <BodyCopy tag="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {data.isGiftCard === true ? `${labels.giftValue}: ` : `${labels.sizeLabel}: `}
              </BodyCopy>
            </Col>
            <Col tagName="li" key="product-title" colSize={{ small: 4, medium: 5, large: 8 }}>
              <BodyCopy
                tag="span"
                fontSize="fs13"
                textAlign="left"
                className="itemDesc"
                dataLocator="addedtobag-productsize"
              >
                {`${data.skuInfo.size} `}
                {!data.skuInfo.fit ? ' ' : data.skuInfo.fit}
              </BodyCopy>
            </Col>
          </Row>
          {
            <Row tagName="ul" className="product-description">
              <Col
                tagName="li"
                key="product-title"
                className="itemList"
                colSize={{ small: 2, medium: 3, large: 4 }}
              >
                <BodyCopy tag="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                  {labels.qtyLabel}
                  {':'}
                </BodyCopy>
              </Col>
              <Col
                tagName="li"
                key="product-title"
                className="itemList"
                colSize={{ small: 4, medium: 5, large: 8 }}
              >
                <BodyCopy
                  tag="span"
                  fontSize="fs13"
                  textAlign="left"
                  className="itemDesc"
                  dataLocator="addedtobag-productqty"
                >
                  {quantity || data.quantity}
                </BodyCopy>
              </Col>
            </Row>
          }
          {isDoubleAddedToBag && (
            <>
              <Row tagName="ul" className="product-description">
                <Col
                  tagName="li"
                  key="product-title"
                  className="itemList"
                  colSize={{ small: 2, medium: 3, large: 4 }}
                >
                  <BodyCopy tag="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                    {labels.price}
                    {':'}
                  </BodyCopy>
                </Col>
                <Col
                  tagName="li"
                  key="product-title"
                  className="itemList"
                  colSize={{ small: 4, medium: 5, large: 8 }}
                >
                  <BodyCopy
                    tag="span"
                    fontSize="fs13"
                    textAlign="left"
                    className="itemDesc"
                    dataLocator="addedtobag-productprice"
                    fontWeight={['semibold']}
                  >
                    {!bagLoading ? (
                      <PriceCurrency price={data.listPrice} />
                    ) : (
                      <LoaderSkelton width="50px" />
                    )}
                  </BodyCopy>
                </Col>
              </Row>
              {showPoints(isInternationalShipping) && (
                <Row tagName="ul" className="product-description">
                  <Col
                    tagName="li"
                    key="product-title"
                    className="itemList"
                    colSize={{ small: 2, medium: 3, large: 4 }}
                  >
                    <BodyCopy tag="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                      {labels.points}
                      {':'}
                    </BodyCopy>
                  </Col>
                  <Col
                    tagName="li"
                    key="product-title"
                    className="itemList"
                    colSize={{ small: 4, medium: 5, large: 8 }}
                  >
                    <BodyCopy
                      tag="span"
                      fontSize="fs13"
                      textAlign="left"
                      className="itemDesc"
                      dataLocator="addedtobag-productprice"
                      color="orange.800"
                      fontWeight={['semibold']}
                    >
                      {showItemPoints(bagLoading, data)}
                    </BodyCopy>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Col>
      </Row>
    </ProductInformationStyle>
  );
};

export default ProductInformation;
