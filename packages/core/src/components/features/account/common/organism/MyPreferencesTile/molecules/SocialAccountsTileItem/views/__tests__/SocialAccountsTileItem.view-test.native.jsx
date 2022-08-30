import React from 'react';
import { shallow } from 'enzyme';
import SocialAccountsTileItem from '../SocialAccountsTileItem.view.native';

describe('SocialAccountsTileItem component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      getSocialAcc: {},
    };
    const component = shallow(<SocialAccountsTileItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
