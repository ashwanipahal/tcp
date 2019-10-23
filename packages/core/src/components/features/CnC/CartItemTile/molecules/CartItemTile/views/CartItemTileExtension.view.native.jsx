import React from 'react';
import { View } from 'react-native';
import { DamImage } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';
import ItemAvailability from '@tcp/core/src/components/features/CnC/common/molecules/ItemAvailability';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
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
} from '../styles/CartItemTile.style.native';
import Image from '../../../../../../common/atoms/Image';
import { getLocator } from '../../../../../../../utils';
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

const CartItemImageWrapper = (productDetail, labels, showOnReviewPage) => {
  return (
    <ImgWrapper showOnReviewPage={showOnReviewPage}>
      <View>
        {/* <ImageStyle
          data-locator={getLocator('cart_item_image')}
          source={{ uri: endpoints.global.baseURI + productDetail.itemInfo.imagePath }}
          showOnReviewPage={showOnReviewPage}
        /> */}
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

const PriceOnReviewPage = (currencySymbol, productDetail) => {
  return (
    <ProductListPriceOnReview>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight={['semibold']}
        text={`${currencySymbol}${productDetail.itemInfo.price}`}
      />
    </ProductListPriceOnReview>
  );
};

const heartIcon = isBagPageSflSection => {
  if (!isBagPageSflSection) return null;
  return (
    <HeartIcon onPress={() => {}}>
      <Image data-locator="heartIcon" source={heart} height={13} width={15} />
    </HeartIcon>
  );
};

const getProductName = (productDetail, showOnReviewPage) => {
  return (
    <ProductName showOnReviewPage={showOnReviewPage}>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs14"
        dataLocator={getLocator('cart_item_title')}
        fontWeight={['semibold']}
        text={productDetail.itemInfo.name}
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
  } = props;
  const {
    itemInfo: { itemId, isGiftItem },
    productInfo: { skuId, generalProductId },
  } = productDetail;
  const catEntryId = isGiftItem ? generalProductId : skuId;
  const userInfoRequired = isGenricGuest && isGenricGuest.get('userId') && isCondense;

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
  const { productDetail, startSflDataMoveToBag } = props;
  const {
    itemInfo: { itemId, isGiftItem },
    productInfo: { skuId, generalProductId },
  } = productDetail;
  const catEntryId = isGiftItem ? generalProductId : skuId;

  const payloadData = { itemId, catEntryId };
  return startSflDataMoveToBag({ ...payloadData });
};

const handleEditCartItemWithStore = (changeStoreType, openSkuSelectionForm = false, props) => {
  const { onPickUpOpenClick, productDetail, orderId } = props;
  const { itemId, qty, color, size, fit, itemBrand } = productDetail.itemInfo;
  const { store, orderItemType } = productDetail.miscInfo;
  const { productPartNumber } = productDetail.productInfo;
  const isItemShipToHome = !store;
  const isBopisCtaEnabled = changeStoreType === CARTPAGE_CONSTANTS.BOPIS;
  const isBossCtaEnabled = changeStoreType === CARTPAGE_CONSTANTS.BOSS;
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
  });
};

const getCartRadioButtons = ({
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
  onPickUpOpenClick,
}) => {
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
        onPickUpOpenClick={onPickUpOpenClick}
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
  orderId: PropTypes.string.isRequired,
  onPickUpOpenClick: PropTypes.func.isRequired,
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

const callEditMethod = props => {
  const { productDetail, onQuickViewOpenClick } = props;
  const {
    miscInfo: { orderItemType },
    productInfo: { productPartNumber },
  } = productDetail;
  if (orderItemType === CARTPAGE_CONSTANTS.ECOM) {
    const { itemId, qty, color, size, fit, itemBrand } = productDetail.itemInfo;
    onQuickViewOpenClick({
      colorProductId: productPartNumber,
      orderInfo: {
        orderItemId: itemId,
        selectedQty: qty,
        selectedColor: color,
        selectedSize: size,
        selectedFit: fit,
        itemBrand,
      },
    });
  } else {
    const openSkuSelectionForm = true;
    handleEditCartItemWithStore(orderItemType, openSkuSelectionForm, props);
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
  handleEditCartItemWithStore,
  onSwipeComplete,
  renderImage,
};
