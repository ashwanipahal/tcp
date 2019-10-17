import React from 'react';
import { shallow } from 'enzyme';
import { MyPrefrenceContainer, mapDispatchToProps } from '../container/MyPreference.container';

describe('MyProfile container', () => {
  const props = {
    labels: {
      accountOverview: {},
    },
  };
  it('should render MyProfile component', () => {
    const component = shallow(
      <MyPrefrenceContainer getSubscribeStoreAction={() => {}} {...props} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return an action getSubscribeStoreAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getSubscribeStoreAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
