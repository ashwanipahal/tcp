import React from 'react';
import { shallow } from 'enzyme';
import { AccountHeader } from '../AccountHeader.view';

describe('AccountHeader Component', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <AccountHeader name="test" pointsToNextRewards="100" currentPoints="0" totalRewards="0.0" />
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render nothing if name is not present', () => {
    const tree = shallow(<AccountHeader />);
    expect(tree.isEmptyRender()).toBeTruthy();
  });
});
