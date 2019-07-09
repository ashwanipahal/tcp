export default {
  dataTopNav: {
    composites: {
      brand_tabs: [
        {
          url: '/',
          title: 'TCP Link',
          target: '',
          external: 0,
          class: 'header__brand-tab--tcp',
          __typename: 'LinkClass',
        },
        {
          url: 'https://www.gymboree.com/',
          title: 'Gymboree Link',
          target: '_blank',
          external: 0,
          class: 'header__brand-tab-gymboree',
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
  },
};
