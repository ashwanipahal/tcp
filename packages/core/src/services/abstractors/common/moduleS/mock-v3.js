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
              text: 'SHOP ALL SUMMERR',
              style: 'medium_text_black',
            },
            {
              text: 'SURFS UPP',
              style: 'small_text_normal',
            },
            {
              text: 'POOL SIDEE',
              style: 'small_text_normal',
            },
          ],
          link: {
            url: '/c/girls-clothes',
            text: 'GirlsS',
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
            crop_d: 'c_crop,g_face:center,q_auto:best,w_120',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_768',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_375,h_356',
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
