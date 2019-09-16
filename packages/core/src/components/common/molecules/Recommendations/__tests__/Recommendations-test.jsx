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

describe('Recommendations component', () => {
  let RecommendationsComp;

  beforeEach(() => {
    RecommendationsComp = shallow(<Recommendations {...props} />);
  });
  it('renders correctly', () => {
    expect(RecommendationsComp).toMatchSnapshot();
  });
});

describe('Recommendations Module O price only variation', () => {
  let RecommendationsComp;

  beforeEach(() => {
    RecommendationsComp = shallow(<Recommendations priceOnly {...props} />);
  });
  it('Recommendations Module O price only variation renders correctly', () => {
    expect(RecommendationsComp).toMatchSnapshot();
  });
});

describe('Recommendations Module O show button variation', () => {
  let RecommendationsComp;

  beforeEach(() => {
    RecommendationsComp = shallow(<Recommendations showButton {...props} />);
  });
  it('Recommendations Module O show button variation renders correctly', () => {
    expect(RecommendationsComp).toMatchSnapshot();
  });
});
