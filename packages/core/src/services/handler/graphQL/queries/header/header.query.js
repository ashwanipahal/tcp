const buildQuery = ({ type, brand, country, channel, lang }) => `
  header: globalModule(type: "${type}", brand: "${brand}", country: "${country}", channel: "${channel}", lang: "${lang}") {
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
              text
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

    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
