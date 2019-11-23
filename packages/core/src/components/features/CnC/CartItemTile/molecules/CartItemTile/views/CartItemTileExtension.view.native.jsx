/* eslint-disable max-lines */
/* TODO to refactor later as per discussion */
import React from 'react';
import { View } from 'react-native';
import { DamImage } from '@tcp/core/src/components/common/atoms';
import PriceCurrency from '@tcp/core/src/components/common/molecules/PriceCurrency';
import PropTypes from 'prop-types';
import ItemAvailability from '@tcp/core/src/components/features/CnC/common/molecules/ItemAvailability';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { APP_TYPE } from '../../../../../../../../../mobileapp/src/components/common/hoc/ThemeWrapper.constants';
import {
  ImgWrapper,
  ImageBrandStyle,
  ImageGymBrandStyle,
  SoldOutLabel,
  HeartIcon,
  ProductName,
  ProductListPriceOnReview,
  IconTextMoveToBag,
  IconHeight,
  IconWidth,
  ToggleError,
  ImageTouchableOpacity,
} from '../styles/CartItemTile.style.native';
import Image from '../../../../../../common/atoms/Image';
import { getLocator, getBrand } from '../../../../../../../utils';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import CartItemRadioButtons from '../../CartItemRadioButtons';
import {
  getBOSSUnavailabilityMessage,
  getBOPISUnavailabilityMessage,
  getSTHUnavailabilityMessage,
} from './CartItemTile.utils';

const gymboreeImage = require('../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../assets/tcp-logo.png');
const heart = require('../../../../../../../assets/heart.png');

/**
 *
 * @method goToPdpPage
 * @description navigate to pdp from bag
 * @param {*} title - header
 * @param {*} productDetail - details of product for pdp
 * @param {*} navigation - navigation
 */
const goToPdpPage = (title, productDetail, navigation, updateAppTypeHandler) => {
  const currentAppBrand = getBrand();
  const {
    productInfo: { pdpUrl, productPartNumber },
    itemInfo: { itemBrand },
  } = productDetail;
  const isProductBrandOfSameDomain = currentAppBrand.toUpperCase() === itemBrand.toUpperCase();
  const pdpAsPathUrl = pdpUrl.split('/p/')[1];
  if (!isProductBrandOfSameDomain) {
    updateAppTypeHandler({
      type: currentAppBrand.toLowerCase() === APP_TYPE.TCP ? APP_TYPE.GYMBOREE : APP_TYPE.TCP,
      params: {
        title,
        pdpUrl: pdpAsPathUrl,
        selectedColorProductId: productPartNumber,
        reset: true,
      },
    });
  } else {
    navigation.navigate('ProductDetail', {
      title,
      pdpUrl: pdpAsPathUrl,
      selectedColorProductId: productPartNumber,
      reset: true,
    });
  }
};

const CartItemImageWrapper = (
  productDetail,
  labels,
  showOnReviewPage,
  navigation,
  updateAppTypeHandler
) => {
  return (
    <ImgWrapper showOnReviewPage={showOnReviewPage}>
      <View>
        {/* <ImageStyle
          data-locator={getLocator('cart_item_image')}
          source={{ uri: endpoints.global.baseURI + productDetail.itemInfo.imagePath }}
          showOnReviewPage={showOnReviewPage}
        /> */}
        <ImageTouchableOpacity
          onPress={() => {
            goToPdpPage('', productDetail, navigation, updateAppTypeHandler);
          }}
        >
          <DamImage
            width={100}
            height={100}
            isProductImage
            alt={labels.productImageAlt}
            url={productDetail.itemInfo.imagePath}
            showOnReviewPage={showOnReviewPage}
            itemBrand={
              productDetail.itemInfo.itemBrand && productDetail.itemInfo.itemBrand.toLowerCase()
            }
          />
        </ImageTouchableOpacity>
        {productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT && (
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
          <ImageBrandStyle data-locator={getLocator('cart_item_brand_logo')} source={tcpImage} />
        ) : (
          <ImageGymBrandStyle
            data-locator={getLocator('cart_item_brand_logo')}
            source={gymboreeImage}
          />
        ))}
    </ImgWrapper>
  );
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

const PriceOnReviewPage = productDetail => {
  return (
    <ProductListPriceOnReview>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight={['semibold']}
        text={<PriceCurrency price={productDetail.itemInfo.price} />}
      />
    </ProductListPriceOnReview>
  );
};

const heartIcon = (isBagPageSflSection, handleAddToWishlist) => {
  if (!isBagPageSflSection) return null;
  return (
    <HeartIcon
      onPress={() => {
        handleAddToWishlist();
      }}
    >
      <Image data-locator="heartIcon" source={heart} height={13} width={15} />
    </HeartIcon>
  );
};

