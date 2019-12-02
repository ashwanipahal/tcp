/* eslint-disable max-lines */
/* TODO to refactor later as per discussion */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import PriceCurrency from '@tcp/core/src/components/common/molecules/PriceCurrency';
import BagPageUtils from '@tcp/core/src/components/features/CnC/BagPage/views/Bagpage.utils';
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
import ClickTracker from '../../../../../../../../../mobileapp/src/components/common/atoms/ClickTracker';

const editIcon = require('../../../../../../../assets/edit-icon.png');
const deleteIcon = require('../../../../../../../assets/delete.png');
const moveToBagIcon = require('../../../../../../../assets/moveToBag-icon.png');
const sflIcon = require('../../../../../../../assets/sfl-icon.png');

class ProductInformation extends PureComponent {
  swipeable = React.createRef();

  componentDidUpdate(prevProps) {
    const {
      isBagPageSflSection,
      toggleBossBopisError,
      productDetail: {
        itemInfo: { itemId },
      },
    } = this.props;
    if (
      !isBagPageSflSection &&
      toggleBossBopisError &&
      itemId === toggleBossBopisError.itemId &&
      (prevProps.toggleBossBopisError === null ||
        prevProps.toggleBossBopisError.errorMessage !== toggleBossBopisError.errorMessage)
    ) {
      setTimeout(() => {
        this.handleEditCartItemWithStore(toggleBossBopisError.targetOrderType);
      });
    }
  }

  handleEditCartItemWithStore = (
    changeStoreType,
    openSkuSelectionForm = false,
    openRestrictedModalForBopis = false,
    isPickUpWarningModal = false
  ) => {
    const { onPickUpOpenClick, productDetail, orderId, clearToggleError } = this.props;
    const { itemId, qty, color, size, fit, itemBrand } = productDetail.itemInfo;
    const { store, orderItemType } = productDetail.miscInfo;
    const { productPartNumber } = productDetail.productInfo;
    const isItemShipToHome = !store;
    const isBopisCtaEnabled = changeStoreType === CARTPAGE_CONSTANTS.BOPIS;
    const isBossCtaEnabled = changeStoreType === CARTPAGE_CONSTANTS.BOSS;
    const alwaysSearchForBOSS = changeStoreType === CARTPAGE_CONSTANTS.BOSS;
    clearToggleError();
    onPickUpOpenClick({
      colorProductId: productPartNumber,
      orderInfo: {
        orderItemId: itemId,
        Quantity: qty,
        color,
        Size: size,
        Fit: fit,
        orderId,
        orderItemType,
        itemBrand,
      },
      openSkuSelectionForm,
      isBopisCtaEnabled,
      isBossCtaEnabled,
      isItemShipToHome,
      alwaysSearchForBOSS,
      openRestrictedModalForBopis,
      isPickUpWarningModal,
    });
  };

