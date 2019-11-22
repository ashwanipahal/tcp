export default {
  contentId: '<uuid>',
  name: 'imageText',
  type: 'module',
  composites: {
    headLine: [
      {
        text: 'Module Headline',
        style: 'style1',
      },
    ],
    subHeadLine: [
      {
        text: 'Module Subheadline',
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
        url: 'https://test5.childrensplace.com/image/upload/v1573239143/module-E-test-large-2.jpg',
        alt: 'Buy 1 get one free',
        title: 'Buy 1 get one free',
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
      val: 'left',
    },
    {
      key: 'expandableTitle',
      val: '<title>',
    },
  ],
};
