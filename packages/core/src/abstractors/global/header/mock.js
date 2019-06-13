export default {
  header_top_nav: {
    brand_tabs: [
      {
        url: '/',
        alt: "The Children's Place",
        title: "The Children's Place",
        target: '',
        class: 'tcp-logo-medium',
      },
      {
        url: 'https://www.gymboree.com/',
        alt: 'Gymboree',
        title: 'Gymboree',
        target: '_blank',
        logo_class: 'gymboree-logo-medium',
      },
    ],
    promo_message_wrapper: [
      {
        url: '/static/promo',
        text: '<b>FREE SHIPPING EVERY DAY!</b> No minimum purchase required 1.',
        title: 'FREE SHIPPING EVERY DAY! No minimum purchase required 1.',
        target: '_blank',
        class: 'promo_message',
      },
      {
        url: '/static/promo2',
        text: '<b>FREE SHIPPING EVERY DAY!</b> No minimum purchase required 2.',
        title: 'FREE SHIPPING EVERY DAY! No minimum purchase required 2.',
        target: '_blank',
        class: 'promo_message',
      },
      {
        url: '/static/promo3',
        text: '<b>FREE SHIPPING EVERY DAY!</b> No minimum purchase required 3.',
        title: 'FREE SHIPPING EVERY DAY! No minimum purchase required 3.',
        target: '_blank',
        class: 'promo_message',
      },
    ],
  },
  header_promo_area: {
    promo_text_banners: [
      {
        url: '/banner/url1',
        promo_text: {
          primary: {
            text: '<b>NEED IT NOW?</b>',
            color: '#1a1a1a',
          },
          secondary: {
            text: 'Buy online, pickup in store.',
            color: '#1a1a1a',
          },
        },
        title: 'NEED IT NOW? Buy online, pickup in store.',
        target: '',
        class: 'promo_icon_clock',
      },
      {
        url: '/banner/url2',
        promo_text: {
          primary: {
            text: '<b>EARN PLACE CASH!</b>',
            color: '#7dc24c',
          },
          secondary: {
            text: 'Get 10$ for every 20$ spent today.',
            color: '#1a1a1a',
          },
        },
        title: 'EARN PLACE CASH! Get 10$ for every 20$ spent today.',
        target: '',
        class: 'promo_icon_dollar',
      },
      {
        url: '/node/modal/rr1',
        promo_text: {
          primary: {
            text: '<b>SIGN UP AND GET 10$ OFF!</b>',
            color: '#1a1a1a',
          },
          secondary: {
            text: '<u>ENTER YOUR EMAIL.</u>',
            color: '#1a1a1a',
          },
        },
        title: 'SIGN UP AND GET 10$ OFF! ENTER YOUR EMAIL.',
        target: '',
        class: 'promo_icon_at',
      },
    ],
    promo_loyalty_banners: [
      {
        url: '/banner/url',
        image_url: 'http://image1.sm/url',
        image_alt: 'Banner Image 1 Alt text attribute val',
        title: 'Banner Image 1 Title attribute val',
        text: '<b>Banner 1 Text val</b>',
        target: '',
        class: 'promo_loyalty_bonus',
      },
      {
        url: '/banner/url',
        image_url: 'http://image2.sm/url',
        image_alt: 'Banner Image 2 Alt text attribute val',
        title: 'Banner Image 2 Title attribute val',
        text: '<b>Banner 2 Text val</b>',
        target: '',
        class: 'promo_loyalty_reward',
      },
    ],
  },
};
