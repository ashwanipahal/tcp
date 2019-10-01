export default {
  moduleS: {
    contentId: 'e499bac3-6770-4757-b924-55c837712dfc',
    name: 'moduleS',
    type: 'module',
    composites: {
      headerText: [
        {
          textItems: [
            {
              text: 'Shop All Summer',
              style: 'style1',
            },
            {
              text: 'Surfs Up Pool Side',
              style: 'style2',
            },
          ],
          link: {
            url: '/c/girls-clothes',
            text: 'Girls',
            title: 'Girls',
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
      linkedImage: [
        {
          image: {
            url: '',
            alt: 'Pool',
            title: 'Pool',
            crop_d: 'c_crop,g_face:center,q_auto:best,w_690',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_768',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_375',
            url_m: '',
            url_t: '',
          },
          link: {
            url: '/c/boys-clothes',
            text: 'Pool',
            title: 'Pool',
            target: '',
          },
        },
      ],
      singleCTAButton: {
        url: '/c/girls-clothes',
        text: 'BUTTON TEXT',
        title: 'BUTTON TEXT',
        target: '',
      },
      moduleWidth: 'half',
    },
    set: [
      {
        key: 'moduleWidth',
        val: 'half',
      },
    ],
  },
};
