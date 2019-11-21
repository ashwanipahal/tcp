import React from 'react';
import { shallow } from 'enzyme';
import {
  MyPreferenceSubscription,
  mapDispatchToProps,
} from '../container/MyPreferenceSubscription.container';

describe('MyPrefrenceSubscribeText container', () => {
  const props = {
    labels: {
      accountOverview: {},
    },
  };
  it('should render MyPrefrenceSubscribeText component', () => {
    const component = shallow(
      <MyPreferenceSubscription getSubscribeStoreAction={() => {}} {...props} />
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
