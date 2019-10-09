import React from 'react';
import { shallow } from 'enzyme';
import ThankYouComponentVanilla from '../views/ThankYouComponent.view.native';

describe('ThankYouComponentVanilla', () => {
  it('should render correctly', () => {
    const props = {
      fullfillmentCenterData: [{}],
      orderNumbersByFullfillmentCenter: {},
      labels: {},
      updateOrderDetailsData: {},
    };
    const tree = shallow(<ThankYouComponentVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with isBossInList', () => {
    const props = {
      fullfillmentCenterData: [{}],
      orderNumbersByFullfillmentCenter: {},
      labels: {},
      updateOrderDetailsData: {},
      isBossInList: true,
    };
    const tree = shallow(<ThankYouComponentVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
