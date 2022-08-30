/* eslint-disable sonarjs/no-duplicate-string */
const ctaTypes = [
  'divImageCTACarousel',
  'stackedCTAButtonsExpandable',
  'CTAButtonCarouselExpandable',
  'stackedCTAButtons',
  'CTAButtonCarousel',
];

const bannerPosition = ['top', 'topAlt', 'bottom', 'overlay'];

const allBasicDenim = ['small_text_semibold', 'small_text_black'];

export default {
  contentId: '<uuid>',
  name: 'moduleB',
  type: 'module',
  composites: {
    largeCompImage: [
      {
        headerText: [
          {
            textItems: [
              {
                text: 'NEW WASHES.',
                style: 'style1',
              },
              {
                text: 'MORE FITS.',
                style: 'style1',
              },
            ],
            link: {
              url: '/c/girls-denim-bottoms',
              text: '',
              title: '',
              target: '',
              external: 0,
              action: '',
            },
            icon: {
              icon: '',
              placement: '',
            },
          },
          {
            textItems: [
              {
                text: 'SLIM, PLUS & HUSKY',
                style: 'style2',
              },
              {
                text: 'SIZES UP TO 18!',
                style: 'style1',
              },
            ],
            link: {
              url: '/c/girls-denim-bottoms',
              text: '',
              title: '',
              target: '',
              external: 0,
              action: '',
            },
            icon: {
              icon: '',
              placement: '',
            },
          },
        ],
        promoBanner: [
          {
            link: {
              url: '/c/girls-denim-bottoms',
              text: '',
              title: '',
              target: '',
              external: 0,
              action: '',
            },
            textItems: [
              {
                text: 'ALL BASIC DENIM',
                style: allBasicDenim[1],
              },
              {
                text: '$ 7 80 & UP',
                style: 'currency_up_style',
              },
            ],
          },
        ],
        linkedImage: [
          {
            image: {
              url:
                'https://test5.childrensplace.com/image/upload/c_fill,g_face:center,q_auto:best,w_1410/ecom/assets/content/gym/us/home/modA/gym_hp_090519_us_hwlhjb.png',
              alt: 'Graphic Tees',
              title: 'Graphic Tees',
              crop_d: 'c_crop,g_face:center,q_auto:best,w_690,h_577',
              crop_t: 'c_crop,g_face:center,q_auto:best,w_354,h_295',
              crop_m: 'c_crop,g_face:center,q_auto:best,w_347,h_295',
            },
            link: {
              url: '/c/girl-t-shirts',
              text: 'Graphic Tees',
              title: 'Graphic Tees',
              target: '',
              external: 0,
              action: '',
            },
          },
        ],
      },
    ],
    ctaItems: [
      {
        button: {
          url: '/c/girls-clothing',
          text: 'Girl',
          title: 'Girl',
          target: '',
          external: 0,
          action: '',
        },
        image: {
          url:
            'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
          alt: 'Girl',
          title: 'Girl',
          crop_d: '',
          crop_t: '',
          crop_m: '',
        },
      },

      {
        button: {
          url: '/c/girls-clothing',
          text: 'Girl',
          title: 'Girl',
          target: '',
          external: 0,
          action: '',
        },
        image: {
          url:
            'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
          alt: 'Girl',
          title: 'Girl',
          crop_d: '',
          crop_t: '',
          crop_m: '',
        },
      },
      {
        button: {
          url: '/c/toddler-girl-clothes',
          text: 'Toddler Girl',
          title: 'Toddler Girl',
          target: '',
          external: 0,
          action: '',
        },
        image: {
          url:
            'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
          alt: 'Girl',
          title: 'Girl',
          crop_d: '',
          crop_t: '',
          crop_m: '',
        },
      },
      {
        button: {
          url: '/c/boys-clothing',
          text: 'Boy',
          title: 'Boy',
          target: '',
          external: 0,
          action: '',
        },
        image: {
          url:
            'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
          alt: 'Girl',
          title: 'Girl',
          crop_d: '',
          crop_t: '',
          crop_m: '',
        },
      },
      {
        button: {
          url: '/c/toddler-boy-clothes',
          text: 'Toddler Boy',
          title: 'Toddler Boy',
          target: '',
          external: 0,
          action: '',
        },
        image: {
          url:
            'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
          alt: 'Girl',
          title: 'Girl',
          crop_d: '',
          crop_t: '',
          crop_m: '',
        },
      },
      {
        button: {
          url: '/c/baby-clothes',
          text: 'Baby',
          title: 'Baby',
          target: '',
          external: 0,
          action: '',
        },
        image: {
          url:
            'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
          alt: 'Girl',
          title: 'Girl',
          crop_d: '',
          crop_t: '',
          crop_m: '',
        },
      },
    ],
  },
  submodules: {},
  set: [
    {
      key: 'moduleWidth',
      val: 'half',
    },
    {
      key: 'ctaType',
      val: ctaTypes[1],
    },
    {
      key: 'bannerPosition',
      val: bannerPosition[2],
    },
    {
      key: 'expandableTitle',
      val: 'Shop Now',
    },
  ],
  moduleWidth: 'half',
  ctaType: ctaTypes[1],
  bannerPosition: bannerPosition[3],
  expandableTitle: 'Shop Now',
};
