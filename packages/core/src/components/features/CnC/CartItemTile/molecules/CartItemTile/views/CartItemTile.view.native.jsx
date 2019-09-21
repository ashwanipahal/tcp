/* eslint-disable max-lines */
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
  IconTextMoveToBag,
  HeartIcon,
} from '../styles/CartItemTile.style.native';
import { getLocator } from '../../../../../../../utils';
import CartItemRadioButtons from '../../CartItemRadioButtons';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';

const gymboreeImage = require('../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../assets/tcp-logo.png');
const editIcon = require('../../../../../../../assets/edit-icon.png');
const deleteIcon = require('../../../../../../../assets/delete.png');
const moveToBagIcon = require('../../../../../../../assets/moveToBag-icon.png');
const sflIcon = require('../../../../../../../assets/sfl-icon.png');
const heart = require('../../../../../../../assets/heart.png');

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
  setSelectedProductTile,
  isBagPageSflSection
) => {
  if (isBagPageSflSection) return null;
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

  renderSflActionsLinks = () => {
    const { productDetail, isShowSaveForLater, labels, isBagPageSflSection } = this.props;
    if (
      !isBagPageSflSection &&
      productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_OK &&
      isShowSaveForLater
    ) {
      return (
        <MarginLeft onPress={() => {}}>
          <Image
            data-locator="save-for-later-link"
            source={sflIcon}
            height={IconHeight}
            width={IconWidth}
          />
          <IconTextMoveToBag>{labels.saveForLaterLink}</IconTextMoveToBag>
        </MarginLeft>
      );
    }
    if (
      isBagPageSflSection &&
      productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_OK
    ) {
      return (
        <MarginLeft onPress={() => {}}>
          <Image
            data-locator="move-to-bag-link"
            source={moveToBagIcon}
            height={IconHeight}
            width={IconWidth}
          />
          <IconTextMoveToBag>{labels.moveToBagLink}</IconTextMoveToBag>
        </MarginLeft>
      );
    }
    return null;
  };

  renderPoints = () => {
    const { labels, productDetail, isBagPageSflSection } = this.props;
    if (isBagPageSflSection) return null;
    return (
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
    );
  };

  renderQuantity = () => {
    const { labels, productDetail, isBagPageSflSection } = this.props;
    if (isBagPageSflSection) return null;
    return (
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
    );
  };

  renderPrice = () => {
    const { labels, productDetail, isBagPageSflSection } = this.props;
    return (
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
        {!isBagPageSflSection && (
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
        )}
      </ProductDesc>
    );
  };

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
        {this.renderSflActionsLinks()}

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
    const {
      productDetail,
      labels,
      itemIndex,
      openedTile,
      setSelectedProductTile,
      isBagPageSflSection,
    } = this.props;

    return (
      <Swipeable
        onRef={ref => {
          this.swipeable = ref;
        }}
        rightButtons={[this.rightButton()]}
        rightButtonWidth={250}
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
              {isBagPageSflSection && (
                <HeartIcon onPress={() => {}}>
                  <Image data-locator="heartIcon" source={heart} height={13} width={15} />
                </HeartIcon>
              )}
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
                {this.renderQuantity()}
                {this.renderPrice()}
                {this.renderPoints()}
              </ProductSubDetails>
            </ProductDescription>
          </OuterContainer>
          <EditButton
            onPress={() => {
              this.onSwipeComplete(this.swipeable);
              return this.swipeable.toggle('right');
            }}
          >
            {getEditError(productDetail, labels)}
          </EditButton>
          {getCartRadioButtons(
            productDetail,
            labels,
            itemIndex,
            openedTile,
            setSelectedProductTile,
            isBagPageSflSection
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
  isBagPageSflSection: PropTypes.bool,
  isShowSaveForLater: PropTypes.bool.isRequired,
};
ProductInformation.defaultProps = {
  productDetail: {},
  labels: {},
  itemIndex: 0,
  openedTile: 0,
  swipedElement: null,
  isBagPageSflSection: false,
};
export default ProductInformation;
