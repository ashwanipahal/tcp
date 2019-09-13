/* eslint-disable sonarjs/no-duplicate-string */
/**
@module vendorStaticAbstractors
*/
import editJsonPopup from '../../../utils/testUtil/editJsonPopup';

const ERRORS_MAP = require('../../handler/stateful/errorResponseMapping/index.json');

const VendorStaticAbstractors = {
  paypalAuthorization: (orderId, fromPage, payload, paypalOrderId) => {
    return editJsonPopup(
      'paypalAuthorization',
      {
        success: true,
      },
      { orderId, fromPage, payload, paypalOrderId }
    );
  },

  acceptOrDeclineWIC: args => {
    return editJsonPopup('acceptOrDeclineWIC', { success: true }, args);
  },

  acceptOrDeclinePreScreenOffer: args => {
    return editJsonPopup('acceptOrDeclinePreScreenOffer', { success: true }, args);
  },

  instantCreditApplication: args => {
    return editJsonPopup(
      'instantCreditApplication',
      {
        onFileCardId: '123456',
        cardType: 'PLACE CARD',
        plccCardId: '1234', // FIXME: rename, it's the last 4 digits of the card
        cardNumber: '************1234',

        isExpirationRequired: false,
        isCVVRequired: false,
        isDefault: false,

        address: {
          firstName: 'john',
          lastName: 'doe',
          addressLine1: '500 Plaza Dr',
          addressLine2: '',
          zipCode: '09750',
          state: 'NJ',
          city: 'Seacacus',
        },
        phoneNumber: '5555555555',
        emailAddress: 'aaa@aaaa.com',

        status: 'APPROVED',
        creditLimit: 4000,
        apr: 28.97,
        couponCode: 'FKJLVFKJLV',
        checkoutCouponError: ERRORS_MAP.WIC_RTPS_COUPON_NOT_APPLIED,
        savingAmount: 9.37,
      },
      args
    );
  },

  startPaypalCheckout(orderId, fromPage) {
    return editJsonPopup(
      'startPaypalCheckout',
      {
        centinelPostbackUrl:
          'https://0centineltest.cardinalcommerce.com/maps/payment_pp_redirect.asp?payload=FIRSTDATAS%7CTCPusTEST%7CnpwtCTOaDkCnMQnFNY20%7CPP',
        centinelTermsUrl:
          'https://localhost/webapp/wcs/stores/servlet/AjaxStoreLocatorDisplayView?catalogId=10551&amp;langId=-1&amp;storeId=10151&amp;callingPage=AjaxOrderItemDisplayView&amp;tcpOrderId=295501',
        centinelPayload: 'FIRSTDATAS|TCPusTEST|npwtCTOaDkCnMQnFNY20|PP',
        centinelOrderId: '8090367089865957',
      },
      { orderId, fromPage }
    );
  },

  getOutfitRecommendations(itemPartNumber, maxResultSet = 5) {
    return editJsonPopup(
      'getOutfitRecommendations',
      [
        {
          generalProductId: '5',
          name: 'outfit 1',
          imagePath:
            'https://stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/collage_images/outfit_collage_image/117510/lookbook.png',
          productIds: 'eesdsd_3321-ASDeeSAD_34324-edsadsa_33sd',
        },
        {
          generalProductId: '6',
          name: 'outfit 2',
          imagePath:
            'https://stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/collage_images/outfit_collage_image/117509/lookbook.png',
          productIds: 'sdsd_3321-ASDSAD_34324-dsadsa_33sd',
        },
      ],
      { itemPartNumber, maxResultSet }
    );
  },

  getRecommendations({ itemPartNumber }) {
    return editJsonPopup(
      'getRecommendations',
      {
        products: [
          {
            generalProductId: '8974328_0A',
            department: 'Girls',
            name: 'Quilted Purse',
            imagePath: '/wcsstore/static/images/fpo-prod-1.jpg',
            listPrice: 19.95,
            offerPrice: 10.47,
            pdpUrl: 'http://www.google.com',
          },
          {
            generalProductId: 'g1_45',
            department: 'Girls',
            name: 'Long Sleeve Glitter "Are you kitten me right meow?" Texting Cats Craphic Tee',
            imagePath: '/wcsstore/static/images/fpo-prod-2.jpg',
            listPrice: 19.95,
            offerPrice: 13.97,
            pdpUrl: 'http://www.google.com',
          },
          {
            generalProductId: '3',
            department: 'Girls',
            name: 'Long Sleeve Glitter "Are You Kitten Me Right Meow" Texting Cats Graphic Tee',
            imagePath: '/wcsstore/static/images/fpo-prod-3.jpg',
            listPrice: 19.95,
            offerPrice: 13.97,
            pdpUrl: 'http://www.google.com',
          },
          {
            generalProductId: '4',
            department: 'Girls',
            name: 'Glitter Bow June Ballet Flat',
            imagePath: '/wcsstore/static/images/fpo-prod-4.jpg',
            listPrice: 24.95,
            offerPrice: 17.47,
            pdpUrl: 'http://www.google.com',
          },
          {
            generalProductId: '5',
            department: 'Girls',
            name: 'Glitter Bow June Ballet Flat',
            imagePath: '/wcsstore/static/images/fpo-prod-4.jpg',
            listPrice: 30.82,
            offerPrice: 11.77,
            pdpUrl: 'http://www.google.com',
          },
        ],
      },
      { itemPartNumber }
    );
  },

  // eslint-disable-next-line no-unused-vars
  calcDistanceByLatLng(storeLocations, coords) {
    // eslint-disable-next-line prefer-rest-params
    return editJsonPopup('calcDistanceByLatLng', [1.3, 2.4, -1, 4.6, 7.8], arguments);
  },
};

export default function getVendorAbstractors() {
  return VendorStaticAbstractors;
}
