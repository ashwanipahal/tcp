import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleR/mock';
import { ModuleRVanilla as ModuleR } from '../views/ModuleR';
import * as utils from '../../../../../utils/utils.web';

utils.viewport = jest.fn();

describe('Module R Component', () => {
  let ModuleRComp;
  const props = {
    ...mock.moduleR.composites,
    bannerPosition: 'top',
  };
  const selectedProductList = [
    {
      uniqueId: '3002156_10',
      seo_token:
        'Girls-Mommy-And-Me-Short-Sleeve-Glitter--I-m-The-Birthday-Girl--Unicorn-Matching-Graphic-Tee-3002156-10',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3002156_10.jpg',
      ],
      pdpUrl:
        '/p/Girls-Mommy-And-Me-Short-Sleeve-Glitter--I-m-The-Birthday-Girl--Unicorn-Matching-Graphic-Tee-3002156-10',
    },
    {
      uniqueId: '3002152_10',
      seo_token:
        'Womens-Mommy-And-Me-Short-Sleeve-Glitter--Mom-Of-The-Birthday-Girl--Unicorn-Matching-Graphic-Tee-3002152-10',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3002152_10.jpg',
      ],
      pdpUrl:
        '/p/Womens-Mommy-And-Me-Short-Sleeve-Glitter--Mom-Of-The-Birthday-Girl--Unicorn-Matching-Graphic-Tee-3002152-10',
    },
    {
      uniqueId: '3002153_10',
      seo_token:
        'Womens-Mommy-And-Me-Short-Sleeve-Foil--Mommy-Of-The-Birthday-Princess--Matching-Graphic-Tee-3002153-10',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3002153_10.jpg',
      ],
      pdpUrl:
        '/p/Womens-Mommy-And-Me-Short-Sleeve-Foil--Mommy-Of-The-Birthday-Princess--Matching-Graphic-Tee-3002153-10',
    },
    {
      uniqueId: '3002155_10',
      seo_token:
        'Baby-And-Toddler-Girls-Mommy-And-Me-Short-Sleeve-Embellished--Birthday-Princess--Matching-Graphic-Tee-3002155-10',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3002155_10.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Mommy-And-Me-Short-Sleeve-Embellished--Birthday-Princess--Matching-Graphic-Tee-3002155-10',
    },
    {
      uniqueId: '3002154_10',
      seo_token:
        'Baby-And-Toddler-Girls-Mommy-And-Me-Short-Sleeve-Glitter--I-m-The-Birthday-Girl--Unicorn-Matching-Graphic-Tee-3002154-10',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3002154_10.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Mommy-And-Me-Short-Sleeve-Glitter--I-m-The-Birthday-Girl--Unicorn-Matching-Graphic-Tee-3002154-10',
    },
    {
      uniqueId: '2118754_10',
      seo_token:
        'Baby-And-Toddler-Girls-Birthday-Short-Sleeve-Glitter--Birthday-Princess--Graphic-Tee-2118754-10',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2118754_10.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Birthday-Short-Sleeve-Glitter--Birthday-Princess--Graphic-Tee-2118754-10',
    },
    {
      seo_token:
        'Unisex-Kids-Matching-Family-St--Patrick-s-Day-Short-Sleeve--Irish--Graphic-Tee-2075156-276',
      uniqueId: '2075156_276',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2075156_276.jpg',
      ],
      pdpUrl:
        '/p/Unisex-Kids-Matching-Family-St--Patrick-s-Day-Short-Sleeve--Irish--Graphic-Tee-2075156-276',
    },
    {
      uniqueId: '3000356_10',
      seo_token:
        'Unisex-Baby-And-Toddler-St--Patrick-s-Day-Short-Sleeve--Irish--Shamrock-Graphic-Tee-3000356-10',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3000356_10.jpg',
      ],
      pdpUrl:
        '/p/Unisex-Baby-And-Toddler-St--Patrick-s-Day-Short-Sleeve--Irish--Shamrock-Graphic-Tee-3000356-10',
    },
    {
      uniqueId: '2113345_10',
      seo_token:
        'Baby-And-Toddler-Girls-Birthday-Long-Sleeve-Glitter-Rainbow--The-Birthday-Girl--Graphic-Tee-2113345-10',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2113345_10.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Birthday-Long-Sleeve-Glitter-Rainbow--The-Birthday-Girl--Graphic-Tee-2113345-10',
    },
    {
      uniqueId: '3004587_1079',
      seo_token:
        'Baby-And-Toddler-Girls-Short-Sleeve-Glitter-Rainbow-Butterfly-Graphic-Tee-3004587-1079',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3004587_1079.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Short-Sleeve-Glitter-Rainbow-Butterfly-Graphic-Tee-3004587-1079',
    },
    {
      seo_token:
        'Unisex-Baby-And-Toddler-Matching-Family-St--Patrick-s-Day-Short-Sleeve--Irish--Graphic-Tee-2079945-276',
      uniqueId: '2079945_276',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2079945_276.jpg',
      ],
      pdpUrl:
        '/p/Unisex-Baby-And-Toddler-Matching-Family-St--Patrick-s-Day-Short-Sleeve--Irish--Graphic-Tee-2079945-276',
    },
    {
      uniqueId: '3004389_01',
      seo_token:
        'Baby-And-Toddler-Girls-Short-Sleeve-Glitter--Queen-Of-Daddy-s-Heart--Graphic-Tee-3004389-01',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3004389_01.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Short-Sleeve-Glitter--Queen-Of-Daddy-s-Heart--Graphic-Tee-3004389-01',
    },
    {
      uniqueId: '3004584_10',
      seo_token:
        'Baby-And-Toddler-Girls-Matching-Family-Short-Sleeve-Foil--Princess--Graphic-Tee-3004584-10',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3004584_10.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Matching-Family-Short-Sleeve-Foil--Princess--Graphic-Tee-3004584-10',
    },
    {
      uniqueId: '3004393_1316',
      seo_token:
        'Baby-And-Toddler-Girls-Short-Sleeve-Glitter--Mommy-Is-My-Bestie--Unicorn-Graphic-Tee-3004393-1316',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3004393_1316.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Short-Sleeve-Glitter--Mommy-Is-My-Bestie--Unicorn-Graphic-Tee-3004393-1316',
    },
    {
      uniqueId: '2098333_10',
      seo_token:
        'Baby-And-Toddler-Girls-St--Patrick-s-Day-Short-Sleeve-Glitter--LOVE--Shamrock-Graphic-Tee-2098333-10',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2098333_10.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-St--Patrick-s-Day-Short-Sleeve-Glitter--LOVE--Shamrock-Graphic-Tee-2098333-10',
    },
    {
      uniqueId: '3004394_321E',
      seo_token:
        'Baby-And-Toddler-Girls-Short-Sleeve-Glitter--100-Percent-Perfect--Graphic-Tee-3004394-321E',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3004394_321E.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Short-Sleeve-Glitter--100-Percent-Perfect--Graphic-Tee-3004394-321E',
    },
    {
      uniqueId: '3004388_32CU',
      seo_token:
        'Baby-And-Toddler-Girls-Short-Sleeve-Glitter--Auntie-s--Rainbow-Graphic-Tee-3004388-32CU',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3004388_32CU.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Short-Sleeve-Glitter--Auntie-s--Rainbow-Graphic-Tee-3004388-32CU',
    },
    {
      uniqueId: '3004395_1079',
      seo_token:
        'Baby-And-Toddler-Girls-Short-Sleeve-Glitter-Rainbow--Like-Mom--Graphic-Tee-3004395-1079',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3004395_1079.jpg',
      ],
      pdpUrl:
        '/p/Baby-And-Toddler-Girls-Short-Sleeve-Glitter-Rainbow--Like-Mom--Graphic-Tee-3004395-1079',
    },
  ];

  beforeEach(() => {
    ModuleRComp = shallow(<ModuleR {...mock.moduleR.composites} set={mock.moduleR.set} />);
  });

  it('renders correctly', () => {
    expect(ModuleRComp).toMatchSnapshot();
  });

  it('should call onProductTabChange', async () => {
    ModuleRComp.instance().onProductTabChange();
  });

  it('should call getImageGrid', () => {
    ModuleRComp.instance().getImageGrid(selectedProductList);
  });

  it('should call getSelectedProductList in case of mobile view', () => {
    utils.viewport.mockReturnValue({
      small: true,
    });
    expect(ModuleRComp.instance().getSelectedProductList(selectedProductList).length).toBe(9);
  });

  it('should call getSelectedProductList in case of tablet view', () => {
    utils.viewport.mockReturnValue({
      medium: true,
    });
    expect(ModuleRComp.instance().getSelectedProductList(selectedProductList).length).toBe(11);
  });

  it('should call getSelectedProductList in case of desktop view', () => {
    utils.viewport.mockReturnValue({
      large: true,
    });
    expect(ModuleRComp.instance().getSelectedProductList(selectedProductList).length).toBe(17);
  });

  it('should call getSelectedProductList in case of mobile view if banner position is top', () => {
    utils.viewport.mockReturnValue({
      small: true,
    });
    ModuleRComp = shallow(<ModuleR {...props} />);
    expect(ModuleRComp.instance().getSelectedProductList(selectedProductList).length).toBe(9);
  });

  it('should call getSelectedProductList in case of tablet view if banner position is top', () => {
    utils.viewport.mockReturnValue({
      medium: true,
    });
    ModuleRComp = shallow(<ModuleR {...props} />);
    expect(ModuleRComp.instance().getSelectedProductList(selectedProductList).length).toBe(12);
  });

  it('should call getSelectedProductList in case of desktop view if banner position is top', () => {
    utils.viewport.mockReturnValue({
      large: true,
    });
    ModuleRComp = shallow(<ModuleR {...props} />);
    expect(ModuleRComp.instance().getSelectedProductList(selectedProductList).length).toBe(18);
  });
});