const getProductName = (productDetail, showOnReviewPage, navigation, updateAppTypeHandler) => {
  return (
    <ProductName showOnReviewPage={showOnReviewPage}>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs14"
        dataLocator={getLocator('cart_item_title')}
        fontWeight={['semibold']}
        text={productDetail.itemInfo.name}
        onPress={() => {
          goToPdpPage('', productDetail, navigation, updateAppTypeHandler);
        }}
      />
    </ProductName>
  );
};

const handleMoveItemtoSaveList = props => {
  const {
    productDetail,
    sflItemsCount,
    sflMaxCount,
    isCondense,
    isGenricGuest,
    addItemToSflList,
    setCartItemsSflError,
    labels,
    clearToggleError,
  } = props;
  const {
    itemInfo: { itemId, isGiftItem },
    productInfo: { skuId, generalProductId },
  } = productDetail;
  const catEntryId = isGiftItem ? generalProductId : skuId;
  const userInfoRequired = isGenricGuest && isGenricGuest.get('userId') && isCondense;

  clearToggleError();
  if (sflItemsCount >= sflMaxCount) {
    return setCartItemsSflError(labels.sflMaxLimitError);
  }
  const payloadData = { itemId, catEntryId, userInfoRequired };
  return addItemToSflList({ ...payloadData });
};

const removeSflItem = props => {
  const { productDetail, startSflItemDelete } = props;
  const {
    itemInfo: { isGiftItem },
    productInfo: { skuId, generalProductId },
  } = productDetail;
  const catEntryId = isGiftItem ? generalProductId : skuId;

  const payloadData = { catEntryId };
  return startSflItemDelete({ ...payloadData });
};

const moveToBagSflItem = props => {
  const { productDetail, startSflDataMoveToBag, clearToggleError } = props;
  const {
    itemInfo: { itemId, isGiftItem },
    productInfo: { skuId, generalProductId },
  } = productDetail;
  const catEntryId = isGiftItem ? generalProductId : skuId;

  const payloadData = { itemId, catEntryId };
  clearToggleError();
  return startSflDataMoveToBag({ ...payloadData });
};

const getCartRadioButtons = (
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
    orderId,
    setShipToHome,
    pickupStoresInCart,
    autoSwitchPickupItemInCart,
  },
  handleEditCartItemWithStore
) => {
  if (isBagPageSflSection || !showOnReviewPage) return null;
  if (productDetail.miscInfo.availability !== CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT) {
    return (
      <CartItemRadioButtons
        productDetail={productDetail}
        labels={labels}
        index={itemIndex}
        openedTile={openedTile}
        setSelectedProductTile={setSelectedProductTile}
        isEcomSoldout={isEcomSoldout}
        isECOMOrder={isECOMOrder}
        isBOSSOrder={isBOSSOrder}
        isBOPISOrder={isBOPISOrder}
        noBopisMessage={noBopisMessage}
        noBossMessage={noBossMessage}
        bossDisabled={bossDisabled}
        bopisDisabled={bopisDisabled}
        isBossEnabled={isBossEnabled}
        isBopisEnabled={isBopisEnabled}
        openPickUpModal={handleEditCartItemWithStore}
        setShipToHome={setShipToHome}
        pickupStoresInCart={pickupStoresInCart}
        autoSwitchPickupItemInCart={autoSwitchPickupItemInCart}
        orderId={orderId}
      />
    );
  }
  return <></>;
};

getCartRadioButtons.propTypes = {
  productDetail: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  itemIndex: PropTypes.number.isRequired,
  openedTile: PropTypes.number.isRequired,
  setSelectedProductTile: PropTypes.func.isRequired,
  isBagPageSflSection: PropTypes.bool.isRequired,
  showOnReviewPage: PropTypes.bool.isRequired,
  isEcomSoldout: PropTypes.bool.isRequired,
  isECOMOrder: PropTypes.bool.isRequired,
  isBOSSOrder: PropTypes.bool.isRequired,
  isBOPISOrder: PropTypes.bool.isRequired,
  noBopisMessage: PropTypes.string.isRequired,
  noBossMessage: PropTypes.string.isRequired,
  bossDisabled: PropTypes.bool.isRequired,
  bopisDisabled: PropTypes.bool.isRequired,
  isBossEnabled: PropTypes.bool.isRequired,
  isBopisEnabled: PropTypes.bool.isRequired,
  setShipToHome: PropTypes.func.isRequired,
  pickupStoresInCart: PropTypes.shape({}).isRequired,
  autoSwitchPickupItemInCart: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
};

/**
 * @function renderUnavailableErrorMessage
 * @param {Object} settings
 * @returns {JSX} Returns Item Unavailable component with respective variation of text via passed input
 * @memberof CartItemTile
 */
