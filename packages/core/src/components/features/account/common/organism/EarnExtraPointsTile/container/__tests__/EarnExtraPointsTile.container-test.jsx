import { shallow } from 'enzyme';
import React from 'react';

import { EarnExtraPointsTileContainer, mapDispatchToProps } from '../EarnExtraPointsTile.container';

describe('EarnExtraPointsTileContainer View', () => {
  it('should render EarnExtraPointsTileContainer Correctly', () => {
    const tree = shallow(<EarnExtraPointsTileContainer getEarnExtraPointsListAction={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  it('should return an action getEarnExtraPointsListAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getEarnExtraPointsListAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
