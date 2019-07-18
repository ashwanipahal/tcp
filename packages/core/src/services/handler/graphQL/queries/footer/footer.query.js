const buildQuery = ({ type, brand, country, channel }) => `
  footer: globalModule(
    type: "${type}"
    brand: "${brand}"
    country: "${country}"
    channel: "${channel}"
  ) {
    submodules {
      footerTop {
        composites {
          buttonList {
            url
            text
            title
            external
            target
          }
          socialLinks {
            url
            title
            text
            target
            external
            class
          }
        }
      }
      footerMiddle {
        composites {
          mprWrapper {
            linkClass {
              url
              title
              target
              text
              external
              class
            }
            linkList {
              url
              target
              title
              text
              external
            }
          }
          linkColumns {
            text {
              text
            }
            linkList {
              url
              target
              title
              text
              external
            }
          }
        }
      }
      footerBottom {
        composites {
          linkList {
            url
            target
            title
            text
            external
          }
          richTextList {
            text
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
