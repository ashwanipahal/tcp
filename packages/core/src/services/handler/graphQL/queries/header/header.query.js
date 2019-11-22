const buildQuery = ({ type, brand, country, channel, lang }) => `
  header: globalModule(type: "${type}", brand: "${brand}", country: "${country}", channel: "${channel}", lang: "${lang}") {
    errorMessage
    submodules {
      topNavWrapper {
        composites {
          brand_tabs: brandTabs {
            url
            title
            target
            external
            class
          }

          richTextList {
            text
          }

          promo_message_wrapper: promoMessageWrapper {
            richText {
              text
            }
            link {
              url
              title
              text
              target
              external
            }
          }
        }
      } 
      
      promoHtmlBannerCarousel {
          composites {
            promoHtmlBanner {
                text
              }
          }
      } 

      promoTextBannerCarousel {
        composites {
          promoTextBanner {
            linkClass {
              url
              title
              text
              target
              external
              class
            }
            textItems {
              text
              style
            }
          }
        }
      }

      loyaltyPromoBannerWrapper {
        composites {
          loyaltyPromoBanner {
            link {
              url
              title
              target
            }
            richText {
              text
            }
          }
        }
      }
    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
