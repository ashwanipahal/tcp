import React from 'react';
import { shallow } from 'enzyme';
import AccountDrawerView from '../AccountDrawer.view';

describe('AccountDrawerView', () => {
  it('should render correctly', () => {
    const labels = {};
    const tree = shallow(<AccountDrawerView labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
