/* eslint-disable no-underscore-dangle */
import { readCookie } from '../../../../utils/cookie.util';
import { isBopisProduct, isBossProduct, getSiteId } from '../../../../utils';
import { executeUnbxdAPICall } from '../../../handler';
import logger from '../../../../utils/loggerInstance';

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

    const recommendations = recs
      .filter(rec => rec.availability === 'In Stock')
      .map(rec => ({
        generalProductId: rec.id.replace(/_(US|CA)$/, ''),
        pdpUrl: rec.pdpURL,
        department: rec.department,
        name: rec.name,
        imagePath: rec.imagePath,
      }));

    return resolve(
      RecommendationsAbstractor.getProductsPrices(
        recommendations.map(recommendation => recommendation.generalProductId)
      ).then(prices => {
        return {
          products: recommendations.map(recommendation => {
            return {
              ...recommendation,
              ...prices[recommendation.generalProductId],
            };
          }),
          mainTitle: title,
        };
      })
    );
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

  handleValidationError: e => {
    logger.error(e);
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
          'min_offer_price,min_list_price,TCPWebOnlyFlagUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,TCPProductIndUSStore,TCPProductIndCanadaStore',
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
        const price = {};
        if (res.body && res.body.response) {
          res.body.response.products.forEach(product => {
            price[product.uniqueId] = {
              listPrice:
                (product.min_list_price === product.min_offer_price
                  ? product.min_offer_price
                  : product.min_list_price) || 0,
              offerPrice: product.min_offer_price || 0,
              isBopisEligible: isBopisProduct(RecommendationsAbstractor.isUSStore, product),
              isBossEligible: isBossProduct({
                bossCategoryDisabled: product.TcpBossCategoryDisabled,
                bossProductDisabled: product.TcpBossProductDisabled,
              }),
              clearanceItem: RecommendationsAbstractor.isUSStore
                ? product.TCPProductIndUSStore === 'Clearance'
                : product.TCPProductIndCanadaStore === 'Clearance',
            };
          });
        }
        return price;
      })
      .catch(err => {
        // if (err && ((err.status >= 400 && err.status <= 404) || err.status === 500) && isClient()) {
        // TODO - handle it - window.location.href = getErrorPagePath(this.apiHelper._configOptions.siteId);
        // }
        RecommendationsAbstractor.handleValidationError(err);
        // TODO - handle it - throw this.apiHelper.getFormattedError(err);
      });
  },
};

export default RecommendationsAbstractor;
