const buildQuery = ({ type, brand, country, channel }) => `
  header: globalModule(type: "${type}", brand: "${brand}", country: "${country}", channel: "${channel}") {
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

          promo_message_wrapper: promoMessageWrapper {
            richText {
              text
            }
            link {
              url
              title
              target
              external
            }
          }
        }
      }

      promoTextBannerCarousel {
        composites {
          promoTextBanner {
            linkClass {
              url
              title
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
            image {
              url
              title
              alt
            }
            link {
              url
              title
              target
              external
            }
            styled {
              text
              style
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
