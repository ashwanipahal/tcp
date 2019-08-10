import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import endpoints from '../../../../../../../service/endpoint';
import {
  ProductName,
  ProductDesc,
  OuterContainer,
  ImgWrapper,
  ImageStyle,
  ProductDescription,
  ProductSubDetails,
  ProductSubDetailLabel,
  ProductListPrice,
  EditButton,
} from '../styles/CartItemTile.style.native';
import { getLocator } from '../../../../../../../utils';

const ProductInformation = props => {
  const { productDetail, labels } = props;
  return (
    <OuterContainer>
      <ImgWrapper>
        <ImageStyle
          data-locator={getLocator('cart_item_image')}
          source={{ uri: endpoints.global.baseURI + productDetail.itemInfo.imagePath }}
        />
        {!productDetail.itemInfo.isGiftItem && (
          <ImageStyle
            data-locator={getLocator('cart_item_brand_logo')}
            source={{
              uri: `${endpoints.global.baseURI}/static/images/${productDetail.itemInfo.itemBrand}`,
            }}
          />
        )}
      </ImgWrapper>
      <ProductDescription>
        <ProductName>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            dataLocator={getLocator('cart_item_title')}
            fontWeight={['semibold']}
            text={productDetail.itemInfo.name}
          />
        </ProductName>
        <ProductSubDetails>
          <ProductDesc>
            <ProductSubDetailLabel>
              <BodyCopy
                fontSize="fs13"
                fontWeight={['semibold']}
                textAlign="left"
                text={
                  productDetail.itemInfo.isGiftItem === true
                    ? `${labels.design}: `
                    : `${labels.color}: `
                }
              />
            </ProductSubDetailLabel>
            <BodyCopy
              fontFamily="secondary"
              color="gray.800"
              fontSize="fs13"
              dataLocator={getLocator('cart_item_color')}
              text={productDetail.itemInfo.color}
            />
          </ProductDesc>
          <ProductDesc>
            <ProductSubDetailLabel>
              <BodyCopy
                fontSize="fs13"
                fontWeight={['semibold']}
                textAlign="left"
                text={
                  productDetail.itemInfo.isGiftItem === true
                    ? `${labels.giftValue}: `
                    : `${labels.size}: `
                }
              />
            </ProductSubDetailLabel>
            <BodyCopy
              color="gray.800"
              fontFamily="secondary"
              fontSize="fs13"
              dataLocator={getLocator('cart_item_size')}
              text={`${productDetail.itemInfo.size} `}
            />
            <BodyCopy
              fontSize="fs13"
              color="gray.800"
              fontFamily="secondary"
              text={
                !productDetail.itemInfo.fit || productDetail.itemInfo.fit === 'Regular'
                  ? ' '
                  : productDetail.itemInfo.fit
              }
            />
          </ProductDesc>
          <ProductDesc>
            <ProductSubDetailLabel>
              <BodyCopy
                fontSize="fs13"
                fontWeight={['semibold']}
                textAlign="left"
                text={`${labels.qty}: `}
              />
            </ProductSubDetailLabel>
            <BodyCopy
              color="gray.800"
              fontFamily="secondary"
              fontSize="fs13"
              text={productDetail.itemInfo.qty}
            />
          </ProductDesc>
          <ProductDesc>
            <ProductSubDetailLabel>
              <BodyCopy
                fontSize="fs13"
                fontWeight={['semibold']}
                textAlign="left"
                text={`${labels.price}: `}
              />
            </ProductSubDetailLabel>
            <BodyCopy
              fontSize="fs13"
              fontWeight={['semibold']}
              textAlign="left"
              dataLocator={getLocator('cart_item_price')}
              text={`$${productDetail.itemInfo.price}`}
            />
            <ProductListPrice>
              <BodyCopy
                color="gray.800"
                fontFamily="secondary"
                fontSize="fs13"
                text={
                  productDetail.itemInfo.price !== productDetail.itemInfo.itemPrice
                    ? `$${productDetail.itemInfo.itemPrice}`
                    : ''
                }
              />
            </ProductListPrice>
          </ProductDesc>
          <ProductDesc>
            <ProductSubDetailLabel>
              <BodyCopy
                fontSize="fs13"
                fontWeight={['semibold']}
                textAlign="left"
                text={`${labels.points}: `}
              />
            </ProductSubDetailLabel>
            <BodyCopy
              color="orange.800"
              fontFamily="secondary"
              fontSize="fs13"
              dataLocator={getLocator('cart_item_points')}
              text={productDetail.itemInfo.myPlacePoints}
            />
            <EditButton>
              <BodyCopy
                color="gray.900"
                fontFamily="secondary"
                fontSize="fs12"
                dataLocator={getLocator('cart_item_edit_link')}
                textDecorationLine="underline"
                text={labels.edit}
              />
            </EditButton>
          </ProductDesc>
        </ProductSubDetails>
      </ProductDescription>
    </OuterContainer>
  );
};

ProductInformation.propTypes = {
  productDetail: PropTypes.shape,
  labels: PropTypes.shape,
};
ProductInformation.defaultProps = {
  productDetail: {},
  labels: {},
};
export default withStyles(ProductInformation);
export { ProductInformation as ProductInformationVanilla };
