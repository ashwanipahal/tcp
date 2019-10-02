/* eslint-disable extra-rules/no-commented-out-code */
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { parseBoolean } from '../../../utils';

const FAKE_WISHLIST_ID = 'fake_sv2a9';
// const noImgPath = '/wcsstore/static/images/im_NotFound.svg';

export const AVAILABILITY = {
  OK: 'OK',
  SOLDOUT: 'SOLDOUT',
  UNAVAILABLE: 'UNAVAILABLE',
  REQ_QTY_UNAVAILABLE: 'REQ_QTY_UNAVAILABLE',
  BOSSINELIGIBLE: 'BOSSINELIGIBLE',
  SUGGESTED: 'SUGGESTED', // REVIEW: we need it to control an state to favorite's item (favorites' page).
};

const addItemToWishlist = wishlistDetails => {
  const { wishlistId, skuIdOrProductId, quantity, isProduct, uniqueId } = wishlistDetails;
  const payload = {
    header: {
      externalId: wishlistId,
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
      console.log('err', err);
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

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      //   TODO - throw new ServiceResponseError(res);
      // }

      if (!res.body || !res.body.length) {
        // Fucking backend won't create a default one, so we need to mimic one
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
          // TODO - fix this - shareableLink: `${this.apiHelper.configOptions.assetHost}/${this.apiHelper.configOptions.siteId }/favorites?wishlistId=${wishlist.giftListExternalIdentifier}&guestAccessKey=${wishlist.guestAccessKey}` // FIXME: this should be at routing level
        };
      });

      // wonderful, service might not return a default one
      if (!containsDefaultWishlist) {
        wishlists[0].isDefault = true;
      }

      return wishlists;
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

      throw this.apiHelper.getFormattedError(err);
    });
};

const getSize = item => {
  return parseBoolean(item.isProduct) ? null : (item.sizes[item.productId] || {}).TCPSize;
};

const getAvailability = item => {
  return item.availability === 'Available' ? AVAILABILITY.OK : AVAILABILITY.SOLDOUT;
};
/**
 * @function getWishListbyId
 * @param {String} wishListId - Id of the wishlist you are moving the item from
 * @param {String} userName - Backend is not going to return a default wishlist, so if the service returns nothing we need to fake one.
 * @param {String} guestAccessKey - guestAccessKey for shared wishlist
 * @see https://childrensplace.atlassian.net/browse/DT-24970
 * @see https://childrensplace.atlassian.net/wiki/display/DT/TCP+API+Specifications?preview=/44072969/69013363/TCP%20-%20API%20Design%20Specification%20-%20Category-Checkout_getWishListById_v1.docx
 */

export const getWishListbyId = (wishListId, userName, guestAccessKey, isCanada, imageGenerator) => {
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

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      //  TODO - throw new ServiceResponseError(res);
      // }
      const wishlist = res.body;
      const pendingPromises = [];

      const rv = {
        id: wishlist.externalIdentifier,
        displayName: wishlist.descriptionName,
        creatorName: userName,
        isDefault: wishlist.default === 'true',
        items: wishlist.item.map((item /* , index */) => {
          // TODO - fix the image request
          // pendingPromises.push(getExtraImages(item.productPartNumber, false, imageGenerator)
          //   .then((extraImages) => {
          //     let extraImage;
          //     if (extraImages.length === 0) {
          //       extraImage = [{
          //         iconSizeImageUrl: noImgPath,
          //         listingSizeImageUrl: noImgPath,
          //         regularSizeImageUrl: noImgPath,
          //         bigSizeImageUrl: noImgPath,
          //         superSizeImageUrl: noImgPath
          //       }];
          //     } else {
          //       extraImage = extraImages;
          //     }

          //     rv.items[index].imagesByColor[item.productColor].extraImages = extraImage;
          //   }));

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
              upc: parseBoolean(item.isProduct) ? null : (item.sizes[item.productId] || {}).UPC,
              imageUrl: item.imagePath,

              // REVIEW: I'm not sure this is the correct place for it,
              // it's just a value we need to store to send to the recommendations service
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
              availability: getAvailability(item), // AVAILABILITY.UNAVAILABLE is there but backend doesn't provide it
              keepAlive: parseBoolean(
                this.apiHelper.configOptions.isUSStore
                  ? item.TCPOutOfStockFlagUSStore
                  : item.TCPOutOfStockFlagCanadaStore
              ),
            },
            imagesByColor: {
              [item.productColor]: {
                extraImages: [],
              },
            },
            miscInfo: {
              // when an item is added to the wishlist, backend chosses a random sku,
              // and we need to pass that random sku when moving to a different wishlist.
              // since that is the case we also need to flag when to show the quivkiew for such item
              isShowQuickView: parseBoolean(item.isProduct),
              // FIXME: BE to get a BOPIS flag
              isBopisEligible: !!item.itemTCPROPISUSStore,
              itemTCPROPISUSStore: null, // FIXME: We need
              clearanceItem: (item.itemTCPProductInd || '').toLowerCase() === 'clearance', // for sorting
              newArrivalItem: (item.itemTCPProductInd || '').toLowerCase() === 'new arrivals', // for sorting
            },
            quantityPurchased: parseInt(item.quantityBought, 10),
          };
        }),
      };

      return Promise.all(pendingPromises).then(() => rv);
    })
    .catch(err => {
      throw this.apiHelper.getFormattedError(err);
    });
};

export default addItemToWishlist;
