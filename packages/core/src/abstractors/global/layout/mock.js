const cid = 'c7022833-8671-4b5f-891b-d984617bac4c';

export default {
  layout: {
    cid,
    typ: 'page',
    sub: 'pageLayout',
    val: {
      path: '/',
      seo: {
        pageTitle: 'TCP Homepage',
        keywords: 'chidlren, cloth, tshort, jeans',
        description: 'TCP description',
      },
      layout: {
        cid,
        typ: 'layout',
        sub: 'homepage',
        val: [
          {
            typ: 'slot',
            sub: 'slot_01',
            val: '',
          },
          {
            typ: 'slot',
            sub: 'slot_02',
            val: {
              cid,
              typ: 'module',
              sub: 'moduleD',
              val: '',
            },
          },
          {
            typ: 'slot',
            sub: 'slot_03',
            val: {
              cid,
              typ: 'module',
              sub: 'moduleB',
              val: '',
            },
          },
          {
            typ: 'slot',
            sub: 'slot_04',
            val: {
              cid,
              typ: 'module',
              sub: 'moduleK',
              val: '',
            },
          },
        ],
      },
    },
  },
};
