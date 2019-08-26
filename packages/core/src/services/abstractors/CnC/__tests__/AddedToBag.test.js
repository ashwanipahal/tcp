import { executeStatefulAPICall, executeUnbxdAPICall } from '../../../handler/handler';
import {
  getUnboxResult,
  getPlpProducts,
  getGiftCardProducts,
  addCartEcomItem,
  addCartBopisItem,
} from '../AddedToBag';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
  executeUnbxdAPICall: jest.fn(),
}));

describe('AddedToBag', () => {
  it('#getUnboxResult', () => {
    const result = {
      body: {
        response: {
          products: [{}],
        },
      },
    };
    executeUnbxdAPICall.mockImplementation(() => Promise.resolve(result));
    getUnboxResult({
      body: {
        rows: 20,
        variants: true,
        'variants.count': 100,
        version: 'V2',
        'facet.multiselect': true,
        selectedfacet: true,
        q: 'query',
        promotion: false,
        pagetype: 'boolean',
        fields:
          'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant,low_offer_price,high_offer_price,low_list_price,high_list_price,long_product_title',
      },
    }).then(val => expect(val).toMatchObject(result.body));
  });

  it('#getPlpProducts', () => {
    const result = {
      body: {
        response: {
          products: [{}],
        },
      },
    };
    executeUnbxdAPICall.mockImplementation(() => Promise.resolve(result));
    getPlpProducts().then(val => expect(val).toMatchObject(result));
  });
  it('#getGiftCardProducts', () => {
    const result = {
      body: {
        response: {
          products: [{}],
        },
      },
    };
    executeUnbxdAPICall.mockImplementation(() => Promise.resolve(result));
    getGiftCardProducts().then(val => expect(val).toMatchObject(result));
  });

  it('#addCartEcomItem', () => {
    const result = {
      body: {
        orderId: [{}],
        orderItemId: [{}],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    addCartEcomItem().then(val => expect(val).toMatchObject(result));
  });

  it('#addCartEcomItem error', () => {
    const result = {
      error: {
        orderId: [{}],
        orderItemId: [{}],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    addCartEcomItem().catch(val => expect(val).toMatchObject(result));
  });

  it('#addCartBopisItem', () => {
    const result = {
      body: {
        orderItemId: [{}],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    addCartBopisItem().then(val => expect(val).toMatchObject(result));
  });
  it('#addCartBopisItem error', () => {
    const result = {
      error: {
        orderItemId: [{}],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    addCartBopisItem().catch(val => expect(val).toMatchObject(result));
  });
});
