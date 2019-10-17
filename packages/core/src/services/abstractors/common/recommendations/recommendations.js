/* eslint-disable no-underscore-dangle */
import { readCookie } from '../../../../utils/cookie.util';
import { getSiteId } from '../../../../utils';
import { executeUnbxdAPICall, executeExternalAPICall } from '../../../handler';
import logger from '../../../../utils/loggerInstance';
import processResponse from '../../productListing/processResponse';

const RecommendationsAbstractor = {
  isUSStore: getSiteId() === 'us',
  formatResponseRecommendation: event => {
    let recs = '';
    let title = '';

    if (event.detail) {
      if (Array.isArray(event.detail)) {
        recs = event.detail;
      } else {
        recs = event.detail.recs || [];
        title = event.detail.title || '';
      }
    }

    return { recs, title };
  },
  // event listener callback that sets recommendations and clears itself
  getRecs: resolve => event => {
    const { recs, title } = RecommendationsAbstractor.formatResponseRecommendation(event);
    return resolve(RecommendationsAbstractor.parseProductResponse(recs, title));
  },
  getMcmId: () => {
    let mcmid;
    if (window._satellite && window._satellite.getVisitorId) {
      mcmid = window._satellite.getVisitorId().getMarketingCloudVisitorID();
    } else {
      const cookieArr = readCookie('AMCV_9A0A1C8B5329646E0A490D4D@AdobeOrg').split('|');
      mcmid = cookieArr.length ? cookieArr[cookieArr.indexOf('MCMID') + 1] : '';
    }

    return mcmid;
  },

  parseProductResponse: (products, title) => {
    const recommendations = products
      .filter(product => product.availability === 'In Stock')
      .map(product => ({
        generalProductId: product.id.replace(/_(US|CA)$/, ''),
        pdpUrl: product.pdpURL,
        department: product.department,
        name: product.name,
        imagePath: product.imagePath,
      }));

    return RecommendationsAbstractor.getProductsPrices(
      recommendations.map(recommendation => recommendation.generalProductId)
    ).then(prices => {
      return {
        products: recommendations
          .filter(recommendation => {
            return typeof prices[recommendation.generalProductId] !== 'undefined';
          })
          .map(recommendation => {
            return {
              ...recommendation,
              ...prices[recommendation.generalProductId],
            };
          }),
        mainTitle: title,
      };
    });
  },

  getData: ({
    itemPartNumber,
    page,
    siteId = getSiteId(),
    categoryName,
    mboxName = 'global_recs_mbox',
    otherMboxProps,
  }) => {
    const mcmid = RecommendationsAbstractor.getMcmId();

    return new Promise((resolve, reject) => {
      if (window.adobe && window.adobe.target) {
        window.adobe.target.getOffer({
          mbox: mboxName,
          marketingCloudVisitorId: mcmid || '',
          params: {
            'entity.id': itemPartNumber ? `${itemPartNumber}_${siteId.toUpperCase()}` : '',
            'entity.categoryId': categoryName || '',
            pageType: page || '',
            ...otherMboxProps,
          },
          success: offer => {
            const eventName = `res-${mboxName}`;
            const offers = offer;
            offers[0].content = offers[0].content.replace('pdpRecs', eventName);
            window.addEventListener(eventName, RecommendationsAbstractor.getRecs(resolve));
            window.adobe.target.applyOffer({
              mbox: mboxName,
              offer: offers,
            });
          },
          error() {
            reject(new Error('Adobe getOffer Error'));
          },
        });
      }
    });
  },
  getAppData: ({ pageType, categoryName, partNumber }) => {
    const ADOBE_RECOMMENDATIONS_URL = 'https://tcp.tt.omtrdc.net/rest/v1/mbox?client=tcp';
    const ADOBE_RECOMMENDATIONS_IMPRESSION_ID = 1;
    const ADOBE_RECOMMENDATIONS_HOST = 'thechildrensplace';
    const region = 'US'; // TODO use `CA` for Canada
    const requestLocation = {
      impressionId: ADOBE_RECOMMENDATIONS_IMPRESSION_ID,
      host: ADOBE_RECOMMENDATIONS_HOST,
    };

    return executeExternalAPICall({
      webService: {
        method: 'POST',
        URI: ADOBE_RECOMMENDATIONS_URL,
      },
      body: {
        marketingCloudVisitorId: '',
        mbox: 'target-global-mbox',
        requestLocation,
        mboxParameters: {
          'entity.categoryId': categoryName || 'boysskinnychinopants',
          'entity.id': partNumber ? `${partNumber}_${region.toUpperCase()}` : '2057032_NN_US',
          pageType,
          region,
        },
      },
    }).then(result => {
      return RecommendationsAbstractor.parseProductResponse(
        result.body ? JSON.parse(result.body.content) : []
      );
    });
  },
  handleValidationError: e => {
    logger.error(e);
  },
  getOriginImgHostSetting: () => {
    return 'https://test4.childrensplace.com';
  },
  getSwatchImgPath: (id, excludeExtension) => {
    const imgHostDomain = RecommendationsAbstractor.getOriginImgHostSetting();
    return `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/swatches/${id}${
      excludeExtension ? '' : '.jpg'
    }`;
  },
  getProductImgPath: (id, excludeExtension) => {
    const imgHostDomain = RecommendationsAbstractor.getOriginImgHostSetting();

    return {
      125: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/125/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
      380: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/380/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
      500: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/500/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
      900: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/900/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
    };
  },
  getImgPath: (id, excludeExtension) => {
    return {
      colorSwatch: RecommendationsAbstractor.getSwatchImgPath(id, excludeExtension),
      productImages: RecommendationsAbstractor.getProductImgPath(id, excludeExtension),
    };
  },
  getFacetSwatchImgPath: id => {
    const imgHostDomain = RecommendationsAbstractor.getOriginImgHostSetting();
    return `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/category/color-swatches/${id}.gif`;
  },
  /*
   * @function getProductsPrices
   * @summary Auxiliar method to retrieve prices for product recommendations. It returns prices for specific product ids
   * @param {Array[String]} productIds - the ids of all the products to get prices for
   */
  getProductsPrices: productIds => {
    // Checking if the store is US or Canada and setting the merchant tag accordingly. This is send to show the merchant tags (if available) on recommendation widget.
    // const merchant = config.isUSStore ? "TCPMerchantTagUSStore" : "TCPMerchantTagCanadaStore";
    const payload = {
      body: {
        id: productIds.join(','),
        fields:
          'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore',
      },
      webService: {
        method: 'GET',
        URI: 'products',
        unbxd: true,
        unbxdCustom: true,
      },
    };

    return executeUnbxdAPICall(payload)
      .then(res => {
        return processResponse(res, null, {
          getFacetSwatchImgPath: RecommendationsAbstractor.getFacetSwatchImgPath,
          getImgPath: RecommendationsAbstractor.getImgPath,
          isRecommendationView: true,
        });
      })
      .then(res => {
        const price = {};
        res.loadedProductsPages[0].forEach(product => {
          price[product.productInfo.uniqueId] = {
            ...product,
          };
        });
        return price;
      })
      .catch(err => {
        RecommendationsAbstractor.handleValidationError(err);
      });
  },
};

export default RecommendationsAbstractor;
