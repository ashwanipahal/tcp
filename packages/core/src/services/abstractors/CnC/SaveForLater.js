/* eslint-disable extra-rules/no-commented-out-code */

import endpoints from '../../endpoints';
import { executeStatefulAPICall } from '../../handler';
import { getAPIConfig } from '../../../utils';
import {
  responseContainsErrors,
  ServiceResponseError,
  getFormattedError,
} from '../../../utils/errorMessage.util';
import { extractPrioritizedBadge, getCartProductAttributes } from '../../../utils/badge.util';
import { sanitizeEntity, flatCurrencyToCents, AVAILABILITY } from './CartItemTile';

export function getProductInfo(item, imageGenerator) {
  const { isGiftCard, itemAtributes, itemBrand } = item;
  const sizeAndFit = itemAtributes;
  const returnProductInfo = {
    generalProductId: isGiftCard ? item.itemCatentryId.toString() : item.productId,
    productPartNumber: item.productInfo && item.productInfo.productPartNumber,
    skuId: isGiftCard ? item.productId : item.itemCatentryId.toString(),
    name: sanitizeEntity(item.productInfo.productName),
    imagePath: imageGenerator(item.productInfo.productPartNumber)
      ? imageGenerator(item.productInfo.productPartNumber).productImages[500]
      : '',
    pdpUrl: item.productUrl.replace(/&amp;/g, '&'),
    color: {
      name: item.productInfo.productColor
        ? item.productInfo.productColor
        : item.productInfo.productName,
      imagePath: imageGenerator(item.productInfo.productThumbnail)
        ? imageGenerator(item.productInfo.productThumbnail).colorSwatch
        : '',
    },
    isGiftCard,
    colorFitSizeDisplayNames: isGiftCard ? true : {}, // To Do when consuming this data { color: 'Design', size: 'Value' }
    itemBrand,
  };
  if (sizeAndFit) {
    returnProductInfo.size = sizeAndFit.TCPSize;
    returnProductInfo.fit = sizeAndFit.TCPFit;
    returnProductInfo.upc = sizeAndFit.UPC;
  } else {
    returnProductInfo.size = item.itemUnitDstPrice;
    returnProductInfo.fit = null;
  }
  return returnProductInfo;
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

export function getItemOfferPrice(item, sizeAndFit, isCanada) {
  const { isGiftCard } = item;
  let Price = '';
  if (isGiftCard && sizeAndFit) {
    Price = flatCurrencyToCents(sizeAndFit.TCPSize);
  } else {
    Price = isCanada
      ? flatCurrencyToCents(item.productInfo.offerPriceCAD)
      : flatCurrencyToCents(item.productInfo.offerPrice);
  }
  return Price;
}

export function formatSflItems(sflResponse, imageGenerator, currencyCode, isCanada) {
  const sflObject = {
    sflItems: [],
  };

  sflResponse.forEach(item => {
    const sizeAndFit = item.itemAtributes;

    sflObject.sflItems.push({
      productInfo: getProductInfo(item, imageGenerator),
      itemInfo: {
        itemId: item.itemCatentryId.toString(),
        offerPrice: getItemOfferPrice(item, sizeAndFit, isCanada),
      },
      miscInfo: {
        badge: extractPrioritizedBadge(item.productInfo, getCartProductAttributes()),
        availability: deriveSflItemAvailability(item, currencyCode),
      },
      itemStatus: {},
    });
  });

  return sflObject;
}

export function addItemToSflList(
  catEntryId,
  isRememberedUser,
  isRegistered,
  imageGenerator,
  currencyCode,
  isCanada,
  isSflItemDelete = false
) {
  let payload = {
    body: {
      catentryId: catEntryId,
      isRememberedUser,
      isRegistered,
    },
    webService: endpoints.addSflItem,
  };

  if (isSflItemDelete) {
    const apiConfig = getAPIConfig();
    payload = {
      header: {
        'X-Cookie': apiConfig.cookie,
        catentryId: catEntryId,
        isRememberedUser,
        isRegistered,
      },
      webService: endpoints.deleteSflItem,
    };
  }

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        return formatSflItems(res.body.sflItems, imageGenerator, currencyCode, isCanada);
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
}

export function getSflItems(imageGenerator, currencyCode, isCanada) {
  const apiConfig = getAPIConfig();
  const payload = {
    header: {
      'X-Cookie': apiConfig.cookie,
    },
    webService: endpoints.getAllSfl,
  };

  return executeStatefulAPICall(payload)
    .then(response => {
      if (responseContainsErrors(response)) {
        throw new ServiceResponseError(response);
      } else {
        return formatSflItems(response.body.sflItems, imageGenerator, currencyCode, isCanada);
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
}

export default {
  formatSflItems,
  addItemToSflList,
  deriveSflItemAvailability,
  getSflItems,
};
