export default {
  homepage: {
    items: [
      {
        path: '/homepage',
        seo: {
          pageTitle: 'Seo title',
          keywords: 'seo key1, seo key2',
          description: 'Seo Description',
        },
        layout: {
          slots: [
            {
              name: 'slot_1',
              moduleName: 'moduleD',
              contentId: '73f6a699-79a4-4874-994f-ab306dd66dca',
            },
            {
              name: 'slot_2',
              moduleName: 'moduleH',
              contentId: 'c755fe7e-5811-4039-ba96-7efc0a2d2d64',
            },
          ],
        },
      },
    ],
  },
};
