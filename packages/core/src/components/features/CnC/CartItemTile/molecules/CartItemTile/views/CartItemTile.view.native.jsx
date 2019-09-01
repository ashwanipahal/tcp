import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import ItemAvailability from '@tcp/core/src/components/features/CnC/common/molecules/ItemAvailability';
import Swipeable from '../../../../../../common/atoms/Swipeable/Swipeable.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
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
  SoldOutLabel,
  MainWrapper,
  BtnWrapper,
  MarginLeft,
} from '../styles/CartItemTile.style.native';
import { getLocator } from '../../../../../../../utils';
import CartItemRadioButtons from '../../CartItemRadioButtons';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';

const gymboreeImage = require('../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../assets/tcp-logo.png');

const getItemStatus = (productDetail, labels) => {
  return <ItemAvailability errorMsg={labels.itemUnavailable} />;
};

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
    this.swipeable = React.createRef();
  }

  rightButton = () => {
    const { removeCartItem, productDetail, labels } = this.props;
    return (
      <BtnWrapper>
        <Text>{labels.edit}</Text>
        <MarginLeft onPress={() => removeCartItem(productDetail.itemInfo.itemId)}>
          <Text>{labels.deleteItem}</Text>
        </MarginLeft>
      </BtnWrapper>
    );
  };

  getEditLinkLbl = () => {
    const { labels, productDetail } = this.props;
    let editLinkLbl = labels.edit;
    if (productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT) {
      editLinkLbl = labels.removeItem;
    } else if (
      productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_UNAVAILABLE
    ) {
      editLinkLbl = labels.update;
    }
    return editLinkLbl;
  };

  render() {
    const { productDetail, labels, itemIndex, openedTile, setSelectedProductTile } = this.props;
    const editLinkLbl = this.getEditLinkLbl();

    return (
      <Swipeable
        onRef={ref => {
          this.swipeable = ref;
        }}
        rightButtons={[this.rightButton()]}
        rightButtonWidth={200}
        leftButtons={[null]}
      >
        <MainWrapper>
          <OuterContainer>
            <BodyCopy
              fontSize="fs10"
              textAlign="center"
              text={getItemStatus(productDetail, labels)}
            />
            <ImgWrapper>
              <View>
                <ImageStyle
                  data-locator={getLocator('cart_item_image')}
                  source={{ uri: endpoints.global.baseURI + productDetail.itemInfo.imagePath }}
                />
                {productDetail.miscInfo.availability ===
                  CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT && (
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
              </View>
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
                          ? `${labels.value}: `
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
                </ProductDesc>
              </ProductSubDetails>
              <EditButton
                onPress={() => {
                  return this.swipeable.toggle('right');
                }}
              >
                <BodyCopy
                  color="gray.700"
                  fontFamily="secondary"
                  fontSize="fs12"
                  dataLocator={getLocator('cart_item_edit_link')}
                  textDecorationLine="underline"
                  text={editLinkLbl}
                />
              </EditButton>
            </ProductDescription>
          </OuterContainer>
          <CartItemRadioButtons
            productDetail={productDetail}
            labels={labels}
            index={itemIndex}
            openedTile={openedTile}
            setSelectedProductTile={setSelectedProductTile}
          />
        </MainWrapper>
      </Swipeable>
    );
  }
}

ProductInformation.propTypes = {
  productDetail: PropTypes.shape,
  labels: PropTypes.shape,
  removeCartItem: PropTypes.func.isRequired,
  itemIndex: PropTypes.number,
  openedTile: PropTypes.number,
  setSelectedProductTile: PropTypes.func.isRequired,
};
ProductInformation.defaultProps = {
  productDetail: {},
  labels: {},
  itemIndex: 0,
  openedTile: 0,
};
export default ProductInformation;
