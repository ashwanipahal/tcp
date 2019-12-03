import getProducts from '../clickEvents/eventsUtility';

describe('transformEvents', () => {
  it('get product data method should return string if data passed', () => {
    // eslint-disable-next-line
    global._dataLayer = {
      currencyCode: 'USD',
      giftType: 'P',
      internalCampaignIdList: ['11', '22'],
    };
    const prodData = [
      {
        color: 'MED DENIM',
        id: 8067686477,
        name: 'Girls Denim Pull-On Shorts',
        price: 16.94,
        extPrice: 16.94,
        paidPrice: 16.94,
        listPrice: 16.94,
        partNumber: '2076092_M4',
        size: 4,
        upc: '00889705446890',
        sku: 856759,
        pricingState: 'full price',
        colorId: 852212,
        storeId: null,
        quantity: 1,
      },
    ];
    expect(getProducts(prodData)).toEqual(
      ';8067686477;1;16.94;;eVar63=16.94 USD:16.94 USD|eVar67=full price|eVar77=MED DENIM|eVar82=00889705446890|eVar88=4|eVar89=852212|eVar95=856759,;icidlink;;;event80=1;eVar90=11,;icidlink;;;event80=1;eVar90=22'
    );
  });
  it('get product data method should return string if data not passed', () => {
    // eslint-disable-next-line
    global._dataLayer = {
      currencyCode: 'USD',
      giftType: 'P',
      internalCampaignIdList: ['11', '22'],
    };
    expect(getProducts([])).toEqual(
      ';icidlink;;;event80=1;eVar90=11,;icidlink;;;event80=1;eVar90=22'
    );
  });
});
