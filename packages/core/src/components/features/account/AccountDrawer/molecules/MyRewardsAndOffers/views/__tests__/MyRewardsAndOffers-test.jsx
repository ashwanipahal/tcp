import React from 'react';
import { shallow } from 'enzyme';
import { MyRewardsAndOffersVanilla } from '../MyRewardsAndOffers';

describe('MyRewardsAndOffers', () => {
  it('should render correctly', () => {
    const labels = {
      CREATE_ACC_LBL_HIDE: 'hide',
    };
    const tree = shallow(<MyRewardsAndOffersVanilla labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
