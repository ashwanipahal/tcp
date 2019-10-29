/* eslint-disable max-lines */
/* eslint-disable extra-rules/no-commented-out-code */
import { getAPIConfig, parseBoolean, getBrand } from '@tcp/core/src/utils';
import {
  responseContainsErrors,
  ServiceResponseError,
  getFormattedError,
} from '@tcp/core/src/utils/errorMessage.util';
import {
  isBopisProduct,
  isBossProduct,
} from '@tcp/core/src/components/features/browse/ProductListingPage/util/utility';
import logger from '@tcp/core/src/utils/loggerInstance';
import { insertIntoString } from '@tcp/core/src/utils/utils';
import { executeStatefulAPICall, executeUnbxdAPICall } from '../../handler';
import endpoints from '../../endpoints';

const FAKE_WISHLIST_ID = 'fake_sv2a9';

export const AVAILABILITY = {
  OK: 'OK',
  SOLDOUT: 'SOLDOUT',
  UNAVAILABLE: 'UNAVAILABLE',
  REQ_QTY_UNAVAILABLE: 'REQ_QTY_UNAVAILABLE',
  BOSSINELIGIBLE: 'BOSSINELIGIBLE',
  SUGGESTED: 'SUGGESTED', // REVIEW: we need it to control an state to favorite's item (favorites' page).
};

const addItemToWishlist = wishlistDetails => {
  const { wishListId, skuIdOrProductId, quantity, isProduct, uniqueId } = wishlistDetails;
  const payload = {
    header: {
      externalId: wishListId,
      addItem: true,
    },
    body: {
      item: [
        {
          productId: skuIdOrProductId,
          quantityRequested: `${quantity}`,
          isProduct: isProduct ? 'TRUE' : 'FALSE',
        },
      ],
      uniqueId,
    },
    webService: endpoints.addOrUpdateWishlist,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      //   TODO - in case of error - handle it - throw new ServiceResponseError(res);
      // }

      const newItem = res.body.item[0];

      return {
        newItemId: newItem && newItem.giftListItemID,
        favoritedCount: newItem && newItem.counter,
      };
    })
    .catch(err => {
      logger.error('err', err);
    });
};

/**
 * @function getUserWishLists
 * @see https://childrensplace.atlassian.net/wiki/display/DT/TCP+API+Specifications?preview=/44072969/68038386/TCP%20-%20API%20Design%20Specification%20-%20Category-CART_getListofWishList_v1.docx
 */
export const getUserWishLists = userName => {
  const payload = {
    webService: endpoints.getListofWishList,
  };
  const { assetHost, siteId } = getAPIConfig();

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        if (!res.body || !res.body.length) {
          // Backend won't create a default one, so we need to mimic one
          return [
            {
              id: FAKE_WISHLIST_ID,
              displayName: `${userName}'s Favorites`,
              isDefault: true,
              itemsCount: 0,
              shareableLink: '',
            },
          ];
        }

        let containsDefaultWishlist = false;
        const wishlists = res.body.map(wishlist => {
          containsDefaultWishlist = containsDefaultWishlist || wishlist.status === 'Default';
          return {
            id: `${wishlist.giftListExternalIdentifier}`,
            displayName: wishlist.nameIdentifier,
            isDefault: wishlist.status === 'Default',
            itemsCount: wishlist.itemCount,
            shareableLink: `${assetHost}/${siteId}/favorites?wishlistId=${
              wishlist.giftListExternalIdentifier
            }&guestAccessKey=${wishlist.guestAccessKey}`,
          };
        });

        // Incase there is no default wishlist item is passed from the API
        if (!containsDefaultWishlist) {
          wishlists[0].isDefault = true;
        }

        return wishlists;
      }
    })
    .catch(err => {
      if (
        err &&
        err.response &&
        err.response.body &&
        err.response.body.errorCode === 'NO_WISHLIST_FOUND'
      ) {
        return [
          {
            id: FAKE_WISHLIST_ID,
            displayName: `${userName}'s Favorites`,
            isDefault: true,
            itemsCount: 0,
            shareableLink: '',
          },
        ];
      }

      throw getFormattedError(err);
    });
};

const getSize = item => {
  return parseBoolean(item.isProduct) ? null : (item.sizes[item.productId] || {}).TCPSize;
};

const getAvailability = item => {
  return item.availability === 'Available' ? AVAILABILITY.OK : AVAILABILITY.SOLDOUT;
};

