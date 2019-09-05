import React from 'react';
import { shallow } from 'enzyme';
import { AccountOverviewContainerVanilla, mapDispatchToProps } from '../AccountOverview.container';
import AccountOverviewComponent from '../../views/AccountOverview.view';

describe('AccountOverview container', () => {
  it('should render AccountOverview component', () => {
    const component = shallow(
      <AccountOverviewContainerVanilla
        labels={{ accountOverview: {} }}
        openTrackOrder={jest.fn()}
      />
    );
    expect(component.is(AccountOverviewComponent)).toBeTruthy();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action onSubmit which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const payloadArgs = {
        state: true,
      };
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.openTrackOrder(payloadArgs);
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
