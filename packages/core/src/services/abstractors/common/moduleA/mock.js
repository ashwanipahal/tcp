const totalImageSlides = 4;
const imageSlides = [];
const images = [
  'https://test5.childrensplace.com/image/upload/v1565680164/sarah-doody-x_XipCfA3Qc-unsplash_e38rjo.jpg',
  'https://test5.childrensplace.com/image/upload/v1565680148/the-honest-company-fgn7ZRTmaWQ-unsplash_awrysz.jpg',
  'https://test5.childrensplace.com/image/upload/v1565680148/vishnu-r-nair-Wd-dXc2X37o-unsplash_lljie8.jpg',
  'https://test5.childrensplace.com/image/upload/v1565680141/alexander-dummer-x4jRmkuDImo-unsplash_ptu9ul.jpg',
  'https://test5.childrensplace.com/image/upload/v1565680140/christian-fickinger-MDIGo4Ez-0g-unsplash_jkpwgf.jpg',
];
const ctaTypes = ['stackedCTAButtons', 'linkList', 'CTAButtonCarousel', 'divImageCTACarousel'];
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
      style: 'style12',
    },
  ]; */

  // eslint-disable-next-line no-unused-vars
  const tcpHeaderTextItems = [{ text: `ENTER SITE ${i}`, style: 'style1' }];
  // eslint-disable-next-line no-unused-vars
  const tcpPromoTextItems = [
    { text: '60 % OFF', style: 'style7' },
    { text: '50% Off', style: 'style8' },
    { text: 'All Shoes & Select Accessories', style: 'style9' },
  ];

  imageSlides.push({
    headerText: [
      {
        textItems: tcpHeaderTextItems,
        link: {
          url: '/trending',
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
          url: '/banner/url',
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
          url: '/image/url',
          text: 'Family Tees',
          title: 'Family Tees',
          target: '',
          external: 0,
        },
      },
    ],
    ribbonBanner: [
      {
        ribbonPlacement: 'right',
        textItems: [
          { text: 'Order By XX/XX', style: 'style10' },
          { text: 'For Easter Delivery!', style: 'style10' },
        ],
      },
    ],
  });
}

export default {
  moduleA: {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    name: 'moduleA',
    type: 'module',
    composites: {
      largeCompImageCarousel: imageSlides,
      ctaItems: [
        {
          image: {
            url: 'http://image.com/girl',
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/girl',
            text: 'Girl',
            title: 'Girl',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url: 'http://image.com/toddler-girl',
            alt: 'Toddler Girl alt',
            title: 'Toddler Girl title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/toddler-girl',
            text: 'Toddler Girl',
            title: 'Toddler Girl',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url: 'http://image.com/boy',
            alt: 'Boy',
            title: 'Boy',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/boy',
            text: 'Boy',
            title: 'Boy',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url: 'http://image.com/toddler-boy',
            alt: 'Toddler Boy alt',
            title: 'Toddler Boy title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/toddler-boy',
            text: 'Toddler Boy',
            title: 'Toddler Boy',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url: 'http://image.com/baby',
            alt: 'Baby',
            title: 'Baby',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/baby',
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
    ],
  },
};
