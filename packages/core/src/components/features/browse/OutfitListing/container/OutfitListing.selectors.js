/* eslint-disable */
export const getLabels = state => {
  return state.Labels.Browse && state.Labels.Browse.Outfit;
};

export const divisionTabs = () => {
  return {
    contentId: '<uuid>',
    name: 'divisionTabs',
    type: 'module',
    composites: {
      headLine: [
        {
          text: 'First Day Outfits',
          style: 'style1',
        },
      ],
      buttonList: [
        {
          id: '/c/boys-outfits',
          label: 'Etna',
          title: 'Etna',
          external: 0,
          target: '|_blank|_modal',
          action: '<action_value>',
        },
        {
          id: '/c/girl-outfits',
          label: 'LorumIpsum1',
          title: 'LorumIpsum1',
          external: 0,
          target: '|_blank|_modal',
          action: '<action_value>',
        },
        {
          id: '/c/toddler-girl-outfits',
          label: 'LorumIpsum2',
          title: 'LorumIpsum2',
          external: 0,
          target: '|_blank|_modal',
          action: '<action_value>',
        },
        {
          id: '/c/toddler-boy-outfits',
          label: 'LorumIpsum3',
          title: 'LorumIpsum3',
          external: 0,
          target: '|_blank|_modal',
          action: '<action_value>',
        },
      ],
    },
    submodules: {},
    set: [
      {
        key: 'ctaType',
        val: 0,
      },
    ],
  };
};

