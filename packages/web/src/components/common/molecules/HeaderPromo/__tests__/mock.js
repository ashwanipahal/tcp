export default {
  dataPromo: {
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
        textItems: [
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
        textItems: [
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
        textItems: [
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
  },
};
