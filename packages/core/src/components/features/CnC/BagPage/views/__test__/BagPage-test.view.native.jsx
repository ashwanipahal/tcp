import React from 'react';
import { shallow } from 'enzyme';
import BagPage from '../BagPage.view.native';

describe('AddedToBagActions native component', () => {
  it('AddedToBagActions native component renders correctly', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
      },
    };
    const component = shallow(<BagPage {...props} />);
    expect(component).toMatchSnapshot();
  });
});
