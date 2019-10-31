import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Swipeable from '../../../../../../common/atoms/Swipeable/Swipeable.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Image from '../../../../../../common/atoms/Image';
import {
  ProductDesc,
  OuterContainer,
  ProductDescription,
  ProductSubDetails,
  ProductSubDetailLabel,
  ProductListPrice,
  EditButton,
  MainWrapper,
  BtnWrapper,
  MarginLeft,
  UnavailableView,
  IconHeight,
  IconWidth,
  IconTextDelete,
  IconTextEdit,
  SflIcons,
  SizeQtyOnReview,
} from '../styles/CartItemTile.style.native';
import { getLocator } from '../../../../../../../utils';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import CartItemTileExtension from './CartItemTileExtension.view.native';
import {
  getBossBopisFlags,
  isEcomOrder,
  isBopisOrder,
  isBossOrder,
  isSoldOut,
  noBossBopisMessage,
  hideEditBossBopis,
  checkBossBopisDisabled,
  showRadioButtons,
  getPrices,
} from './CartItemTile.utils';

const editIcon = require('../../../../../../../assets/edit-icon.png');
const deleteIcon = require('../../../../../../../assets/delete.png');
const moveToBagIcon = require('../../../../../../../assets/moveToBag-icon.png');
const sflIcon = require('../../../../../../../assets/sfl-icon.png');

class ProductInformation extends React.Component {
  swipeable = React.createRef();

  renderSflActionsLinks = () => {
    const { productDetail, isShowSaveForLater, labels, isBagPageSflSection } = this.props;
    const { saveForLaterLink, moveToBagLink } = labels;
    const isOK = productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_OK;
    if (!isBagPageSflSection && isOK && isShowSaveForLater) {
      return (
        <SflIcons onPress={() => CartItemTileExtension.handleMoveItemtoSaveList(this.props)}>
          {CartItemTileExtension.renderImage({
            icon: sflIcon,
            iconText: saveForLaterLink,
            dataLocator: 'save-for-later-link',
          })}
        </SflIcons>
      );
    }
    if (isBagPageSflSection && isOK) {
      return (
        <SflIcons onPress={() => CartItemTileExtension.moveToBagSflItem(this.props)}>
          {CartItemTileExtension.renderImage({
            icon: moveToBagIcon,
            iconText: moveToBagLink,
            dataLocator: 'move-to-bag-link',
          })}
        </SflIcons>
      );
    }
    return null;
  };

  renderPoints = () => {
    const { labels, productDetail, isBagPageSflSection, showOnReviewPage } = this.props;
    const { points } = labels;
    const { itemInfo: { myPlacePoints } = {} } = productDetail;
    if (isBagPageSflSection || !showOnReviewPage) return null;
    return (
      <ProductDesc>
        <ProductSubDetailLabel>
          <BodyCopy
            fontSize="fs13"
            fontWeight={['semibold']}
            textAlign="left"
            text={`${points}: `}
          />
        </ProductSubDetailLabel>
        <BodyCopy
          color="orange.800"
          fontFamily="secondary"
          fontSize="fs13"
          dataLocator={getLocator('cart_item_points')}
          text={myPlacePoints}
        />
      </ProductDesc>
    );
  };

  renderQuantity = () => {
    const { labels, productDetail, isBagPageSflSection, showOnReviewPage } = this.props;
    const { itemInfo: { qty } = {} } = productDetail;
    if (isBagPageSflSection) return null;
    return (
      <ProductDesc>
        <ProductSubDetailLabel showOnReviewPage={showOnReviewPage}>
          <BodyCopy
            fontSize="fs13"
            fontWeight={['semibold']}
            textAlign="left"
            text={`${labels.qty}:`}
          />
        </ProductSubDetailLabel>
        <BodyCopy color="gray.800" fontFamily="secondary" fontSize="fs13" text={qty} />
      </ProductDesc>
    );
  };

