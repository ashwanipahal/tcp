const dummyUrl = 'http://www.childrensplace.com';

export default {
  moduleQ: {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    name: 'moduleQ',
    type: 'module',
    composites: {
      bgColor: '#d8d8d8',
      headerText: [
        {
          textItems: [
            {
              text: 'THE SHORT SHOP',
              style: 'medium_text_black',
            },
          ],
          link: {
            url: '/p/',
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
            url: '/c/',
            text: '',
            title: '',
            target: '',
            external: 0,
            class: '',
          },
          textItems: [
            {
              text2: 'ALL SHORTS',
              text: 'ALL UNIFORMS',
              style: 'medium_text_semibold',
              style2: 'extra_large_text_regular',
            },
            {
              text: '60% OFF',
              style: 'fixed_medium_text_black',
              style2: 'extra_large_text_black',
            },
          ],
        },
      ],

      divTabs: [
        {
          text: {
            text: 'GIRL',
          },
          category: {
            cat_id: '2044392_10',
          },
          singleCTAButton: {
            url: dummyUrl,
            text: 'SHOP ALL 1',
            title: 'SHOP ALL',
            target: '',
            external: 0,
            action: '',
          },
        },
        {
          text: {
            text: 'TODDLER GIRL',
          },
          category: {
            cat_id: '2044391_10',
          },
          singleCTAButton: {
            url: dummyUrl,
            text: 'SHOP ALL 2',
            title: 'SHOP ALL',
            target: '',
            external: 0,
            action: '',
          },
        },
        {
          text: {
            text: 'BOY',
          },
          category: {
            cat_id: '2044393_10',
          },
          singleCTAButton: {
            url: dummyUrl,
            text: 'SHOP ALL 3',
            title: 'SHOP ALL',
            target: '',
            external: 0,
            action: '',
          },
        },
        {
          text: {
            text: 'TODDLER BOY',
          },
          category: {
            cat_id: '2044394_10',
          },
          singleCTAButton: null,
        },
      ],
    },
    submodules: {},
    set: [
      {
        key: 'ctaType',
      },
    ],
  },
};
