import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import ItemAvailability from '@tcp/core/src/components/features/CnC/common/molecules/ItemAvailability';
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
  IconTextMoveToBag,
  SflIcons,
  SizeQtyOnReview,
} from '../styles/CartItemTile.style.native';
import { getLocator } from '../../../../../../../utils';
import CartItemRadioButtons from '../../CartItemRadioButtons';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import CartItemTileExtension from './CartItemTileExtension.view.native';

const editIcon = require('../../../../../../../assets/edit-icon.png');
const deleteIcon = require('../../../../../../../assets/delete.png');
const moveToBagIcon = require('../../../../../../../assets/moveToBag-icon.png');
const sflIcon = require('../../../../../../../assets/sfl-icon.png');

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
  isBagPageSflSection,
  showOnReviewPage
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
      />
    );
  }
  return <></>;
};

class ProductInformation extends React.Component {
  swipeable = React.createRef();

  renderSflActionsLinks = () => {
    const { productDetail, isShowSaveForLater, labels, isBagPageSflSection } = this.props;
    const { saveForLaterLink, moveToBagLink } = labels;
    const isOK = productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_OK;
    if (!isBagPageSflSection && isOK && isShowSaveForLater) {
      return (
        <SflIcons onPress={() => CartItemTileExtension.handleMoveItemtoSaveList(this.props)}>
          <Image
            data-locator="save-for-later-link"
            source={sflIcon}
            height={IconHeight}
            width={IconWidth}
          />
          <IconTextMoveToBag>{saveForLaterLink}</IconTextMoveToBag>
        </SflIcons>
      );
    }
    if (isBagPageSflSection && isOK) {
      return (
        <SflIcons onPress={() => CartItemTileExtension.moveToBagSflItem(this.props)}>
          <Image
            data-locator="move-to-bag-link"
            source={moveToBagIcon}
            height={IconHeight}
            width={IconWidth}
          />
          <IconTextMoveToBag>{moveToBagLink}</IconTextMoveToBag>
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
        <BodyCopy
          fontSize="fs13"
          color="gray.800"
          fontFamily="secondary"
          text={!fit || fit === 'Regular' ? ' ' : fit}
        />
      </ProductDesc>
    );
  };

  renderPrice = () => {
    const { labels, productDetail } = this.props;
    const { isBagPageSflSection, showOnReviewPage, currencySymbol } = this.props;
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
              text={`${currencySymbol}${productDetail.itemInfo.price}`}
            />

            {!isBagPageSflSection && (
              <ProductListPrice>
                <BodyCopy
                  color="gray.800"
                  fontFamily="secondary"
                  fontSize="fs13"
                  text={
                    productDetail.itemInfo.price !== productDetail.itemInfo.itemPrice
                      ? `${currencySymbol}${productDetail.itemInfo.itemPrice}`
                      : ''
                  }
                />
              </ProductListPrice>
            )}
          </>
        )}
      </ProductDesc>
    );
  };

  rightButton = () => {
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
        {productDetail.miscInfo.availability !== CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT && (
          <TouchableOpacity
            accessibilityRole="link"
            onPress={() => {
              CartItemTileExtension.callEditMethod(this.props);
              this.onSwipeComplete(this.swipeable);
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

  onSwipeComplete = swipe => {
    const { swipedElement, setSwipedElement } = this.props;
    if (swipedElement && swipedElement !== swipe) {
      swipedElement.recenter();
    }
    setSwipedElement(swipe);
  };

  render() {
    const { productDetail, labels, itemIndex, showOnReviewPage, currencySymbol } = this.props;
    const { openedTile, setSelectedProductTile, isBagPageSflSection } = this.props;
    const { isGiftItem } = productDetail.itemInfo;
    return (
      <Swipeable
        onRef={ref => {
          this.swipeable = ref;
        }}
        rightButtons={[this.rightButton()]}
        rightButtonWidth={240}
        leftButtons={null}
        onSwipeComplete={(event, gestureState, swipe) => {
          this.onSwipeComplete(swipe);
        }}
      >
        <MainWrapper>
          <UnavailableView>{getItemStatus(productDetail, labels)}</UnavailableView>
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
          {showOnReviewPage && (
            <EditButton
              onPress={() => {
                this.onSwipeComplete(this.swipeable);
                return this.swipeable.toggle('right');
              }}
            >
              {CartItemTileExtension.getEditError(productDetail, labels)}
            </EditButton>
          )}
          {getCartRadioButtons(
            productDetail,
            labels,
            itemIndex,
            openedTile,
            setSelectedProductTile,
            isBagPageSflSection,
            showOnReviewPage
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
  swipedElement: PropTypes.shape({}),
  setSwipedElement: PropTypes.func.isRequired,
  isBagPageSflSection: PropTypes.bool,
  isShowSaveForLater: PropTypes.bool.isRequired,
  isGenricGuest: PropTypes.shape({}).isRequired,
  showOnReviewPage: PropTypes.bool,
  currencySymbol: PropTypes.string.isRequired,
};

ProductInformation.defaultProps = {
  productDetail: {},
  labels: {},
  itemIndex: 0,
  openedTile: 0,
  isCondense: true,
  swipedElement: null,
  isBagPageSflSection: false,
  showOnReviewPage: true,
};

export default ProductInformation;
