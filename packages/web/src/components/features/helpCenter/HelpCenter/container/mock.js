// import modRMock from '@tcp/core/src/services/abstractors/common/moduleR/mock';

/* eslint-disable */
export default {
  Layouts: {
    helpCenterPage: {
      slots: [
        {
          name: 'slot_1',
          moduleName: 'helpCenterTopModule',
          contentId: '28f4e9b-b1ee-4b83-addc-399caae17241',
        },
        {
          name: 'slot_2',
          moduleName: 'module2columns',
          contentId: '728f4e9b-b1ee-4b83-addc-399caae172399,e499bac3-6770-4757-b924-55c837712dfc',
          val: 'navigationModule, helpCenterTabs',
        },
        {
          name: 'slot_3',
          moduleName: 'helpCenterBottomModule',
          contentId: '728f4e9b-b1ee-4b83-addc-399caae1723945',
        },
      ],
      __typename: 'LayoutInfo',
    },
  },
  HelpCenterReducer: {
    '28f4e9b-b1ee-4b83-addc-399caae17241': {
      module: 'helpCenterTopModule',
      composites: {
        'help-center-header': [
          {
            richText: {
              text: `<style>
              .help-center-header {
                border: 1px solid #595959;
                margin: 79px 0 48px;
                position: relative;
                width: 100%;
              }

              .help-center-header .help-center-icon {
                  padding: 12px;
                  background: #ffffff;
                  position: absolute;
                  top: -24px;
                  left: 50%;
                  transform: translateX(-50%);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }

                .help-center-header .help-center-icon img {
                  width: 24px;
                  height: 24px;
                }

                .help-center-header .help-center {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
                .help-center-header .help-center-title__text {
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 18px;
                    margin-top: 32px;
                    margin-bottom: 32px;
                }
                @media (min-width: 1200px) and (max-width: 1439px) {
                  .help-center-header .help-center {
                    flex-direction: row;
                    justify-content: center;
                  }
                  .help-center-header .help-center-title__text {
                    font-size: 36px;
                  }
                }
                @media (min-width: 768px) and (max-width: 1199px) {
                  .help-center-header .help-center-title__text {
                    font-size: 18px;
                  }
                }
              </style><div class="help-center-header">
              <div class="help-center-icon">
                <img src='/static/images/circle-info-blue.svg' alt="Store Icon">
              </div>
              <div class="help-center">
                <div class="help-center-title">
                  <h4 class="help-center-title__text" data-locator="">
                    HELP CENTER
                  </h4>
                </div>
              </div>
            </div>`,
              __typename: 'Text',
            },
          },
        ],
        __typename: 'Composite',
      },
    },
    '728f4e9b-b1ee-4b83-addc-399caae172399': {
      module: 'navigationModule',
      navData: [
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Help Center Home',
            title: 'Help Center Home',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'My Place Rewards Credit Card',
            title: 'My Place Rewards Credit Card',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Coupons and Promotions',
            title: 'Coupons and Promotions',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Help With My Order',
            title: 'Help With My Order',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Online Ordering',
            title: 'Online Ordering',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Policies',
            title: 'Policies',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Terms and Conditions',
            title: 'Terms and Conditions',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Mobile Terms and Conditions ',
            title: 'Mobile Terms and Conditions ',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Shipping to the U.S.',
            title: 'Shipping to the U.S.',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Ordering From Canada',
            title: 'Ordering From Canada',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Tools',
            title: 'Tools',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Contact Us',
            title: 'Contact Us',
            target: '',
            external: 0,
          },
        },
      ],
    },
    'e499bac3-6770-4757-b924-55c837712dfc': {
      module: 'helpCenterTabs',
      navData: [
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Help Center Home',
            title: 'Help Center Home',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'My Place Rewards Credit Card',
            title: 'My Place Rewards Credit Card',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Coupons and Promotions',
            title: 'Coupons and Promotions',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Help With My Order',
            title: 'Help With My Order',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Online Ordering',
            title: 'Online Ordering',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Policies',
            title: 'Policies',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Terms and Conditions',
            title: 'Terms and Conditions',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Mobile Terms and Conditions ',
            title: 'Mobile Terms and Conditions ',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Shipping to the U.S.',
            title: 'Shipping to the U.S.',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Ordering From Canada',
            title: 'Ordering From Canada',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Tools',
            title: 'Tools',
            target: '',
            external: 0,
          },
        },
        {
          subSections: null,
          leafLink: {
            url: '/content/',
            text: 'Contact Us',
            title: 'Contact Us',
            target: '',
            external: 0,
          },
        },
      ],
    },
    '728f4e9b-b1ee-4b83-addc-399caae1723945': {
      module: 'helpCenterBottomModule',
      composites: {
        'help-center-bottom': [
          {
            richText: {
              text: '<h4>MOCK BOTTOM</h4>',
              __typename: 'Text',
            },
          },
        ],
        __typename: 'Composite',
      },
    },
  },
};
