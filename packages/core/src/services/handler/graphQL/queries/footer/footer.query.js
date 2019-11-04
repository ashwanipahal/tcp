const buildQuery = ({ type, brand, country, channel }) => `
  footer: globalModule(
    type: "${type}",
    brand: "${brand}",
    country: "${country}",
    channel: "${channel}",
  ) {
    submodules {
      footerTop {
        composites {
          footerButtons {
            textItems {
              text
              style
            }
            link {
              url
              text
              title
              target
              action
            }
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
              action
            }
            linkList {
              url
              target
              title
              text
              external
              action
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
              action
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
            action
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
