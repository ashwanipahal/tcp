import React from 'react';
import { shallow } from 'enzyme';
import { AccountDrawerPageVanilla } from '../AccountDrawerPage';

describe('AccountDrawerPage', () => {
  it('should render correctly', () => {
    const labels = {};
    const tree = shallow(<AccountDrawerPageVanilla labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