  renderSflActionsLinks = () => {
    const {
      productDetail,
      isShowSaveForLater,
      labels,
      isBagPageSflSection,
      cartOrderItems,
    } = this.props;
    const { saveForLaterLink, moveToBagLink } = labels;
    const isOK = productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_OK;
    const shoppingBag = 'shopping bag';
    const productsData = BagPageUtils.formatBagProductsData(cartOrderItems);
    if (!isBagPageSflSection && isOK && isShowSaveForLater) {
      return (
        <ClickTracker
          as={SflIcons}
          onPress={() => CartItemTileExtension.handleMoveItemtoSaveList(this.props)}
          name="save_for_later"
          module="checkout"
          clickData={{ customEvents: ['event134', 'event136'], products: productsData }}
          pageData={{
            pageName: shoppingBag,
            pageSection: shoppingBag,
            pageSubSection: shoppingBag,
            pageType: shoppingBag,
            pageShortName: shoppingBag,
            pageSubSubSection: shoppingBag,
          }}
        >
          {CartItemTileExtension.renderImage({
            icon: sflIcon,
            iconText: saveForLaterLink,
            dataLocator: 'save-for-later-link',
          })}
        </ClickTracker>
      );
    }
    if (isBagPageSflSection && isOK) {
      return (
        <ClickTracker
          as={SflIcons}
          onPress={() => CartItemTileExtension.moveToBagSflItem(this.props)}
          name="move_to_bag"
          module="checkout"
          clickData={{ customEvents: ['event135', 'event137'], products: productsData }}
          pageData={{
            pageName: shoppingBag,
            pageSection: shoppingBag,
            pageSubSection: shoppingBag,
            pageType: shoppingBag,
            pageShortName: shoppingBag,
            pageSubSubSection: shoppingBag,
          }}
        >
          {CartItemTileExtension.renderImage({
            icon: moveToBagIcon,
            iconText: moveToBagLink,
            dataLocator: 'move-to-bag-link',
          })}
        </ClickTracker>
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
    const { isBagPageSflSection, showOnReviewPage } = this.props;
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
              text={<PriceCurrency price={Number(offerPrice)} />}
            />

            {!isBagPageSflSection && wasPrice !== salePrice && (
              <ProductListPrice>
                <BodyCopy
                  color="gray.800"
                  fontFamily="secondary"
                  fontSize="fs12"
                  text={<PriceCurrency price={Number(wasPrice * qty)} />}
                />
              </ProductListPrice>
            )}
          </>
        )}
      </ProductDesc>
    );
  };

  handleRemoveClick = ({
    itemId,
    pageView,
    catEntryId,
    userInfoRequired,
    isBagPageSflSection,
    itemBrand,
    orderItemType,
  }) => {
    const { removeCartItem, clearToggleError } = this.props;
    clearToggleError();
    if (isBagPageSflSection) {
      CartItemTileExtension.removeSflItem(this.props);
    } else {
      removeCartItem({
        itemId,
        pageView,
        catEntryId,
        userInfoRequired,
        isBagPageSflSection,
        itemBrand,
        orderItemType,
      });
    }
  };

  rightButton = (isBOSSOrder, bossDisabled, isBOPISOrder, bopisDisabled) => {
    const { productDetail, labels, isBagPageSflSection } = this.props;
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
                CartItemTileExtension.callEditMethod(
                  this.props,
                  this.handleEditCartItemWithStore,
                  isBagPageSflSection
                );
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
            this.handleRemoveClick({
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

  getSwipeConfig = (isBOSSOrder, bossDisabled, isBOPISOrder, bopisDisabled, showOnReviewPage) => {
    return {
      rightButtons: showOnReviewPage
        ? [this.rightButton(isBOSSOrder, bossDisabled, isBOPISOrder, bopisDisabled)]
        : null,
      rightButtonWidth: showOnReviewPage ? 240 : 0,
      leftButtons: null,
      onSwipeComplete: showOnReviewPage
        ? (event, gestureState, swipe) => {
            CartItemTileExtension.onSwipeComplete(this.props, swipe);
          }
        : () => {},
    };
  };

  render() {
    const { labels, itemIndex, showOnReviewPage, productDetail } = this.props;
    const {
      productDetail: {
        miscInfo: { store, orderItemType, availability },
        itemInfo: { itemBrand, isGiftItem },
      },
      onPickUpOpenClick,
      setShipToHome,
      pickupStoresInCart,
      navigation,
      updateAppTypeHandler,
      autoSwitchPickupItemInCart,
    } = this.props;
    const {
      openedTile,
      setSelectedProductTile,
      isBagPageSflSection,
      orderId,
      handleAddToWishlist,
      isLoggedIn,
      showLoginModal,
      toggleLoginModal,
    } = this.props;
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

    const swipeConfig = this.getSwipeConfig(
      isBOSSOrder,
      bossDisabled,
      isBOPISOrder,
      bopisDisabled,
      showOnReviewPage
    );

    return (
      <Swipeable
        onRef={ref => {
          this.swipeable = ref;
        }}
        {...swipeConfig}
      >
        <MainWrapper>
          {CartItemTileExtension.renderTogglingError(this.props)}
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
            {CartItemTileExtension.CartItemImageWrapper(
              productDetail,
              labels,
              showOnReviewPage,
              navigation,
              updateAppTypeHandler
            )}
            <ProductDescription>
              {showOnReviewPage && !!productDetail.miscInfo.badge && (
                <BodyCopy
                  fontWeight={['semibold']}
                  fontFamily="secondary"
                  fontSize="fs12"
                  text={productDetail.miscInfo.badge}
                />
              )}
              {CartItemTileExtension.getProductName(
                productDetail,
                showOnReviewPage,
                navigation,
                updateAppTypeHandler
              )}
              {showOnReviewPage &&
                CartItemTileExtension.heartIcon(isBagPageSflSection, handleAddToWishlist)}
              {CartItemTileExtension.renderModal(isLoggedIn, toggleLoginModal, showLoginModal)}
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
            {!showOnReviewPage && CartItemTileExtension.PriceOnReviewPage(productDetail)}
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
            CartItemTileExtension.getCartRadioButtons(
              {
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
                setShipToHome,
                pickupStoresInCart,
                autoSwitchPickupItemInCart,
              },
              this.handleEditCartItemWithStore
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
  isCondense: PropTypes.bool,
  setSelectedProductTile: PropTypes.func.isRequired,
  swipedElement: PropTypes.shape({}).isRequired,
  isBagPageSflSection: PropTypes.bool,
  isShowSaveForLater: PropTypes.bool.isRequired,
  isGenricGuest: PropTypes.shape({}).isRequired,
  showOnReviewPage: PropTypes.bool,
  orderId: PropTypes.string.isRequired,
  onPickUpOpenClick: PropTypes.func.isRequired,
  currencyExchange: PropTypes.func.isRequired,
  clearToggleError: PropTypes.func,
  setShipToHome: PropTypes.func,
  pickupStoresInCart: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}),
  updateAppTypeHandler: PropTypes.func,
  autoSwitchPickupItemInCart: PropTypes.func.isRequired,
  toggleBossBopisError: PropTypes.shape({
    errorMessage: PropTypes.string,
  }),
  handleAddToWishlist: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  showLoginModal: PropTypes.bool.isRequired,
  toggleLoginModal: PropTypes.func.isRequired,
  cartOrderItems: PropTypes.shape([]).isRequired,
};

ProductInformation.defaultProps = {
  productDetail: {},
  labels: {},
  itemIndex: 0,
  openedTile: 0,
  isCondense: true,
  isBagPageSflSection: false,
  showOnReviewPage: true,
  clearToggleError: () => {},
  setShipToHome: () => {},
  navigation: {},
  updateAppTypeHandler: () => {},
  toggleBossBopisError: null,
};

export default ProductInformation;
