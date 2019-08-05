/* eslint-disable max-lines */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, getLocator } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import ProductInformationStyle from '../styles/ProductTile.style';

// eslint-disable-next-line complexity
// eslint-disable-next-line sonarjs/cognitive-complexity
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {data.isGiftCard === true ? `Design` : `${labels.colorLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productcolor"
              >
                {` ${data.skuInfo.color.name} | `}
              </BodyCopy>
            </div>

            <div className="itemList padding-left">
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {data.isGiftCard === true ? ` Size` : ` ${labels.sizeLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {` ${labels.qtyLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productqty"
              >
                {` ${data.quantity}`}
              </BodyCopy>
            </div>
            <Button className="edit-button">
              <u>Edit</u>
            </Button>
          </Row>
          <Row className="padding-top-10">
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Price:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                $124
              </BodyCopy>
            </Col>
          </Row>
          <Row>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Points:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                24
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {data.isGiftCard === true ? `Design` : `${labels.colorLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productcolor"
              >
                {` ${data.skuInfo.color.name} | `}
              </BodyCopy>
            </div>

            <div className="itemList padding-left">
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {data.isGiftCard === true ? ` Size` : ` ${labels.sizeLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {` ${labels.qtyLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productqty"
              >
                {` ${data.quantity}`}
              </BodyCopy>
            </div>
            <Button className="edit-button">
              <u>Edit</u>
            </Button>
          </Row>
          <Row className="padding-top-10">
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Price:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                $124
              </BodyCopy>
            </Col>
          </Row>
          <Row>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Points:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                24
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {data.isGiftCard === true ? `Design` : `${labels.colorLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productcolor"
              >
                {` ${data.skuInfo.color.name} | `}
              </BodyCopy>
            </div>

            <div className="itemList padding-left">
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {data.isGiftCard === true ? ` Size` : ` ${labels.sizeLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {` ${labels.qtyLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productqty"
              >
                {` ${data.quantity}`}
              </BodyCopy>
            </div>
            <Button className="edit-button">
              <u>Edit</u>
            </Button>
          </Row>
          <Row className="padding-top-10">
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Price:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                $124
              </BodyCopy>
            </Col>
          </Row>
          <Row>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Points:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                24
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {data.isGiftCard === true ? `Design` : `${labels.colorLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productcolor"
              >
                {` ${data.skuInfo.color.name} | `}
              </BodyCopy>
            </div>

            <div className="itemList padding-left">
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {data.isGiftCard === true ? ` Size` : ` ${labels.sizeLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {` ${labels.qtyLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productqty"
              >
                {` ${data.quantity}`}
              </BodyCopy>
            </div>
            <Button className="edit-button">
              <u>Edit</u>
            </Button>
          </Row>
          <Row className="padding-top-10">
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Price:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                $124
              </BodyCopy>
            </Col>
          </Row>
          <Row>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Points:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                24
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {data.isGiftCard === true ? `Design` : `${labels.colorLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productcolor"
              >
                {` ${data.skuInfo.color.name} | `}
              </BodyCopy>
            </div>

            <div className="itemList padding-left">
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {data.isGiftCard === true ? ` Size` : ` ${labels.sizeLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {` ${labels.qtyLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productqty"
              >
                {` ${data.quantity}`}
              </BodyCopy>
            </div>
            <Button className="edit-button">
              <u>Edit</u>
            </Button>
          </Row>
          <Row className="padding-top-10">
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Price:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                $124
              </BodyCopy>
            </Col>
          </Row>
          <Row>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Points:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                24
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {data.isGiftCard === true ? `Design` : `${labels.colorLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productcolor"
              >
                {` ${data.skuInfo.color.name} | `}
              </BodyCopy>
            </div>

            <div className="itemList padding-left">
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {data.isGiftCard === true ? ` Size` : ` ${labels.sizeLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {` ${labels.qtyLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productqty"
              >
                {` ${data.quantity}`}
              </BodyCopy>
            </div>
            <Button className="edit-button">
              <u>Edit</u>
            </Button>
          </Row>
          <Row className="padding-top-10">
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Price:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                $124
              </BodyCopy>
            </Col>
          </Row>
          <Row>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Points:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                24
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {data.isGiftCard === true ? `Design` : `${labels.colorLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productcolor"
              >
                {` ${data.skuInfo.color.name} | `}
              </BodyCopy>
            </div>

            <div className="itemList padding-left">
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {data.isGiftCard === true ? ` Size` : ` ${labels.sizeLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
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
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                {` ${labels.qtyLabel}`}
                {':'}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs13"
                className="itemDesc"
                dataLocator="addedtobag-productqty"
              >
                {` ${data.quantity}`}
              </BodyCopy>
            </div>
            <Button className="edit-button">
              <u>Edit</u>
            </Button>
          </Row>
          <Row className="padding-top-10">
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Price:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                $124
              </BodyCopy>
            </Col>
          </Row>
          <Row>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                Points:
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 2, medium: 3, large: 8 }}>
              <BodyCopy component="span" fontSize="fs13" fontWeight={['semibold']}>
                24
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
    </ProductInformationStyle>
  );
};

export default ProductTile;
