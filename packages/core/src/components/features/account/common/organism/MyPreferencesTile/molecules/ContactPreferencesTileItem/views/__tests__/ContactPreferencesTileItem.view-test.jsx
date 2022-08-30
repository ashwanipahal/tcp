import React from 'react';
import { shallow } from 'enzyme';
import ContactPreferencesTileItem from '../ContactPreferencesTileItem.view';

describe('ContactPreferencesTileItem component', () => {
  it('should render correctly when coupons are not present', () => {
    const props = {
      labels: {},
      customerPreferences: {},
    };
    const component = shallow(<ContactPreferencesTileItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