const generateUPC = item =>
  parseBoolean(item.isProduct) ? null : (item.sizes[item.productId] || {}).UPC;

const getExistingImagesNames = (imageSuffixesArray, baseUrl) => {
  const NOP = () => null;
  // eslint-disable-next-line global-require
  const request = require('superagent');
  const pendingPromises = [];
  const foundImagesMap = {};
  imageSuffixesArray.forEach(suffix => {
    pendingPromises.push(
      /** Assumption: if the icon exists the images should be available in all other sizes as well  */
      request
        .head(insertIntoString(baseUrl, -4, 0, suffix))
        .timeout({
          response: 10000, // Wait 10 seconds for the server to start sending,
          deadline: 30000, // but allow 30 seconds for the file to finish loading.
        })
        .then(res => {
          if (res.ok) {
            foundImagesMap[suffix] = true; // changed from push() to keep the same order as it came in imageSuffixesArray
          }
        })
        .catch(NOP) // ignore any failures (we simply do not increment foundImagesCount)
    );
  });
  return Promise.all(pendingPromises).then(() =>
    imageSuffixesArray.filter(suffix => foundImagesMap[suffix])
  );
};

const getExtraImages = (imagePath, extraSizes, imageGenerator) => {
  const { productImages } = imageGenerator(imagePath);
  const { assetHost, productAssetPath = `ecom/assets/products/${getBrand()}` } = getAPIConfig();
  const baseImgPath = `${assetHost}/w_320/${productAssetPath}/${productImages[125]}`;
  return getExistingImagesNames(extraSizes || ['', '-1', '-2', '-3', '-4', '-5'], baseImgPath).then(
    existingSuffixes =>
      existingSuffixes.map(suffix => ({
        iconSizeImageUrl: insertIntoString(productImages[125], -4, 0, suffix),
        listingSizeImageUrl: insertIntoString(productImages[380], -4, 0, suffix),
        regularSizeImageUrl: insertIntoString(productImages[500], -4, 0, suffix),
        bigSizeImageUrl: insertIntoString(productImages[900], -4, 0, suffix),
        superSizeImageUrl: insertIntoString(productImages[900], -4, 0, suffix),
      }))
  );
};

const getKeepAlive = (item, isUSStore) =>
  parseBoolean(isUSStore ? item.TCPOutOfStockFlagUSStore : item.TCPOutOfStockFlagCanadaStore);

const getClearanceItem = item => (item.itemTCPProductInd || '').toLowerCase() === 'clearance';

const newArrivalItem = item => (item.itemTCPProductInd || '').toLowerCase() === 'new arrivals';

/**
 * @function getWishListbyId
 * @param {String} wishListId - Id of the wishlist you are moving the item from
 * @param {String} userName - Backend is not going to return a default wishlist, so if the service returns nothing we need to fake one.
 * @param {String} guestAccessKey - guestAccessKey for shared wishlist
 * @see https://childrensplace.atlassian.net/browse/DT-24970
 * @see https://childrensplace.atlassian.net/wiki/display/DT/TCP+API+Specifications?preview=/44072969/69013363/TCP%20-%20API%20Design%20Specification%20-%20Category-Checkout_getWishListById_v1.docx
 */
