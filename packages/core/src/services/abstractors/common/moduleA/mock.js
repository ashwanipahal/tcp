const totalImageSlides = 4;
const imageSlides = [];
const ctaTypes = ['stackedCTAList', 'linkCTAList', 'scrollCTAList', 'imageCTAList'];
// eslint-disable-next-line no-plusplus
for (let i = 1; i <= totalImageSlides; i++) {
  imageSlides.push({
    headerText: [
      {
        textItems: [{ text: `ENTER SITE ${i}`, style: 'style1' }],
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
        textItems: [
          { text: '60 % OFF', style: 'style7' },
          { text: '50% Off', style: 'style8' },
          { text: 'All Shoes & Select Accessories', style: 'style9' },
        ],
      },
    ],
    linkedImage: [
      {
        image: {
          url:
            'https://tcp-dam-test-ressh.cloudinary.com/image/upload/v1565258432/module-a-banner-image-4_utecpx.jpg',
          alt: `Family Tees Image ${i}`,
          title: 'Family Tees title',
          crop_d: 'c_crop,g_face:center,q_auto:best,w_1410',
          crop_t: 'c_crop,g_face:center,q_auto:best,w_768',
          crop_m: 'c_crop,g_face:center,q_auto:best,w_375,h_311',
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
        position: 'right',
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
        val: ctaTypes[1],
      },
    ],
  },
};