  renderSize = () => {
    const { labels, productDetail, showOnReviewPage } = this.props;
    const { itemInfo: { isGiftItem, size, fit } = {} } = productDetail;
    return (
      <ProductDesc>
        <ProductSubDetailLabel showOnReviewPage={showOnReviewPage}>
          <BodyCopy
            fontSize="fs13"
            fontWeight={['semibold']}
            textAlign="left"
            text={isGiftItem === true ? `${labels.value}:` : `${labels.size}:`}
          />
        </ProductSubDetailLabel>
        <BodyCopy
          color="gray.800"
          fontFamily="secondary"
          fontSize="fs13"
          dataLocator={getLocator('cart_item_size')}
          text={`${size} `}
        />
        <BodyCopy fontSize="fs13" color="gray.800" fontFamily="secondary" text={!fit ? ' ' : fit} />
      </ProductDesc>
    );
  };

  renderPrice = () => {
    const { labels, productDetail, currencyExchange } = this.props;
    const { isBagPageSflSection, showOnReviewPage, currencySymbol } = this.props;
    const { offerPrice, qty } = productDetail.itemInfo;
    const { salePrice, wasPrice } = getPrices({ productDetail, currencyExchange });
    return (
      <ProductDesc>
        {showOnReviewPage && (
          <>
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
              text={`${currencySymbol}${Number(offerPrice).toFixed(2)}`}
            />

            {!isBagPageSflSection && wasPrice !== salePrice && (
              <ProductListPrice>
                <BodyCopy
                  color="gray.800"
                  fontFamily="secondary"
                  fontSize="fs12"
                  text={`${currencySymbol}${Number(wasPrice * qty).toFixed(2)}`}
                />
              </ProductListPrice>
            )}
          </>
        )}
      </ProductDesc>
    );
  };

