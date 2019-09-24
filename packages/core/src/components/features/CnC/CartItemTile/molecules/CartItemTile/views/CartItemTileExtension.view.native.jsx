import React from 'react';
import { View } from 'react-native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import {
  ImgWrapper,
  ImageStyle,
  ImageBrandStyle,
  ImageGymBrandStyle,
  SoldOutLabel,
  HeartIcon,
  ProductName,
} from '../styles/CartItemTile.style.native';
import Image from '../../../../../../common/atoms/Image';
import endpoints from '../../../../../../../service/endpoint';
import { getLocator } from '../../../../../../../utils';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';

const gymboreeImage = require('../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../assets/tcp-logo.png');
const heart = require('../../../../../../../assets/heart.png');

const CartItemImageWrapper = (productDetail, labels) => {
  return (
    <ImgWrapper>
      <View>
        <ImageStyle
          data-locator={getLocator('cart_item_image')}
          source={{ uri: endpoints.global.baseURI + productDetail.itemInfo.imagePath }}
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

const heartIcon = isBagPageSflSection => {
  if (!isBagPageSflSection) return null;
  return (
    <HeartIcon onPress={() => {}}>
      <Image data-locator="heartIcon" source={heart} height={13} width={15} />
    </HeartIcon>
  );
};

const getProductName = productDetail => {
  return (
    <ProductName>
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

export default { CartItemImageWrapper, heartIcon, getProductName, handleMoveItemtoSaveList };
