export default {
  contentId: '<uuid>',
  name: 'imageText',
  type: 'module',
  composites: {
    headLine: [
      {
        text: 'SHORTS FOR',
        style: 'style1',
      },
      {
        text: ' EVERY-YEAR',
        style: 'style1',
      },
    ],
    subHeadLine: [
      {
        text: 'So many prints ',
        style: 'style1',
      },
      {
        text: ', length and details',
        style: 'style1',
      },
      {
        text: 'to climp and play in..',
        style: 'style1',
      },
    ],
    ctaItems: [
      {
        button: {
          url: '/girl',
          text: 'Girl',
          title: 'Girl',
          target: '',
          external: 0,
          action: '',
        },
      },
      {
        button: {
          url: '/toddler-girl',
          text: 'Toddler Girl',
          title: 'Toddler Girl',
          target: '',
          external: 0,
          action: '',
        },
      },
      {
        button: {
          url: '/boy',
          text: 'Boy',
          title: 'Boy',
          target: '',
          external: 0,
          action: '',
        },
      },
      {
        button: {
          url: '/toddler-boy',
          text: 'Toddler Boy',
          title: 'Toddler Boy',
          target: '',
          external: 0,
          action: '',
        },
      },
      {
        button: {
          url: '/baby',
          text: 'Baby',
          title: 'Baby',
          target: '',
          external: 0,
          action: '',
        },
      },
    ],
    mediaWrapper: [
      {
        url: 'http://image1.sm/url',
        alt: 'Buy 1 get one free',
        title: 'Buy 1 get one free',
        crop_d: 'c_crop...',
        crop_t: 'c_crop...',
        crop_m: 'c_crop...',
        url_m: '',
        url_t: '',
      },
    ],
  },
  submodules: {},
  set: [
    {
      key: 'bgType',
      val: 'image',
    },
    {
      key: 'ctaType',
      val: 'stackedCTAButtonsExpandable',
    },
    {
      key: 'headerPosition',
      val: 'left|right',
    },
    {
      key: 'expandableTitle',
      val: 'Shop Cat',
    },
  ],
};
