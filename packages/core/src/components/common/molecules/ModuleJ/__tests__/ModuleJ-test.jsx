import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleJ/mock';
import { ModuleJVanilla as ModuleJ } from '../views/ModuleJ';

let ModuleJComp;
const productTabList = {
  '47503': [
    {
      product_name: 'Boys Spider-Man Short Sleeve Action Sketch Graphic Ringer Tee',
      uniqueId: '2091715_01',
      seo_token: 'Boys-Spider-Man-Short-Sleeve-Action-Sketch-Graphic-Ringer-Tee-2091715-01',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2091715_01.jpg',
      ],
      pdpUrl: '/p?pid=Boys-Spider-Man-Short-Sleeve-Action-Sketch-Graphic-Ringer-Tee-2091715-01',
      pdpAsPath: '/p/Boys-Spider-Man-Short-Sleeve-Action-Sketch-Graphic-Ringer-Tee-2091715-01',
    },
    {
      product_name: 'Boys Spider-Man Short Sleeve Gamer Face Graphic Tee',
      uniqueId: '2091713_798',
      seo_token: 'Boys-Spider-Man-Short-Sleeve-Gamer-Face-Graphic-Tee-2091713-798',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2091713_798.jpg',
      ],
      pdpUrl: '/p?pid=Boys-Spider-Man-Short-Sleeve-Gamer-Face-Graphic-Tee-2091713-798',
      pdpAsPath: '/p/Boys-Spider-Man-Short-Sleeve-Gamer-Face-Graphic-Tee-2091713-798',
    },
  ],
  '49007': [
    {
      product_name: 'Girls Cable Knit Tights',
      uniqueId: '2086620_IV',
      seo_token: 'Girls-Cable-Knit-Tights-2086620-IV',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2086620_IV.jpg',
      ],
      pdpUrl: '/p?pid=Girls-Cable-Knit-Tights-2086620-IV',
      pdpAsPath: '/p/Girls-Cable-Knit-Tights-2086620-IV',
    },
    {
      product_name: 'Girls Cable Knit Tights',
      uniqueId: '2086620_1362',
      seo_token: 'Girls-Cable-Knit-Tights-2086620-1362',
      imageUrl: [
        'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2086620_1362.jpg',
      ],
      pdpUrl: '/p?pid=Girls-Cable-Knit-Tights-2086620-1362',
      pdpAsPath: '/p/Girls-Cable-Knit-Tights-2086620-1362',
    },
  ],
};
const singleCTAButton = {
  url: 'http://www.childrensplace.com',
  text: 'SHOP ALL 3',
  title: 'SHOP ALL',
  target: '',
  external: 0,
  action: '',
};

beforeEach(() => {
  const wrapper = shallow(
    <ModuleJ
      {...mock.moduleJ.composites}
      productTabList={productTabList}
      singleCTAButton={singleCTAButton}
    />
  ).get(0);
  ModuleJComp = shallow(wrapper);
});

describe('ModuleJ component', () => {
  it('renders correctly', () => {
    expect(ModuleJComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(ModuleJComp.find('.promo-header')).toHaveLength(1);
  });

  it('Module has promo banner', () => {
    expect(ModuleJComp.find('.promoBanner')).toHaveLength(1);
  });

  it('Module has top view', () => {
    expect(ModuleJComp.find('.topview')).toHaveLength(1);
  });
});
