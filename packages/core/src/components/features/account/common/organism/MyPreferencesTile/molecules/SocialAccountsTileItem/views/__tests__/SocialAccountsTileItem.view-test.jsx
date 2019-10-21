import React from 'react';
import { shallow } from 'enzyme';
import SocialAccountsTileItem from '../SocialAccountsTileItem.view';

describe('SocialAccountsTileItem component', () => {
  it('should render correctly when coupons are not present', () => {
    const props = {
      labels: {},
      getSocialAcc: {},
    };
    const component = shallow(<SocialAccountsTileItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
