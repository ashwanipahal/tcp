const plpUrl =
  'https://www.childrensplace.com/us/c/girls-kids-shorts?icid=hp_s3a_imagenbutton_g_050519_shorts';
const fmt = 'Family Tees';
const mmt = 'Mom & Me Tees';
export default {
  moduleD: {
    contentId: '73f6a699-79a4-4874-994f-ab306dd66dca',
    name: 'moduleD',
    type: 'module',
    composites: {
      headerText: {
        textLines: {
          text: 'Mini me shop',
          color: 'color2',
          style: 'style1',
        },
        link: {
          url: plpUrl,
          title: '',
          target: '',
        },
      },
      promoBanner: {
        items: [
          {
            link: {
              url: plpUrl,
              title: '',
              target: '',
              external: 0,
            },
            image: {
              url: '',
              alt: 'alt 1',
              title: 'Image link text',
            },
          },
        ],
      },
      smallCompImage: {
        items: [
          {
            link: {
              url: plpUrl,
              title: fmt,
              target: '',
              external: 0,
            },
            image: {
              url:
                'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
              title: fmt,
              alt: fmt,
            },
          },
          {
            link: {
              url: plpUrl,
              text: mmt,
              title: mmt,
              target: '',
              external: 0,
            },
            image: {
              url:
                'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME3_vmfhnu.jpg',
              title: mmt,
              alt: mmt,
            },
          },
          {
            link: {
              url: plpUrl,
              text: fmt,
              title: fmt,
              target: '',
              external: 0,
            },
            image: {
              url:
                'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543114/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME4_iuzwmp.jpg',
              title: fmt,
              alt: fmt,
            },
          },
          {
            link: {
              url: plpUrl,
              text: mmt,
              title: mmt,
              target: '',
              external: 0,
            },
            image: {
              url:
                'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543114/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME2_uwtbdd.jpg',
              title: mmt,
              alt: mmt,
            },
          },
        ],
      },
      singleCTAButton: {
        url: plpUrl,
        target: '',
        text: 'SHOP ALL',
        title: 'SHOP ALL',
        external: 0,
      },
    },
  },
};