export const getWishListbyId = ({
  wishListId,
  userName,
  guestAccessKey,
  isCanada,
  imageGenerator,
}) => {
  const payload = {
    header: {
      externalId: wishListId,
      guestAccessKey,
    },
    webService: endpoints.getWishListbyId,
  };

  if (wishListId === FAKE_WISHLIST_ID) {
    return {
      id: FAKE_WISHLIST_ID,
      displayName: `${userName}'s Favorites`,
      creatorName: userName,
      isDefault: true,
      items: [],
    };
  }

  const { isUSStore } = getAPIConfig();

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        const wishlist = res.body;
        const pendingPromises = [];

        const rv = {
          id: wishlist.externalIdentifier,
          displayName: wishlist.descriptionName,
          creatorName: userName,
          isDefault: wishlist.default === 'true',
          items: wishlist.item.map((item, index) => {
            const { productImages } = imageGenerator(item.productPartNumber);
            pendingPromises.push(
              getExtraImages(item.productPartNumber, false, imageGenerator).then(extraImages => {
                let extraImage;
                if (extraImages.length === 0) {
                  extraImage = [
                    {
                      iconSizeImageUrl: productImages[125],
                      listingSizeImageUrl: productImages[380],
                      regularSizeImageUrl: productImages[500],
                      bigSizeImageUrl: productImages[900],
                      superSizeImageUrl: productImages[900],
                    },
                  ];
                } else {
                  extraImage = extraImages;
                }
                rv.items[index].imagesByColor[item.productColor] = {
                  extraImages: extraImage,
                  basicImageUrl: productImages[125],
                };
              })
            );

            return {
              productInfo: {
                generalProductId: item.parentProductId,
                name: item.productName,
                isGiftCard: item.isGiftCard !== '0',
                pdpUrl: item.productURL,
                listPrice: item.ListPrice,
                offerPrice: isCanada ? item.OfferPriceCAD : item.OfferPriceUS,
              },
              skuInfo: {
                skuId: item.productId,
                upc: generateUPC(item),
                imageUrl: item.imagePath,

                colorProductId: item.productPartNumber,
                color: {
                  name: item.productColor,
                  imagePath: imageGenerator(item.thumbnail).colorSwatch,
                },
                fit: (item.sizes[item.productId] || {}).TCPFit,
                size: getSize(item),
              },
              itemInfo: {
                itemId: item.giftListItemID,
                quantity: parseInt(item.quantityRequested, 10),
                store: null,
                storeZipCode: null,
                isTCP: item.itemBrand === 'TCP',
                availability: getAvailability(item),
                keepAlive: getKeepAlive(item, isUSStore),
              },
              imagesByColor: {
                [item.productColor]: {
                  extraImages: [],
                },
              },
              miscInfo: {
                // when an item is added to the wishlist, backend choses a random sku,
                // and we need to pass that random sku when moving to a different wishlist.
                // since that is the case we also need to flag when to show the quivkiew for such item
                isShowQuickView: parseBoolean(item.isProduct),
                isBopisEligible: !!item.itemTCPROPISUSStore,
                itemTCPROPISUSStore: null,
                clearanceItem: getClearanceItem(item),
                newArrivalItem: newArrivalItem(item),
              },
              quantityPurchased: parseInt(item.quantityBought, 10),
            };
          }),
        };

        return Promise.all(pendingPromises).then(() => rv);
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

/*
 * @function getProductsPrices
 * @summary Auxiliar method to retrieve prices for product recommendations. It returns prices for specific product ids
 * @param {Array[String]} productIds - the ids of all the products to get prices for
 */
export const getProductsPrices = productIds => {
  // Checking if the store is US or Canada and setting the merchant tag accordingly. This is send to show the merchant tags (if available) on recommendation widget.
  // const merchant = config.isUSStore ? "TCPMerchantTagUSStore" : "TCPMerchantTagCanadaStore";

  const payload = {
    body: {
      id: productIds.join(','),
      fields:
        'min_offer_price,min_list_price,TCPWebOnlyFlagUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,TCPProductIndUSStore,TCPProductIndCanadaStore',
    },
    webService: endpoints.getProductDetails,
  };

  return executeUnbxdAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        const price = {};
        const { isUSStore } = getAPIConfig();

        if (res.body && res.body.response) {
          res.body.response.products.forEach(product => {
            price[product.uniqueId] = {
              listPrice:
                (product.min_list_price === product.min_offer_price
                  ? product.min_offer_price
                  : product.min_list_price) || 0,
              offerPrice: product.min_offer_price || 0,
              isBopisEligible: isBopisProduct(isUSStore, product),
              isBossEligible: isBossProduct({
                bossCategoryDisabled: product.TcpBossCategoryDisabled,
                bossProductDisabled: product.TcpBossProductDisabled,
              }),
              clearanceItem: isUSStore
                ? product.TCPProductIndUSStore === 'Clearance'
                : product.TCPProductIndCanadaStore === 'Clearance',
            };
          });
        }
        return price;
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

/**
 * @function createWishList
 * @param {string} wishlistId - The is of the wishlist you would like to create
 * @param {string} isDefault - flags if this should become the favorite wishlist
 * @see https://childrensplace.atlassian.net/wiki/display/DT/TCP+API+Specifications?preview=/44072969/69011584/TCP%20-%20API%20Design%20Specification%20-%20Category-Checkout_createWishList_v1.docx
 */
export const createWishList = (wishlistName, isDefault) => {
  const payload = {
    body: {
      descriptionName: wishlistName || 'random',
      state: isDefault ? 'Default' : 'Active',
    },
    webService: endpoints.createWishListForUser,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        return {
          id: res.body.uniqueID,
          success: true,
        };
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

export const moveItemToNewWishList = (formData, activeWishlistId, activeWishlistItem) => {
  const args = {
    fromWishListId: activeWishlistId,
    toWishListId: formData.toWishListId,
    generalProductId: activeWishlistItem.productInfo.generalProductId,
    skuId: activeWishlistItem && activeWishlistItem.skuInfo.skuId,
    wishListItemId: formData.itemId,
    quantity: activeWishlistItem && activeWishlistItem.itemInfo.quantity,
    isProduct: !activeWishlistItem.skuInfo.size,
  };

  const payload = {
    header: {
      'Content-Type': 'application/json',
      itemId: args.wishListItemId,
      addItem: 'true',
      fromExternalId: args.fromWishListId,
      toExternalId: args.toWishListId,
    },
    body: {
      item: [
        {
          productId: args.isProduct ? args.generalProductId : args.skuId,
          quantityRequested: args.quantity.toString(),
          isProduct: args.isProduct ? 'TRUE' : 'FALSE',
        },
      ],
    },
    webService: endpoints.moveWishListItem,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        return { success: true };
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

/**
 * @function deleteWishList
 * @param {string} wishlistId - The is of the wishlist you would like to share
 * @see https://childrensplace.atlassian.net/wiki/display/DT/TCP+API+Specifications?preview=/44072969/69011822/TCP%20-%20API%20Design%20Specification%20-%20Category-Checkout_deleteWishList_v1.docx
 */
export const deleteWishList = wishlistId => {
  const payload = {
    header: {
      externalId: wishlistId,
    },
    webService: endpoints.deleteWishListForUser,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        return {
          success: true,
          uniqueID: res.uniqueID,
        };
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

/**
 * @function updateWishlistName
 * @summary This API is used to update your wishlist name.
 * @param {String} newName - The wishlist's name that it will now be refered to
 * @param {String} wishlistId - Id of the wishlist you want to update
 * @param {Boolean} isDefault - Whether to make the wishlist as the default one
 * @see https://childrensplace.atlassian.net/wiki/display/DT/TCP+API+Specifications?preview=/44072969/68045657/TCP%20-%20API%20Design%20Specification%20-%20Category-CART_EditWishlist_v3.docx
 */
export const updateWishlistName = (wishlistId, newName, isDefault) => {
  const payload = {
    header: {
      externalId: wishlistId !== FAKE_WISHLIST_ID ? wishlistId : null,
    },
    body: {
      descriptionName: newName,
      state: isDefault ? 'Default' : 'Active',
    },
    webService: endpoints.editWishList,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        return {
          success: true,
        };
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

/**
 * @function deleteWishListItem
 * @param {string} wishlistId - id of the wishlist you would like to share
 * @param {string} itemId - id of the item you want to remove
 * @see https://childrensplace.atlassian.net/wiki/display/DT/TCP+API+Specifications?preview=/44072969/69011822/TCP%20-%20API%20Design%20Specification%20-%20Category-Checkout_deleteWishList_v1.docx
 */
export const deleteWishListItem = (externalId, itemId) => {
  const payload = {
    header: {
      externalId,
      itemId,
    },
    webService: endpoints.deleteWishListItemForUser,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        return {
          success: true,
          uniqueId: res.uniqueId,
        };
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

/**
 * @function shareWishlistByEmail
 * @param {string} wishlistId - The is of the wishlist you would like to share
 * @param {string} from - The current users email address
 * @param {array<string>} to - An array of strings, each string being an email address
 * @param {string} message - A string message to be sent
 * @see https://childrensplace.atlassian.net/wiki/display/DT/TCP+API+Specifications?preview=/44072969/69075593/TCP%20-%20API%20Design%20Specification%20-%20Category-Checkout_shareWishList_v1.docx
 */
export const shareWishlistByEmail = (wishlistId, from, to, subject, message) => {
  const payload = {
    header: {
      externalId: wishlistId,
      type: 'email',
    },
    body: {
      recipientEmail: to.map(email => ({ email: (email || '').trim() })),
      senderEmail: from,
      subject,
      message,
    },
    webService: endpoints.shareWishListForUser,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        return {
          successful: true,
        };
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

export default addItemToWishlist;
