import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import Swipeable from 'react-native-swipeable';
import ItemAvailability from '@tcp/core/src/components/features/CnC/common/molecules/ItemAvailability';
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
  ImageBrandStyle,
  ImageGymBrandStyle,
  ImageSoldOutContainer,
  SoldOutLabel,
} from '../styles/CartItemTile.style.native';
import { getLocator } from '../../../../../../../utils';
import CartItemRadioButtons from '../../CartItemRadioButtons';

const gymboreeImage = require('../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../assets/tcp-logo.png');

const getItemStatus = (productDetail, labels) => {
  return <ItemAvailability errorMsg={labels.itemUnavailable} />;
};

const styles = {
  button: {
    padding: 10,
    backgroundColor: '#1d87e5',
  },
};

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
    this.swipeable = React.createRef();
  }

  onContainerPress = () => {
    this.swipeItemRef.close();
  };

  leftButton = () => {
    const { removeCartItem, productDetail } = this.props;
    return (
      <>
        <TouchableOpacity onPress={() => console.log('left button clicked')}>
          <ImageGymBrandStyle
            data-locator={getLocator('cart_item_brand_logo')}
            source={gymboreeImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 10,
          }}
          onPress={() => removeCartItem(productDetail.itemInfo.itemId)}
        >
          <ImageBrandStyle data-locator={getLocator('cart_item_brand_logo')} source={tcpImage} />
        </TouchableOpacity>
      </>
    );
  };

  render() {
    const { productDetail, labels, itemIndex } = this.props;
    return (
      <Swipeable
        onRef={ref => {
          this.swipeable = ref;
        }}
        // ref={this.swipeable}
        rightButtons={[this.leftButton()]}
      >
        <OuterContainer onPress={this.onContainerPress}>
          <BodyCopy
            fontSize="fs10"
            textAlign="center"
            text={getItemStatus(productDetail, labels)}
          />

          <ImgWrapper>
            <ImageSoldOutContainer>
              <ImageStyle
                data-locator={getLocator('cart_item_image')}
                source={{ uri: endpoints.global.baseURI + productDetail.itemInfo.imagePath }}
              />
              {productDetail.miscInfo.availability === 'SOLDOUT' && (
                <SoldOutLabel>
                  <BodyCopy
                    fontFamily="secondary"
                    textAlign="center"
                    fontSize="fs12"
                    color="white"
                    text={labels.soldOut}
                  />
                </SoldOutLabel>
              )}
            </ImageSoldOutContainer>
            {!productDetail.itemInfo.isGiftItem &&
              (productDetail.itemInfo.isGiftItem === 'TCP' ? (
                <ImageBrandStyle
                  data-locator={getLocator('cart_item_brand_logo')}
                  source={tcpImage}
                />
              ) : (
                <ImageGymBrandStyle
                  data-locator={getLocator('cart_item_brand_logo')}
                  source={gymboreeImage}
                />
              ))}
          </ImgWrapper>
          <ProductDescription>
            {!!productDetail.miscInfo.badge && (
              <BodyCopy
                fontWeight={['semibold']}
                fontFamily="secondary"
                fontSize="fs12"
                text={productDetail.miscInfo.badge}
              />
            )}
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
                <EditButton
                  onPress={() => {
                    console.log(this.swipeable);
                    return this.swipeable.toggle('left');
                  }}
                >
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
        <CartItemRadioButtons productDetail={productDetail} labels={labels} index={itemIndex} />
      </Swipeable>
    );
  }
}

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
