import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, getLocator } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import ProductInformationStyle from '../styles/ProductTile.style';

const ProductTile = () => {
  const data = {
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
  const labels = {
    colorLabel: 'Color',
    sizeLabel: 'Size',
    qtyLabel: 'Qty',
  };

  return (
    <ProductInformationStyle>
      <Row className="product">
        <Col key="productDetails" colSize={{ small: 2, medium: 2, large: 3 }}>
          <Image
            alt="Product"
            className="product-image"
            src="https://dummyimage.com/600x400/000/fff"
            data-locator="addedtobag-productimage"
          />
          {!data.isGiftCard && (
            <Image
              alt="Brand"
              className="brand-image"
              src={
                data.brand === 'tcp'
                  ? getIconPath(`header__brand-tab--${data.brand}`)
                  : getIconPath('header__brand-tab-gymboree')
              }
              data-locator={getLocator('header__brand-tab--tcp')}
            />
          )}
        </Col>
        <Col key="productDetails" colSize={{ small: 4, medium: 6, large: 9 }}>
          <Row>
            <Col className="productImgBrand" colSize={{ small: 6, medium: 8, large: 12 }}>
              <BodyCopy
                fontFamily="secondary"
                tag="span"
                fontSize="fs14"
                fontWeight={['semibold']}
                dataLocator="addedtobag-productname"
              >
                {'This is product name'}
              </BodyCopy>
            </Col>
          </Row>
          <Row className="padding-top-10">
            <div className="itemList">
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs13"
                fontWeight={['semibold']}
                textAlign="left"
              >
                {data.isGiftCard === true ? `Design` : `${labels.colorLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productcolor"
              >
                {` ${data.skuInfo.color.name} | `}
              </BodyCopy>
            </div>

            <div className="itemList padding-left">
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs13"
                fontWeight={['semibold']}
              >
                {data.isGiftCard === true ? ` Size` : ` ${labels.sizeLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productsize"
              >
                {` ${data.skuInfo.size}`}
                {!data.skuInfo.fit || data.skuInfo.fit === 'regular' ? ' ' : data.skuInfo.fit}
                {` | `}
              </BodyCopy>
            </div>

            <div className="itemList padding-left">
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs13"
                fontWeight={['semibold']}
              >
                {` ${labels.qtyLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productqty"
              >
                {` ${data.quantity}`}
              </BodyCopy>
            </div>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              component="div"
              className="padding-left-10"
            >
              <u>Edit</u>
            </BodyCopy>
          </Row>
          <Row className="padding-top-10">
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs13"
                fontWeight={['semibold']}
              >
                Price:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs13"
                fontWeight={['semibold']}
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
                fontWeight={['semibold']}
              >
                Points:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs13"
                fontWeight={['semibold']}
              >
                24
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
                fontWeight={['semibold']}
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
};

export default ProductTile;
