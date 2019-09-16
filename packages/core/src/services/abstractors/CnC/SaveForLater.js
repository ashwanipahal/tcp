/* eslint-disable extra-rules/no-commented-out-code */
/* eslint-disable */

import endpoints from '../../endpoints';
import { executeStatefulAPICall } from '../../handler';
import {
  responseContainsErrors,
  ServiceResponseError,
  getFormattedError,
} from '../../../utils/errorMessage.util';
import { extractPrioritizedBadge, getProductAttributes } from '../../../utils/badge.util';
import { sanitizeEntity, flatCurrencyToCents, AVAILABILITY } from './CartItemTile';

export function formatSflItems(sflResponse, imageGenerator, currencyCode, isCanada) {
  const sflObject = {
    sflItems: [],
  };

  for (let item of sflResponse) {
    const isGiftCard = item.isGiftCard;
    let sizeAndFit = item.itemAtributes;

    sflObject.sflItems.push({
      productInfo: {
        generalProductId: isGiftCard ? item.itemCatentryId.toString() : item.productId,
        productPartNumber: item.productInfo && item.productInfo.productPartNumber,
        skuId: isGiftCard ? item.productId : item.itemCatentryId.toString(),
        name: sanitizeEntity(item.productInfo.productName),
        imagePath: imageGenerator(item.productInfo.productPartNumber)
          ? imageGenerator(item.productInfo.productPartNumber).productImages[500]
          : '',
        size: sizeAndFit ? sizeAndFit.TCPSize : item.itemUnitDstPrice, // giftCard Size is its price
        fit: sizeAndFit ? sizeAndFit.TCPFit : null, // no fit for gift cards
        pdpUrl: item.productUrl.replace(/&amp;/g, '&'),
        color: {
          name: item.productInfo.productColor
            ? item.productInfo.productColor
            : item.productInfo.productName,
          imagePath: imageGenerator(item.productInfo.productThumbnail)
            ? imageGenerator(item.productInfo.productThumbnail).colorSwatch
            : '',
        },
        isGiftCard: isGiftCard,
        colorFitSizeDisplayNames: isGiftCard ? { color: 'Design', size: 'Value' } : {},
      },
      itemInfo: {
        itemId: item.itemCatentryId.toString(),
        //In case of giftcard, take the TCPSize attribute as price
        //In not giftcard, For Canada, take the offerPriceCAD else take offerPrice
        offerPrice:
          isGiftCard && sizeAndFit
            ? flatCurrencyToCents(sizeAndFit.TCPSize)
            : isCanada
            ? flatCurrencyToCents(item.productInfo.offerPriceCAD)
            : flatCurrencyToCents(item.productInfo.offerPrice),
      },
      miscInfo: {
        badge: extractPrioritizedBadge(item.productInfo, getProductAttributes()),
        availability: deriveSflItemAvailability(item, currencyCode),
      },
      itemStatus: {},
    });
  }
  return sflObject;
}

export function addItemToSflList(
  catEntryId,
  isRememberedUser,
  isRegistered,
  imageGenerator,
  currencyCode,
  isCanada
) {
  const payload = {
    body: {
      catentryId: catEntryId,
      isRememberedUser,
      isRegistered,
    },
    webService: endpoints.addSflItem,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        return formatSflItems(res.body.sflItems, imageGenerator, currencyCode, isCanada);
      }
    })
    .catch(err => {
      console.log({ err });
      throw getFormattedError(err);
    });
}

export function deriveSflItemAvailability(item, currencyCode) {
  const isUsOrder = currencyCode === 'USD';
  const isCaOrder = currencyCode !== 'USD';

  if (
    (isUsOrder && item.productInfo.articleOOSUS) ||
    (isCaOrder && item.productInfo.articleOOSCA)
  ) {
    return AVAILABILITY.SOLDOUT;
  }
  if (item.inventoryAvail > 0) {
    return AVAILABILITY.OK;
  }
  return AVAILABILITY.UNAVAILABLE;
}

export default {
  formatSflItems,
  addItemToSflList,
  deriveSflItemAvailability,
};
