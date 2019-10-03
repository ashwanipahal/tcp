import { executeUnbxdAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { parseProductFromAPI } from './productDetail';
/**
 * @function getOutfitProdutsDetails
 * @summary This API is used for outfits. You can pass the URI that will be a list of concated part numbers.
 * vendorColorProductIdsList is a string of dash ('-') separated porduct id's of the outfits vendor
 */
const getOutfitProdutsDetails = ({ outfitId, vendorColorProductIdsList, getImgPath, navTree }) => {
  const productPartNumbers = vendorColorProductIdsList.split('-');
  const payload = {
    body: {
      variants: true,
      'variants.count': 100,
      version: 'V2',
      pagetype: 'boolean',
      id: productPartNumbers.join(','),
      fields:
        'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,top_rated,TCPFit,product_name,TCPColor,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,categoryPath2_catMap',
    },
    webService: endpoints.getProductDetails,
  };

  return executeUnbxdAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      // TODO - throw new ServiceResponseError(res);
      // }

      const orderedProducts = res.body.response.products.sort(
        (prev, next) => prev.requestedOrder - next.requestedOrder
      );
      const outFitProductsArray = [];
      orderedProducts
        .filter(product => !!product)
        .map((product, index) => {
          const productAndBreadcrumb = parseProductFromAPI(
            product,
            product.uniqueId,
            getImgPath,
            [],
            false,
            false,
            navTree
          );
          outFitProductsArray[index] = productAndBreadcrumb.product;
          return product;
        });

      return {
        outfitId,
        outfitImageUrl: `https://stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/collage_images/outfit_collage_image/${outfitId}/original.png`, // As per our vendor this URL will never change and always contain the images
        products: outFitProductsArray,
        unavailableCount: productPartNumbers.length - outFitProductsArray.length,
      };
    })
    .catch(err => {
      console.log('err', err);
    });
};

export default getOutfitProdutsDetails;
