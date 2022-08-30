import React from 'react';
import { shallow } from 'enzyme';
import { AccountDrawerPageVanilla } from '../AccountDrawerPage';

describe('AccountDrawerPage', () => {
  it('should render correctly', () => {
    const labels = {};
    const isCA = true;
    const tree = shallow(<AccountDrawerPageVanilla labels={labels} isCA={isCA} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('should not render RewardsPoints', () => {
  it('should renders correctly when addresses are not present', () => {
    const isCA = false;
    const labels = {};
    const tree = shallow(<AccountDrawerPageVanilla labels={labels} isCA={isCA} />);
    expect(tree).toMatchSnapshot();
  });
});
