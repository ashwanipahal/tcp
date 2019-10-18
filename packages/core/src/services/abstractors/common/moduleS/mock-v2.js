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
              text: 'A Very Cherry Valentines',
              style: 'medium_text_black',
            },
          ],
          link: {
            // eslint-disable-next-line sonarjs/no-duplicate-string
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
            url:
              'https://dam-qa-ressh.cloudinary.com/image/upload/v1570707425/Module-H_TCP_ybjasx_ahura1.jpg',
            alt: 'Pool',
            title: 'Pool',
            crop_d: 'c_crop,g_face:center,q_auto:best,w_450',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_500',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_347',
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
        text: 'SHOP OPENING DAY',
        title: 'SHOP OPENING DAY',
        target: '',
      },
      ribbonBanner: [
        {
          textItems: [
            {
              text: '20% OFF',
              style: 'style1',
            },
          ],
          link: {
            url: '/c/girls-clothes',
            text: 'Girls',
            title: 'Girls',
            target: '',
          },
          ribbonPlacement: 'left',
          ribbonClass: 'ribbon-color-cherry',
        },
      ],
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
