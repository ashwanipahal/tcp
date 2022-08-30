import React from 'react';
import { shallow } from 'enzyme';
import { AccountDrawerContainer, mapDispatchToProps } from '../AccountDrawer.container';

describe('PlaceRewardsContainer', () => {
  it('should render correctly', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const tree = shallow(<AccountDrawerContainer labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action openOverlay which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.openOverlay();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
