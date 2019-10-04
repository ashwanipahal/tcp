const dummyUrl = 'http://www.childrensplace.com';

export default {
  moduleG: {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    name: 'moduleG',
    type: 'module',
    composites: {
      bgColor: '#d8d8d8',
      layout: 'alt',
      headerText: [
        {
          textItems: [
            {
              text: 'ALL MATCHABLES',
              style: 'small_text_normal',
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
              text: '60% OFF',
              style: 'style1',
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
            cat_id: '47526',
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
            cat_id: '47502>47535>54071',
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
            cat_id: '47503>47544',
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
            cat_id: '47501>47526',
          },
          singleCTAButton: null,
        },
      ],

      mediaLinkedList: [
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/c_fill,g_face:center,h_189,w_177/v1562731929/Image_14_bp7ih0.jpg',
            alt: 'Boys',
            title: 'Boys',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          url: '/node/product/e499bac3-6770-4757-b924-55c837712dfc',
          link: {
            text: 'Boys',
            title: 'Boys',
            target: '',
            external: 0,
            action: '',
          },
        },
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/c_fill,g_face:center,h_189,w_177/v1565145744/mod-h-kids_b9ivyr.png',
            alt: 'Girls',
            title: 'Girls',
            crop_d: 'h_189,w_177',
            crop_t: 'h_189,w_177',
            crop_m: 'h_310,w_375',
          },
          link: {
            url: '/node/product/e499bac3-6770-4757-b924-55c837712dfc',
            text: 'Girls',
            title: 'Girls',
            target: '',
            external: 0,
            action: '',
          },
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
