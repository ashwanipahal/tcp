import React from 'react';
import { shallow } from 'enzyme';
import { ExtraPointsContainer, mapDispatchToProps } from '../ExtraPoints.container';

describe('ExtraPointsContainer View', () => {
  it('should render ExtraPointsContainer Correctly', () => {
    const tree = shallow(<ExtraPointsContainer getEarnExtraPointsListAction={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  it('should return an action getEarnExtraPointsListAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getEarnExtraPointsListAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
