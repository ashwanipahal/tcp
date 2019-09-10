import React from 'react';
import { shallow } from 'enzyme';
import { RecommendationsVanilla as Recommendations } from '../Recommendations';

const props = {
  products: [
    {
      pdpUrl:
        '/us/p/Girls-Long-Sleeve-Sequin-Unicorn-Faux-Fur-Lined-Hooded-Parka-Jacket-3003346-32DE',
      name: 'Girls Sequin Unicorn Parka Jacket',
      imagePath:
        'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3003346_32DE.jpg',
      listPrice: '74.95',
      offerPrice: '74.95',
    },
  ],
  youMayAlsoLikeLabel: 'You May Also Like',
  className: 'test class',
};

describe('N component', () => {
  let RecommendationsComp;

  beforeEach(() => {
    RecommendationsComp = shallow(<Recommendations {...props} />);
  });
  it('renders correctly', () => {
    expect(RecommendationsComp).toMatchSnapshot();
  });
});
