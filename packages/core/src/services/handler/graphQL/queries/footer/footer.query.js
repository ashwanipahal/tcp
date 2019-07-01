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
          buttonGroup {
            url
            title
            external
            target
          }
          socialLinks {
            url
            title
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
              external
              class
            }
            linkList {
              url
              target
              title
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
            external
          }
          richTextGroup {
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
