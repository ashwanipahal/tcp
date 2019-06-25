import React from 'react';
import { shallow } from 'enzyme';
import { EmptyAddressList } from '../EmptyAddressList.view';

describe('EmptyAddressList component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<EmptyAddressList {...props} />);
    expect(component).toMatchSnapshot();
  });
});