export const getOutfitModule = () => {
  return {
    contentId: '<uuid>',
    name: 'outfitCarousel',
    type: 'module',
    composites: {
      headLine: [
        {
          text: 'Daffodil garden',
          style: 'style1',
        },
      ],
      subHeadLine: [
        {
          text: 'Build her head-to-toe party outfit sprinkled with all the extra-sweet details!',
          style: 'style2',
        },
      ],
      mediaLinkedList: [
        {
          image: {
            url:
              'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
            alt: 'Tropical blush1',
            title: 'Tropical blush1',
            crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
            url_m: '',
            url_t: '',
          },
          link: {
            url: '/static/images/dollar-sign-icon.svg',
            text: 'Tropical blush2',
            title: 'Tropical blush2',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          image: {
            url:
              'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid2.png',
            alt: 'Tropical blush3',
            title: 'Tropical blush3',
            crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
            url_m: '',
            url_t: '',
          },
          link: {
            url: '/node/product/<uuid>',
            text: 'Tropical blush4',
            title: 'Tropical blush4',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          image: {
            url:
              'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
            alt: 'Tropical blush5',
            title: 'Tropical blush5',
            crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
            url_m: '',
            url_t: '',
          },
          link: {
            url: '/node/product/<uuid>',
            text: 'Tropical blush6',
            title: 'Tropical blush6',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          image: {
            url:
              'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid2.png',
            alt: 'Tropical blush7',
            title: 'Tropical blush7',
            crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
            url_m: '',
            url_t: '',
          },
          link: {
            url: '/node/product/<uuid>',
            text: 'Tropical blush8',
            title: 'Tropical blush8',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          image: {
            url:
              'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
            alt: 'Tropical blush9',
            title: 'Tropical blush9',
            crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
            url_m: '',
            url_t: '',
          },
          link: {
            url: '/node/product/<uuid>',
            text: 'Tropical blush10',
            title: 'Tropical blush10',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          image: {
            url:
              'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
            alt: 'Tropical blush11',
            title: 'Tropical blush11',
            crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
            url_m: '',
            url_t: '',
          },
          link: {
            url: '/node/product/<uuid>',
            text: 'Tropical blush12',
            title: 'Tropical blush12',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          image: {
            url:
              'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid2.png',
            alt: 'Tropical blush13',
            title: 'Tropical blush13',
            crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
            crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
            url_m: '',
            url_t: '',
          },
          link: {
            url: '/node/product/<uuid>',
            text: 'Tropical blush14',
            title: 'Tropical blush14',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
      ],
    },
    submodules: {},
    set: [],
  };
};

export const getJeanModule = () => {
  return {
    contentId: '<uuid>',
    name: 'jeans',
    type: 'module',
    composites: {
      headLine: [
        {
          text: 'Your Denim Place',
          style: 'style1',
        },
      ],
      imageTileWrapper: [
        {
          imageStyled: [
            {
              image: {
                url:
                  'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
                alt: 'Fashion',
                title: 'Fashion',
                crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
                url_m: '',
                url_t: '',
              },
              styled: {
                text: 'Fashion',
                style: 'style1',
              },
            },
          ],
          headLine: [
            {
              text: 'Text Item 1',
              style: 'style1',
            },
          ],
          subHeadLine: [
            {
              text: 'Text Item 1',
              style: 'style1',
            },
          ],
          textList: [
            {
              text: 'Text Item 1',
            },
            {
              text: 'Text Item 2',
            },
            {
              text: 'Text Item 3',
            },
            {
              text: 'Text Item 4',
            },
            {
              text: 'Text Item 5',
            },
          ],
          singleCTAButton: {
            url: '/node/pdp',
            text: 'SHOP NOW',
            title: 'SHOP NOW',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          imageStyled: [
            {
              image: {
                url:
                  'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
                alt: 'Distressed',
                title: 'Diestressed',
                crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
                url_m: '',
                url_t: '',
              },
              styled: {
                text: 'Distressed',
                style: 'style1',
              },
            },
          ],
          headLine: [
            {
              text: 'Distressed',
              style: 'style1',
            },
          ],
          subHeadLine: [
            {
              text: 'Perfectly ripped and washed',
              style: 'style1',
            },
          ],
          textList: [
            {
              text: 'Text Item 1',
            },
            {
              text: 'Text Item 2',
            },
            {
              text: 'Text Item 3',
            },
            {
              text: 'Text Item 4',
            },
            {
              text: 'Text Item 5',
            },
          ],
          singleCTAButton: {
            url: '/node/pdp',
            text: 'SHOP NOW',
            title: 'SHOP NOW',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          imageStyled: [
            {
              image: {
                url:
                  'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
                alt: 'Super Skiny',
                title: 'Super Skiny',
                crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
                url_m: '',
                url_t: '',
              },
              styled: {
                text: 'Super Skiny',
                style: 'style1',
              },
            },
          ],
          headLine: [
            {
              text: 'Super Skiny',
              style: 'style1',
            },
          ],
          subHeadLine: [
            {
              text: 'Perfectly ripped and washed',
              style: 'style1',
            },
          ],
          textList: [
            {
              text: 'Text Item 1',
            },
            {
              text: 'Text Item 2',
            },
            {
              text: 'Text Item 3',
            },
            {
              text: 'Text Item 4',
            },
            {
              text: 'Text Item 5',
            },
          ],
          singleCTAButton: {
            url: '/node/pdp',
            text: 'SHOP NOW',
            title: 'SHOP NOW',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          imageStyled: [
            {
              image: {
                url:
                  'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
                alt: 'Fashion',
                title: 'Fashion',
                crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
                url_m: '',
                url_t: '',
              },
              styled: {
                text: 'Fashion',
                style: 'style1',
              },
            },
          ],
          headLine: [
            {
              text: 'Text Item 1',
              style: 'style1',
            },
          ],
          subHeadLine: [
            {
              text: 'Text Item 1',
              style: 'style1',
            },
          ],
          textList: [
            {
              text: 'Text Item 1',
            },
            {
              text: 'Text Item 2',
            },
            {
              text: 'Text Item 3',
            },
            {
              text: 'Text Item 4',
            },
            {
              text: 'Text Item 5',
            },
          ],
          singleCTAButton: {
            url: '/node/pdp',
            text: 'SHOP NOW',
            title: 'SHOP NOW',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          imageStyled: [
            {
              image: {
                url:
                  'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
                alt: 'Distressed',
                title: 'Diestressed',
                crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
                url_m: '',
                url_t: '',
              },
              styled: {
                text: 'Distressed',
                style: 'style1',
              },
            },
          ],
          headLine: [
            {
              text: 'Distressed',
              style: 'style1',
            },
          ],
          subHeadLine: [
            {
              text: 'Perfectly ripped and washed',
              style: 'style1',
            },
          ],
          textList: [
            {
              text: 'Text Item 1',
            },
            {
              text: 'Text Item 2',
            },
            {
              text: 'Text Item 3',
            },
            {
              text: 'Text Item 4',
            },
            {
              text: 'Text Item 5',
            },
          ],
          singleCTAButton: {
            url: '/node/pdp',
            text: 'SHOP NOW',
            title: 'SHOP NOW',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          imageStyled: [
            {
              image: {
                url:
                  'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
                alt: 'Super Skiny',
                title: 'Super Skiny',
                crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
                url_m: '',
                url_t: '',
              },
              styled: {
                text: 'Super Skiny',
                style: 'style1',
              },
            },
          ],
          headLine: [
            {
              text: 'Super Skiny',
              style: 'style1',
            },
          ],
          subHeadLine: [
            {
              text: 'Perfectly ripped and washed',
              style: 'style1',
            },
          ],
          textList: [
            {
              text: 'Text Item 1',
            },
            {
              text: 'Text Item 2',
            },
            {
              text: 'Text Item 3',
            },
            {
              text: 'Text Item 4',
            },
            {
              text: 'Text Item 5',
            },
          ],
          singleCTAButton: {
            url: '/node/pdp',
            text: 'SHOP NOW',
            title: 'SHOP NOW',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          imageStyled: [
            {
              image: {
                url:
                  'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
                alt: 'Fashion',
                title: 'Fashion',
                crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
                url_m: '',
                url_t: '',
              },
              styled: {
                text: 'Fashion',
                style: 'style1',
              },
            },
          ],
          headLine: [
            {
              text: 'Text Item 1',
              style: 'style1',
            },
          ],
          subHeadLine: [
            {
              text: 'Text Item 1',
              style: 'style1',
            },
          ],
          textList: [
            {
              text: 'Text Item 1',
            },
            {
              text: 'Text Item 2',
            },
            {
              text: 'Text Item 3',
            },
            {
              text: 'Text Item 4',
            },
            {
              text: 'Text Item 5',
            },
          ],
          singleCTAButton: {
            url: '/node/pdp',
            text: 'SHOP NOW',
            title: 'SHOP NOW',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          imageStyled: [
            {
              image: {
                url:
                  'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
                alt: 'Distressed',
                title: 'Diestressed',
                crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
                url_m: '',
                url_t: '',
              },
              styled: {
                text: 'Distressed',
                style: 'style1',
              },
            },
          ],
          headLine: [
            {
              text: 'Distressed',
              style: 'style1',
            },
          ],
          subHeadLine: [
            {
              text: 'Perfectly ripped and washed',
              style: 'style1',
            },
          ],
          textList: [
            {
              text: 'Text Item 1',
            },
            {
              text: 'Text Item 2',
            },
            {
              text: 'Text Item 3',
            },
            {
              text: 'Text Item 4',
            },
            {
              text: 'Text Item 5',
            },
          ],
          singleCTAButton: {
            url: '/node/pdp',
            text: 'SHOP NOW',
            title: 'SHOP NOW',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
        {
          imageStyled: [
            {
              image: {
                url:
                  'https://test1.theplace.com/image/upload/v1572953378/ecom/assets/content/gym/us/home/mod/outfits_kid1.png',
                alt: 'Super Skiny',
                title: 'Super Skiny',
                crop_d: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
                url_m: '',
                url_t: '',
              },
              styled: {
                text: 'Super Skiny',
                style: 'style1',
              },
            },
          ],
          headLine: [
            {
              text: 'Super Skiny',
              style: 'style1',
            },
          ],
          subHeadLine: [
            {
              text: 'Perfectly ripped and washed',
              style: 'style1',
            },
          ],
          textList: [
            {
              text: 'Text Item 1',
            },
            {
              text: 'Text Item 2',
            },
            {
              text: 'Text Item 3',
            },
            {
              text: 'Text Item 4',
            },
            {
              text: 'Text Item 5',
            },
          ],
          singleCTAButton: {
            url: '/node/pdp',
            text: 'SHOP NOW',
            title: 'SHOP NOW',
            target: '',
            external: 0,
            action: '<action_value>',
          },
        },
      ],
    },
    submodules: {},
    set: [
      {
        key: 'bgColor',
        val: '<background_color>',
      },
    ],
  };
};
