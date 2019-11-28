import React from 'react';
import { shallow } from 'enzyme';
import moduleGMockData from '../../../../../services/abstractors/common/moduleG/mock';
import { ModuleGVanilla as ModuleG } from '../views/ModuleG';

describe('ModuleGVanilla', () => {
  let ModuleGComponent;
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
    '47503>47544': [
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

  beforeEach(() => {
    ModuleGComponent = shallow(
      <ModuleG {...moduleGMockData.moduleG.composites} productTabList={productTabList} />
    );
  });

  it('ModuleG should be defined', () => {
    expect(ModuleGComponent).toBeDefined();
  });

  it('ModuleG should render correctly', () => {
    expect(ModuleGComponent).toMatchSnapshot();
  });
});