const renderUnavailableErrorMessage = ({
  props: myProps,
  isEcomSoldout,
  bossDisabled,
  isBOSSOrder,
  bopisDisabled,
  isBOPISOrder,
  noBossMessage,
  noBopisMessage,
  availability,
}) => {
  const { labels } = myProps;
  let unavailableMessage = '';
  if (isEcomSoldout) {
    unavailableMessage = labels.soldOutError;
  } else if (isBOSSOrder) {
    unavailableMessage = getBOSSUnavailabilityMessage(
      bossDisabled,
      noBossMessage,
      availability,
      labels
    );
  } else if (isBOPISOrder) {
    unavailableMessage = getBOPISUnavailabilityMessage(
      bopisDisabled,
      noBopisMessage,
      availability,
      labels
    );
  } else {
    unavailableMessage = getSTHUnavailabilityMessage(availability, labels);
  }

  return unavailableMessage ? (
    <ItemAvailability errorMsg={labels.itemUnavailable} chooseDiff={unavailableMessage} />
  ) : null;
};

renderUnavailableErrorMessage.propTypes = {
  props: PropTypes.shape({
    labels: PropTypes.shape({
      soldOutError: PropTypes.string.isRequired,
      itemUnavailable: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isEcomSoldout: PropTypes.bool.isRequired,
  bossDisabled: PropTypes.bool.isRequired,
  isBOSSOrder: PropTypes.bool.isRequired,
  bopisDisabled: PropTypes.bool.isRequired,
  isBOPISOrder: PropTypes.bool.isRequired,
  noBossMessage: PropTypes.string.isRequired,
  noBopisMessage: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
};

const callEditMethod = (props, handleEditCartItemWithStore, isBagPageSflSection = false) => {
  const { productDetail, onQuickViewOpenClick } = props;
  const {
    miscInfo: { orderItemType },
    productInfo: { productPartNumber },
  } = productDetail;
  if (orderItemType === CARTPAGE_CONSTANTS.ECOM || isBagPageSflSection) {
    const { itemId, qty, color, size, fit, itemBrand, isGiftItem } = productDetail.itemInfo;
    const {
      productInfo: { skuId, generalProductId },
    } = productDetail;
    onQuickViewOpenClick({
      colorProductId: productPartNumber,
      orderInfo: {
        orderItemId: itemId,
        selectedQty: qty,
        selectedColor: color,
        selectedSize: size,
        selectedFit: fit,
        itemBrand,
        skuId: isGiftItem ? generalProductId : skuId,
      },
      fromBagPage: true,
      isSflProduct: isBagPageSflSection,
    });
  } else {
    const openSkuSelectionForm = true;
    handleEditCartItemWithStore(orderItemType, openSkuSelectionForm, false);
  }
};

const onSwipeComplete = (props, swipe) => {
  const { swipedElement, setSwipedElement } = props;
  if (swipedElement && swipedElement !== swipe) {
    swipedElement.recenter();
  }
  setSwipedElement(swipe);
};

const renderImage = ({ icon, dataLocator, iconText }) => {
  return (
    <>
      <Image data-locator={dataLocator} source={icon} height={IconHeight} width={IconWidth} />
      <IconTextMoveToBag>{iconText}</IconTextMoveToBag>
    </>
  );
};

renderImage.propTypes = {
  icon: PropTypes.string,
  dataLocator: PropTypes.string,
  iconText: PropTypes.string,
};

renderImage.defaultProps = {
  icon: '',
  dataLocator: '',
  iconText: '',
};

/**
 * @function renderTogglingError Render Toggling error
 * @returns {JSX} Error Component with toggling api error.
 * @memberof CartItemTile
 */
const renderTogglingError = props => {
  const {
    toggleError,
    productDetail: {
      itemInfo: { itemId },
    },
  } = props;
  return toggleError && itemId === toggleError.itemId ? (
    <ToggleError>
      <ErrorMessage
        fontSize="fs12"
        fontWeight="extrabold"
        error={toggleError.errorMessage}
        showAccordian
      />
    </ToggleError>
  ) : null;
};

renderTogglingError.propTypes = {
  toggleError: PropTypes.shape({}).isRequired,
  productDetail: PropTypes.shape({}).isRequired,
};

export default {
  CartItemImageWrapper,
  heartIcon,
  getProductName,
  handleMoveItemtoSaveList,
  removeSflItem,
  moveToBagSflItem,
  PriceOnReviewPage,
  getEditError,
  getCartRadioButtons,
  renderUnavailableErrorMessage,
  callEditMethod,
  onSwipeComplete,
  renderImage,
  renderTogglingError,
  goToPdpPage,
};
