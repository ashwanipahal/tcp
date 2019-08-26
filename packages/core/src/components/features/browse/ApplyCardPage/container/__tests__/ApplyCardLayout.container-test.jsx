import React from 'react';
import { shallow } from 'enzyme';
import ApplyCardLayoutContainer, { mapDispatchToProps } from '../ApplyCardLayout.container';

describe('ApplyCardLayoutContainer', () => {
  it('should render apply card layout view section', () => {
    const tree = shallow(
      <ApplyCardLayoutContainer
        applicationStatus="PENDING"
        labels="header"
        preScreenCodeLink=""
        disclaimersData="header"
        submitPLCCForm={jest.fn()}
      />
    );
    expect(tree).toBeDefined();
  });
  describe('#mapDispatchToProps', () => {
    it('should return an action closeModal which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.submitApplication();
      dispatchProps.fetchModuleXContent();
      expect(dispatch.mock.calls).toHaveLength(2);
    });
  });
});