  rightButton = (isBOSSOrder, bossDisabled, isBOPISOrder, bopisDisabled) => {
    const { removeCartItem, productDetail, labels, isBagPageSflSection } = this.props;
    const { isGenricGuest, isCondense } = this.props;
    const {
      itemInfo: { itemId, isGiftItem, itemBrand },
      productInfo: { skuId, generalProductId },
      miscInfo: { orderItemType },
    } = productDetail;
    const catEntryId = isGiftItem ? generalProductId : skuId;
    const userInfoRequired = isGenricGuest && isGenricGuest.get('userId') && isCondense; // Flag to check if getRegisteredUserInfo required after SflList
    return (
      <BtnWrapper>
        {productDetail.miscInfo.availability !== CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT &&
          !hideEditBossBopis(isBOSSOrder, bossDisabled, isBOPISOrder, bopisDisabled) && (
            <TouchableOpacity
              accessibilityRole="link"
              onPress={() => {
                CartItemTileExtension.callEditMethod(this.props);
                CartItemTileExtension.onSwipeComplete(this.props, this.swipeable);
                return this.swipeable.toggle('right');
              }}
            >
              <Image
                data-locator={getLocator('cart_item_edit_link')}
                source={editIcon}
                height={IconHeight}
                width={IconWidth}
              />
              <IconTextEdit>{labels.edit}</IconTextEdit>
            </TouchableOpacity>
          )}
        {this.renderSflActionsLinks()}
        <MarginLeft
          onPress={() =>
            isBagPageSflSection
              ? CartItemTileExtension.removeSflItem(this.props)
              : removeCartItem({
                  itemId,
                  pageView: 'myBag',
                  catEntryId,
                  userInfoRequired,
                  isBagPageSflSection,
                  itemBrand,
                  orderItemType,
                })
          }
        >
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

  render() {
    const { labels, itemIndex, showOnReviewPage, currencySymbol, productDetail } = this.props;
    const {
      productDetail: {
        miscInfo: { store, orderItemType, availability },
        itemInfo: { itemBrand, isGiftItem },
      },
      onPickUpOpenClick,
    } = this.props;
    const { openedTile, setSelectedProductTile, isBagPageSflSection, orderId } = this.props;
    const { isBossEnabled, isBopisEnabled } = getBossBopisFlags(this.props, itemBrand);
    const isECOMOrder = isEcomOrder(orderItemType);
    const isBOPISOrder = isBopisOrder(orderItemType);
    const isBOSSOrder = isBossOrder(orderItemType);
    const isEcomSoldout = isSoldOut(availability);

    const { noBopisMessage, noBossMessage } = noBossBopisMessage(this.props);
    const { bossDisabled, bopisDisabled } = checkBossBopisDisabled(
      this.props,
      isBossEnabled,
      isBopisEnabled,
      isEcomSoldout,
      isBOSSOrder,
      isBOPISOrder
    );

    return (
      <Swipeable
        onRef={ref => {
          this.swipeable = ref;
        }}
        rightButtons={[this.rightButton(isBOSSOrder, bossDisabled, isBOPISOrder, bopisDisabled)]}
        rightButtonWidth={240}
        leftButtons={null}
        onSwipeComplete={(event, gestureState, swipe) => {
          CartItemTileExtension.onSwipeComplete(this.props, swipe);
        }}
      >
        <MainWrapper>
          <UnavailableView>
            {CartItemTileExtension.renderUnavailableErrorMessage({
              props: this.props,
              isEcomSoldout,
              bossDisabled,
              isBOSSOrder,
              bopisDisabled,
              isBOPISOrder,
              noBossMessage,
              noBopisMessage,
              availability,
            })}
          </UnavailableView>
          <OuterContainer showOnReviewPage={showOnReviewPage}>
            {CartItemTileExtension.CartItemImageWrapper(productDetail, labels, showOnReviewPage)}
            <ProductDescription>
              {showOnReviewPage && !!productDetail.miscInfo.badge && (
                <BodyCopy
                  fontWeight={['semibold']}
                  fontFamily="secondary"
                  fontSize="fs12"
                  text={productDetail.miscInfo.badge}
                />
              )}
              {CartItemTileExtension.getProductName(productDetail, showOnReviewPage)}
              {showOnReviewPage && CartItemTileExtension.heartIcon(isBagPageSflSection)}
              <ProductSubDetails>
                <ProductDesc>
                  <ProductSubDetailLabel>
                    <BodyCopy
                      fontSize="fs13"
                      fontWeight={['semibold']}
                      textAlign="left"
                      text={isGiftItem === true ? `${labels.design}: ` : `${labels.color}: `}
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
                {showOnReviewPage ? (
                  <>
                    {this.renderSize()}
                    {this.renderQuantity()}
                  </>
                ) : (
                  <SizeQtyOnReview>
                    {this.renderSize()}
                    <BodyCopy fontFamily="secondary" color="gray.800" fontSize="fs13" text="| " />
                    {this.renderQuantity()}
                  </SizeQtyOnReview>
                )}
                {this.renderPrice()}
                {this.renderPoints()}
              </ProductSubDetails>
            </ProductDescription>
            {!showOnReviewPage &&
              CartItemTileExtension.PriceOnReviewPage(currencySymbol, productDetail)}
          </OuterContainer>
          {showOnReviewPage &&
            !hideEditBossBopis(isBOSSOrder, bossDisabled, isBOPISOrder, bopisDisabled) && (
              <EditButton
                onPress={() => {
                  CartItemTileExtension.onSwipeComplete(this.props, this.swipeable);
                  return this.swipeable.toggle('right');
                }}
              >
                {CartItemTileExtension.getEditError(productDetail, labels)}
              </EditButton>
            )}
          {showRadioButtons({
            isEcomSoldout,
            isECOMOrder,
            isBossEnabled,
            isBopisEnabled,
            store,
          }) &&
            CartItemTileExtension.getCartRadioButtons({
              productDetail,
              labels,
              itemIndex,
              openedTile,
              setSelectedProductTile,
              isBagPageSflSection,
              showOnReviewPage,
              isEcomSoldout,
              isECOMOrder,
              isBOSSOrder,
              isBOPISOrder,
              noBopisMessage,
              noBossMessage,
              bossDisabled,
              bopisDisabled,
              isBossEnabled,
              isBopisEnabled,
              onPickUpOpenClick,
              orderId,
            })}
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
  isCondense: PropTypes.bool,
  setSelectedProductTile: PropTypes.func.isRequired,
  swipedElement: PropTypes.shape({}).isRequired,
  isBagPageSflSection: PropTypes.bool,
  isShowSaveForLater: PropTypes.bool.isRequired,
  isGenricGuest: PropTypes.shape({}).isRequired,
  showOnReviewPage: PropTypes.bool,
  currencySymbol: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  onPickUpOpenClick: PropTypes.func.isRequired,
  currencyExchange: PropTypes.func.isRequired,
};

ProductInformation.defaultProps = {
  productDetail: {},
  labels: {},
  itemIndex: 0,
  openedTile: 0,
  isCondense: true,
  isBagPageSflSection: false,
  showOnReviewPage: true,
};

export default ProductInformation;
