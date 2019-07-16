export default {
  submodules: {
    topNavWrapper: {
      composites: {
        brand_tabs: [
          {
            url: '/',
            title: 'TCP Link',
            target: '',
            external: 0,
            class: 'header__brand-tab-gymboree',
            __typename: 'LinkClass',
          },
          {
            url: 'https://www.gymboree.com/',
            title: 'Gymboree Link',
            target: '_blank',
            external: 0,
            class: 'header__brand-tab--tcp',
            __typename: 'LinkClass',
          },
        ],
        promo_message_wrapper: [
          {
            richText: {
              text: '<b>FREE SHIPPING EVERY TEST DAY!</b> No minimum purchase required.',
              __typename: 'Text',
            },
            link: {
              url: '/static/promo1',
              title: '',
              target: '',
              external: 0,
              __typename: 'Link',
            },
            __typename: 'PromoMessage',
          },
          {
            richText: {
              text: '<b>FREE SHIPPING EVERY DAY!</b> This is banner2',
              __typename: 'Text',
            },
            link: {
              url: '/static/promo2',
              title: '',
              target: '',
              external: 0,
              __typename: 'Link',
            },
            __typename: 'PromoMessage',
          },
          {
            richText: {
              text: '<b>FREE SHIPPING EVERY DAY!</b> Banner 3 comes now',
              __typename: 'Text',
            },
            link: {
              url: '/static/promo3',
              title: '',
              target: '',
              external: 0,
              __typename: 'Link',
            },
            __typename: 'PromoMessage',
          },
        ],
        __typename: 'Composite',
      },
      __typename: 'SubmoduleComposite',
    },
    promoTextBannerCarousel: {
      composites: {
        promoTextBanner: [
          {
            linkClass: {
              url:
                'https://www.childrensplace.com/us/content/buy-online?icid=hp_na_na_image_062411_boss',
              title: '',
              target: '',
              external: 0,
              class: 'header__promo-text-banner1',
              __typename: 'LinkClass',
            },
            textLines: [
              {
                text: 'NEED IT NOW?',
                style: 'style2',
                color: 'color1',
                __typename: 'StyledText',
              },
              {
                text: 'Buy online, pickup in store.',
                style: null,
                color: 'color1',
                __typename: 'StyledText',
              },
            ],
            __typename: 'PromoTextBanner',
          },
          {
            linkClass: {
              url:
                'https://www.childrensplace.com/us/content/buy-online?icid=hp_na_na_image_062419_boss',
              title: '',
              target: '',
              external: 0,
              class: 'header__promo-text-banner',
              __typename: 'LinkClass',
            },
            textLines: [
              {
                text: 'EARN PLACE CASH!',
                style: 'style2',
                color: 'color2',
                __typename: 'StyledText',
              },
              {
                text: 'Get 10$ for every 20$ spent today.',
                style: null,
                color: 'color2',
                __typename: 'StyledText',
              },
            ],
            __typename: 'PromoTextBanner',
          },
          {
            linkClass: {
              url:
                'https://www.childrensplace.com/us/content/buy-online?icid=hp_na_na_image_062419_boss',
              title: '',
              target: '',
              external: 0,
              class: 'header__promo-text-banner',
              __typename: 'LinkClass',
            },
            textLines: [
              {
                text: 'NEED IT NOW?',
                style: 'style3',
                color: 'color3',
                __typename: 'StyledText',
              },
              {
                text: 'Buy online, pickup in store.',
                style: null,
                color: 'color1',
                __typename: 'StyledText',
              },
            ],
            __typename: 'PromoTextBanner',
          },
        ],
        __typename: 'Composite',
      },
      __typename: 'SubmoduleComposite',
    },
    loyaltyPromoBannerWrapper: {
      composites: {
        loyaltyPromoBanner: [
          {
            image: {
              url: 'http://image1.sm/url',
              title: 'Banner Image Title attribute val',
              alt: 'Banner Image Alt text attribute val',
              __typename: 'Image',
            },
            link: {
              url: '/banner/url',
              title: '',
              target: '',
              external: 0,
              __typename: 'Link',
            },
            styled: {
              text: 'Banner Text val',
              style: 'style1',
              color: 'color1',
              __typename: 'StyledText',
            },
            __typename: 'StyledLinkedImage',
          },
          {
            image: {
              url: 'http://image2.sm/url',
              title: 'Banner Image 2 Title attribute val',
              alt: 'Banner Image 2 Alt text attribute val',
              __typename: 'Image',
            },
            link: {
              url: '/banner/url',
              title: '',
              target: '',
              external: 0,
              __typename: 'Link',
            },
            styled: {
              text: 'Banner 2 Text val',
              style: null,
              color: 'color2',
              __typename: 'StyledText',
            },
            __typename: 'StyledLinkedImage',
          },
          {
            image: {
              url: 'http://image2.sm/url',
              title: 'Banner Image 2 Title attribute val',
              alt: 'Banner Image 2 Alt text attribute val',
              __typename: 'Image',
            },
            link: {
              url: '/Banner/url',
              title: '',
              target: '',
              external: 0,
              __typename: 'Link',
            },
            styled: {
              text: 'Banner 2 Text val',
              style: 'style3',
              color: 'color2',
              __typename: 'StyledText',
            },
            __typename: 'StyledLinkedImage',
          },
        ],
        __typename: 'Composite',
      },
      __typename: 'SubmoduleComposite',
    },
    __typename: 'Submodule',
  },
  __typename: 'ModuleContent',
};
