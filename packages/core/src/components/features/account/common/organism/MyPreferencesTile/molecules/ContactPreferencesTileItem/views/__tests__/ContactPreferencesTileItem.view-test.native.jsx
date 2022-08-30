import React from 'react';
import { shallow } from 'enzyme';
import ContactPreferencesTileItem from '../ContactPreferencesTileItem.view.native';

describe('ContactPreferencesTileItem component', () => {
  it('should render correctly ', () => {
    const props = {
      labels: {},
      customerPreferences: {},
    };
    const component = shallow(<ContactPreferencesTileItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
