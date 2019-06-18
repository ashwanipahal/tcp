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
          '<a href="https://www.childrensplace.com/us/home" target="_blank" style="text-decoration: none; color: #000;"><b>1 FREE SHIPPING EVERY DAY!</b> No minimum purchase required.</a>',
        title: 'FREE SHIPPING EVERY DAY! No minimum purchase required 1.',
        target: '_blank',
        class: 'promo_message',
      },
      {
        id: '2',
        url: '/static/promo2',
        text:
          '<a href="https://www.childrensplace.com/us/home" target="_blank" style="text-decoration: none; color: #000;"><b>2 FREE SHIPPING EVERY DAY!</b> No minimum purchase required.</a>',
        title: 'FREE SHIPPING EVERY DAY! No minimum purchase required 2.',
        target: '_blank',
        class: 'promo_message',
      },
      {
        id: '3',
        url: '/static/promo3',
        text:
          '<a href="https://www.childrensplace.com/us/home" target="_blank" style="text-decoration: none; color: #000;"><b>3 FREE SHIPPING EVERY DAY!</b> No minimum purchase required.</a>',
        title: 'FREE SHIPPING EVERY DAY! No minimum purchase required 3.',
        target: '_blank',
        class: 'promo_message',
      },
    ],
  },
  header_promo_area: {
    promoTextBanners: [
      {
        id: '1',
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
        id: '2',
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
        id: '3',
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
