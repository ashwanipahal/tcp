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
        quantity: 1,
        shippingMethod: 123,
        storeId: 345,
        outfitId: 678,
        stylitics: true,
        uniqueOutfitId: true,
        offerPrice: 15,
        sflExtPrice: 14,
        rating: 22,
        reviews: 45,
        type: 'test',
        gender: 'male',
        position: 'top',
        giftCardAmount: 50,
        couponAmount: 50,
        savingsAmount: 50,
        shippingAmount: 50,
        taxAmount: 50,
        netRevenue: 50,
        multipleSkus: true,
        cartPrice: 21,
        recsPageType: true,
        searchClick: true,
        plpClick: true,
        recsProductId: true,
        recsType: true,
        features: 'high',
      },
    ];

    const sObj = {
      prop2: 'outfit',
      events: ['event86'],
      eVar3: true,
      linkName: 'cart add',
      eVar19: 33,
    };
    expect(getProducts(prodData, sObj)).toEqual(
      ';8067686477;1;16.94;event75=1|event137=15.00|event136=14.00|event92=1|event6=50.00|event7=50.00|event22=50.00|event78=50.00|event79=50.00|event99=50.00|event50=1|event85=16.94;eVar5=123|eVar53=345|eVar60=678|eVar63=16.94 USD:16.94 USD|eVar67=full price|eVar71=22:45|eVar77=MED DENIM|eVar80=test|eVar82=00889705446890|eVar83=male|eVar88=4|eVar89=852212|eVar95=856759|eVar100=top|eVar57=P|eVar87=true|eVar20=true|eVar21=true|eVar92=true|eVar72=high|eVar2=outfit,;icidlink;;;event80=1;eVar90=11,;icidlink;;;event80=1;eVar90=22,;icidlink;;;event81=1;eVar90=33'
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
