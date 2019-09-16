import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ItemAvailability from '@tcp/core/src/components/features/CnC/common/molecules/ItemAvailability';
import Swipeable from '../../../../../../common/atoms/Swipeable/Swipeable.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import endpoints from '../../../../../../../service/endpoint';
import Image from '../../../../../../common/atoms/Image';
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
  UnavailableView,
  IconHeight,
  IconWidth,
  IconTextDelete,
  IconTextEdit,
} from '../styles/CartItemTile.style.native';
import { getLocator } from '../../../../../../../utils';
import CartItemRadioButtons from '../../CartItemRadioButtons';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';

const gymboreeImage = require('../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../assets/tcp-logo.png');
const editIcon = require('../../../../../../../assets/edit-icon.png');
const deleteIcon = require('../../../../../../../assets/delete.png');

const getItemStatus = (productDetail, labels) => {
  if (productDetail.miscInfo.availability === 'UNAVAILABLE') {
    return <ItemAvailability errorMsg={labels.itemUnavailable} chooseDiff={labels.chooseDiff} />;
  }
  return <></>;
};
const getCartRadioButtons = (
  productDetail,
  labels,
  itemIndex,
  openedTile,
  setSelectedProductTile
) => {
  if (productDetail.miscInfo.availability !== CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT) {
    return (
      <CartItemRadioButtons
        productDetail={productDetail}
        labels={labels}
        index={itemIndex}
        openedTile={openedTile}
        setSelectedProductTile={setSelectedProductTile}
      />
    );
  }
  return <></>;
};
const getEditError = (productDetail, labels) => {
  if (productDetail.miscInfo.availability === 'UNAVAILABLE') {
    return (
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs12"
        dataLocator={getLocator('cart_item_edit_link')}
        textDecorationLine="underline"
        text={labels.update}
        color="error"
      />
    );
  }
  if (productDetail.miscInfo.availability === 'SOLDOUT') {
    return (
      <BodyCopy
        color="error"
        fontFamily="secondary"
        fontSize="fs12"
        dataLocator={getLocator('cart_item_edit_link')}
        textDecorationLine="underline"
        text={labels.removeEdit}
      />
    );
  }
  return (
    <BodyCopy
      color="gray.900"
      fontFamily="secondary"
      fontSize="fs12"
      dataLocator={getLocator('cart_item_edit_link')}
      textDecorationLine="underline"
      text={labels.edit}
    />
  );
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
        {productDetail.miscInfo.availability !== CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT && (
          <View>
            <Image
              data-locator={getLocator('cart_item_edit_link')}
              source={editIcon}
              height={IconHeight}
              width={IconWidth}
            />
            <IconTextEdit>{labels.edit}</IconTextEdit>
          </View>
        )}
        <MarginLeft onPress={() => removeCartItem(productDetail.itemInfo.itemId)}>
          <Image
            data-locator={getLocator('cart_item_edit_link')}
            source={deleteIcon}
            height={IconHeight}
            width={IconWidth}
          />
          <IconTextDelete>{labels.deleteItem}</IconTextDelete>
        </MarginLeft>
      </BtnWrapper>
    );
  };

  onSwipeComplete = swipe => {
    const { swipedElement, setSwipedElement } = this.props;
    if (swipedElement && swipedElement !== swipe) {
      swipedElement.recenter();
    }
    setSwipedElement(swipe);
  };

  render() {
    const { productDetail, labels, itemIndex, openedTile, setSelectedProductTile } = this.props;
    return (
      <Swipeable
        onRef={ref => {
          this.swipeable = ref;
        }}
        rightButtons={[this.rightButton()]}
        rightButtonWidth={200}
        leftButtons={[null]}
        onSwipeComplete={(event, gestureState, swipe) => {
          this.onSwipeComplete(swipe);
        }}
      >
        <MainWrapper>
          <UnavailableView>{getItemStatus(productDetail, labels)}</UnavailableView>
          <OuterContainer>
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
                (productDetail.itemInfo.itemBrand === 'TCP' ? (
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
                  this.onSwipeComplete(this.swipeable);
                  return this.swipeable.toggle('right');
                }}
              >
                {getEditError(productDetail, labels)}
              </EditButton>
            </ProductDescription>
          </OuterContainer>
          {getCartRadioButtons(
            productDetail,
            labels,
            itemIndex,
            openedTile,
            setSelectedProductTile
          )}
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
  swipedElement: PropTypes.shape({}),
  setSwipedElement: PropTypes.func.isRequired,
};
ProductInformation.defaultProps = {
  productDetail: {},
  labels: {},
  itemIndex: 0,
  openedTile: 0,
  swipedElement: null,
};
export default ProductInformation;
