export default {
  moduleD: {
    type: 'module',
    name: 'moduleD',
    contentID: '<uuid>',
    value: [
      {
        type: 'composite',
        name: 'header',
        value: {
          type: 'link',
          name: 'headerLink',
          value: {
            url: '/node/pdp/<uuid>',
            text: 'Mini Me Shop',
            title: 'go to mini me shop',
            target: '',
            external: 0,
            class: '',
            view: 'link',
          },
        },
      },
      {
        type: 'composite',
        subtype: 'promoBanner',
        value: {
          type: 'link',
          name: 'headerLink',
          value: {
            url: '/node/pdp/<uuid>',
            text: 'this is a <strong>promo</strong> banner',
            title: 'go to promo section',
            target: '',
            external: 0,
            class: '',
            view: 'link',
          },
        },
      },
      {
        type: 'composite',
        subtype: 'imageGallery',
        value: [
          {
            type: 'imageLink',
            name: 'imageLink1',
            value: {
              url: '/something1',
              text: 'Family tees1',
              target: '',
              external: 0,
              class: '',
              view: 'link',
              image: {
                src:
                  'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
                alt: '',
              },
            },
          },
          {
            type: 'imageLink',
            name: 'imageLink2',
            value: {
              url: '/something2',
              text: 'Mom and Me tees',
              target: '',
              external: 0,
              class: '',
              view: 'link',
              image: {
                src:
                  'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME3_vmfhnu.jpg',
                alt: '',
              },
            },
          },
          {
            type: 'imageLink',
            name: 'imageLink1',
            value: {
              url: '/something3',
              text: 'Family tees3',
              target: '',
              external: 0,
              class: '',
              view: 'link',
              image: {
                src:
                  'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543114/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME4_iuzwmp.jpg',
                alt: '',
              },
            },
          },
          {
            type: 'imageLink',
            name: 'imageLink1',
            value: {
              url: '/something4',
              text: 'Family tees4',
              target: '',
              external: 0,
              class: '',
              view: 'link',
              image: {
                src:
                  'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543114/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME2_uwtbdd.jpg',
                alt: '',
              },
            },
          },
        ],
      },
      {
        type: 'composite',
        name: 'ctaButton',
        value: {
          type: 'link',
          name: 'cta1',
          value: {
            url: '/node/pdp',
            text: 'SHOP ALL',
            title: 'shop all categories',
            target: '',
            external: 0,
            class: '',
            view: 'button',
          },
        },
      },
    ],
  },
};
