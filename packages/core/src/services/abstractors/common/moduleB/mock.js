const totalImageSlides = 4;
const imageSlides = [];
const images = [
  'https://test5.childrensplace.com/image/upload/v1565680164/sarah-doody-x_XipCfA3Qc-unsplash_e38rjo.jpg',
  'https://test5.childrensplace.com/image/upload/v1565680148/the-honest-company-fgn7ZRTmaWQ-unsplash_awrysz.jpg',
  'https://test5.childrensplace.com/image/upload/v1565680148/vishnu-r-nair-Wd-dXc2X37o-unsplash_lljie8.jpg',
  'https://test5.childrensplace.com/image/upload/v1565680141/alexander-dummer-x4jRmkuDImo-unsplash_ptu9ul.jpg',
  'https://test5.childrensplace.com/image/upload/v1565680140/christian-fickinger-MDIGo4Ez-0g-unsplash_jkpwgf.jpg',
];
const ctaTypes = [
  'stackedCTAButtons',
  'stackedCTAButtonsExpandable',
  'CTAButtonCarousel',
  'CTAButtonCarouselExpandable',
  'divImageCTACarousel',
];
// eslint-disable-next-line no-plusplus
for (let i = 1; i <= totalImageSlides; i++) {
  /*   const gymboreeHeaderTextItems = [
    {
      text: 'Spring is Every Wear',
      style: 'style1',
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const gymboreePromoTextItems = [
    {
      text: 'The whole bunch is blooming in purple and pastel pops - just in time for Easter fun!',
      style: 'gymboree_description',
    },
  ]; */

  // eslint-disable-next-line no-unused-vars
  const tcpHeaderTextItems = [
    {
      text: 'NEW WASHES',
      style: 'style1',
    },
    {
      text: 'MORE FITS',
      style: 'style1',
    },
    {
      text: 'SLIM, PLUS & HUSKY',
      style: 'style2',
    },
    {
      text: 'SIZES UPTO 18!',
      style: 'style1',
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const tcpPromoTextItems = [
    {
      text: 'ALL BASIC DENIM',
      style: 'overlay_banner_header',
    },
    {
      text: '$ 7 80 &UP',
      style: 'overlay_promo_banner_style',
    },
  ];

  imageSlides.push({
    headerText: [
      {
        textItems: tcpHeaderTextItems,
        link: {
          url: '/c/',
          text: '',
          title: '',
          target: '',
          external: 0,
        },
        icon: { icon: '', placement: '' },
      },
    ],
    promoBanner: [
      {
        link: {
          url: '/c/',
          text: '',
          title: '',
          target: '',
          external: 0,
        },
        textItems: tcpPromoTextItems,
      },
    ],
    linkedImage: [
      {
        image: {
          url: images[i],
          alt: `Family Tees Image ${i}`,
          title: 'Family Tees title',
          crop_d: '',
          crop_t: '',
          crop_m: '',
        },
        link: {
          url: '/c/image/url',
          text: 'Family Tees',
          title: 'Family Tees',
          target: '',
          external: 0,
        },
      },
    ],
  });
}

export default {
  moduleB: {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    name: 'moduleB',
    type: 'moduleB',
    composites: {
      largeCompImage: imageSlides,
      ctaItems: [
        {
          image: {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/c/',
            text: 'Girl',
            title: 'Girl',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
            alt: 'Toddler Girl alt',
            title: 'Toddler Girl title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/c/',
            text: 'Toddler Girl',
            title: 'Toddler Girl',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1565680164/sarah-doody-x_XipCfA3Qc-unsplash_e38rjo.jpg',
            alt: 'Boy',
            title: 'Boy',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/c/',
            text: 'Boy',
            title: 'Boy',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1565680141/alexander-dummer-x4jRmkuDImo-unsplash_ptu9ul.jpg',
            alt: 'Toddler Boy alt',
            title: 'Toddler Boy title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/c/',
            text: 'Toddler Boy',
            title: 'Toddler Boy',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1565680140/christian-fickinger-MDIGo4Ez-0g-unsplash_jkpwgf.jpg',
            alt: 'Baby',
            title: 'Baby',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/c/',
            text: 'Baby',
            title: 'Baby',
            target: '',
            external: 0,
          },
        },
      ],
    },
    submodules: {},
    set: [
      {
        key: 'ctaType',
        val: ctaTypes[0],
      },
      {
        key: 'bannerPostition',
        val: 'bottom',
      },
    ],
  },
};
