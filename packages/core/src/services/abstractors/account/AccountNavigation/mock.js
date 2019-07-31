export default {
  accountNavigation: [
    {
      subSections: null,
      leafLink: {
        url: '/account',
        text: 'Account overview',
        title: 'account-overview',
        target: '',
        external: 0,
      },
    },
    {
      subSections: null,
      leafLink: {
        url: '/account/address-book',
        text: 'Address Book',
        title: 'address-book',
        target: '',
        external: 0,
      },
    },
    {
      subSections: [
        {
          leafLink: {
            url: '/account/payment',
            text: 'Payment & Gift Cards',
            title: 'payment',
            target: '',
            external: 0,
          },
        },
      ],
      leafLink: {
        url: '/account/wallet',
        text: 'My Wallet',
        title: 'My Wallet',
        target: '',
        external: 0,
      },
    },
    {
      subSections: null,
      leafLink: {
        url: '/account/orders',
        text: 'Orders',
        title: 'Orders',
        target: '',
        external: 0,
      },
    },
  ],
};
