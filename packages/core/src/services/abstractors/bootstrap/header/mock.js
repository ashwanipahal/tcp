export default {
  header_top_nav: {
    brand_tabs: [
      {
        id: '1',
        url: '#',
        alt: "The Children's Place",
        title: "The Children's Place",
        target: '',
        logoClass: 'tcp_logo_medium',
        active: true,
      },
      {
        id: '2',
        url: 'https://www.gymboree.com/',
        alt: 'Gymboree',
        title: 'Gymboree',
        target: '_blank',
        logoClass: 'gymboree_logo_medium',
        active: false,
      },
    ],
    promo_message_wrapper: [
      {
        id: '1',
        url: '/static/promo',
        text:
          '<a href="https://www.childrensplace.com/us/home"><b>1 FREE SHIPPING EVERY DAY!</b> No minimum purchase required.</a>',
        title: 'FREE SHIPPING EVERY DAY! No minimum purchase required 1.',
        target: '',
        class: 'promo_message',
      },
      {
        id: '2',
        url: '/static/promo2',
        text:
          '<a href="https://www.childrensplace.com/us/home"><b>2 FREE SHIPPING EVERY DAY!</b> No minimum purchase required.</a>',
        title: 'FREE SHIPPING EVERY DAY! No minimum purchase required 2.',
        target: '',
        class: 'promo_message',
      },
      {
        id: '3',
        url: '/static/promo3',
        text:
          '<a href="https://www.childrensplace.com/us/home"><b>3 FREE SHIPPING EVERY DAY!</b> No minimum purchase required.</a>',
        title: 'FREE SHIPPING EVERY DAY! No minimum purchase required 3.',
        target: '',
        class: 'promo_message',
      },
    ],
  },
  header_promo_area: {
    promoTextBannerCarousel: {
      composites: {
        promoTextBanner: [
          {
            linkClass: {
              url: '/banner/url1',
              title: '',
              target: '',
              external: 0,
              class: 'orange-schedule',
              __typename: 'LinkClass',
            },
            textLines: [
              {
                text: 'NEED IT NOW?',
                style: 'black-bold',
                color: 'color1',
                __typename: 'StyledText',
              },
              {
                text: 'Buy online, pickup in store.',
                style: 'style2',
                color: 'color2',
                __typename: 'StyledText',
              },
            ],
            __typename: 'PromoTextBanner',
          },
          {
            linkClass: {
              url: '/banner/url2',
              title: '',
              target: '',
              external: 0,
              class: 'green-dollar',
              __typename: 'LinkClass',
            },
            textLines: [
              {
                text: 'EARN PLACE CASH!',
                style: 'green-bold',
                __typename: 'StyledText',
              },
              {
                text: 'Get 10$ for every 20$ spent today.',
                style: 'style2',
                __typename: 'StyledText',
              },
            ],
            __typename: 'PromoTextBanner',
          },
          {
            linkClass: {
              url: '/node/modal/rr1',
              title: '',
              target: '',
              external: 0,
              class: 'blue-email',
              __typename: 'LinkClass',
            },
            textLines: [
              {
                text: 'SIGN UP AND GET 10$ OFF!',
                style: 'black-bold',
                __typename: 'StyledText',
              },
              {
                text: '<u>ENTER YOUR EMAIL</u>.',
                style: 'style2',
                color: 'color2',
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
    promo_loyalty_banners: [
      {
        id: '1',
        url: '/banner/url',
        imageUrl: 'http://image1.sm/url',
        imageAlt: 'Banner Image 1 Alt text attribute val',
        title: 'Banner Image 1 Title attribute val',
        text: '<b>Banner 1 Text val</b>',
        target: '',
        class: 'promo_loyalty_bonus',
      },
      {
        id: '2',
        url: '/banner/url',
        imageUrl: 'http://image2.sm/url',
        imageAlt: 'Banner Image 2 Alt text attribute val',
        title: 'Banner Image 2 Title attribute val',
        text: '<b>Banner 2 Text val</b>',
        target: '',
        class: 'promo_loyalty_reward',
      },
    ],
  },
};
