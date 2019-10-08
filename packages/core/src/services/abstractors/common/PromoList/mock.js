export default {
  promoList: {
    contentId: '<uuid>',
    name: 'promoList',
    type: 'module',
    composites: {
      promoListWrapper: [
        {
          class: {
            class: '<css_class>',
          },
          headLine: [
            {
              text: 'Headline',
              style: 'style1',
            },
          ],
          subHeadLine: [
            {
              text: 'Subheadline',
              style: 'style1',
            },
          ],
          buttonList: [
            {
              url: '/button/url',
              text: 'Button Texts',
              title: 'Button Title attributes',
              external: 0,
              target: '|_blank|_modals',
              action: '<action_values>',
            },
            {
              url: '/button/url1',
              text: 'Buttons Text',
              title: 'Button Titles attribute',
              external: 0,
              target: '|_blank|_modal_',
              action: '<actions_value>',
            },
          ],
        },
        {
          image: {
            url: 'http://image1.sm/url',
            alt: 'Image Alt text attribute value',
            title: 'Image Title attribute value',
            crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_963',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_964',
          },
          headLine: [
            {
              text: 'Headline',
              style: 'style1',
            },
          ],
          buttonList: [
            {
              url: '/button/url3',
              text: 'Button Text',
              title: 'Button Title attribute',
              external: 0,
              target: '|_blank|_modal',
              action: '<action_value>',
            },
            {
              url: '/button/url',
              text: 'Button Text',
              title: 'Button Title attribute',
              external: 0,
              target: '|_blank|_modal',
              action: '<action_value>',
            },
          ],
        },
      ],
    },
    submodules: {},
    set: [
      {
        key: 'bgClass',
        val: '<background_class>',
      },
      {
        key: 'ctaType',
        val: 0,
      },
    ],
  },
};
