const cat1 = '47526';
const cat2 = '47503>47544';
const cat3 = '47501>47526';
const footerlink = 'Shop All Matchables';
const adTobag = 'add to bag';

export default {
  moduleG: {
    contentId: 'cb2d22f1-310f-4f9b-908c-ad625b1b6af2',
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
              style: 'medium_text_regular',
            },
          ],
          icon: {
            placement: '',
            icon: '',
          },
          link: {
            url: '/c/ab',
            text: '',
            title: '',
            target: '',
          },
        },
      ],
      promoBanner: [
        {
          link: {
            url: '/c',
            title: '',
          },
          textItems: [
            {
              text: '60% OFF',
              style: 'large_text_black',
            },
          ],
        },
      ],
      linkedImage: null,

      divTabs: [
        {
          text: {
            text: 'GIRL',
          },
          category: [
            {
              key: 'cat_id',
              val: '47503',
            },
            {
              key: 'cat_id',
              val: '47501',
            },
          ],
          singleCTAButton: {
            url: '/c/us',
            text: footerlink,
            target: '',
            title: adTobag,
          },
          singleCTAButtonCart: {
            url: '/c/us',
            text: footerlink,
            target: '',
            title: adTobag,
          },
        },
        {
          text: {
            text: 'TODDLER GIRL',
          },
          category: [
            {
              key: 'cat_id',
              val: '47501',
            },
            {
              key: 'cat_id',
              val: cat2,
            },
          ],
          singleCTAButton: {
            url: '/c/us',
            text: footerlink,
            target: '',
            title: adTobag,
          },
          singleCTAButtonCart: {
            url: '/c/us',
            text: footerlink,
            target: '',
            title: adTobag,
          },
        },
        {
          text: {
            text: 'BOY',
          },
          category: [
            {
              key: 'cat_id',
              val: '47503',
            },
            {
              key: 'cat_id',
              val: cat3,
            },
          ],
          singleCTAButton: {
            url: '/c/us',
            text: footerlink,
            target: '',
            title: adTobag,
          },
          singleCTAButtonCart: {
            url: '/c/us',
            text: footerlink,
            target: '',
            title: adTobag,
          },
        },
        {
          text: {
            text: 'TODDLER BOY',
          },
          category: [
            {
              key: 'cat_id',
              val: cat1,
            },
            {
              key: 'cat_id',
              val: '47511|516020',
            },
          ],
          singleCTAButton: {
            url: '/c/us',
            text: footerlink,
            target: '',
            title: adTobag,
          },
          singleCTAButtonCart: {
            url: '/c/us',
            text: footerlink,
            target: '',
            title: adTobag,
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
