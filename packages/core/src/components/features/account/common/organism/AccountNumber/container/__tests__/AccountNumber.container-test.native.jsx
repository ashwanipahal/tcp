import React from 'react';
import { shallow } from 'enzyme';
import { AccountNumberContainer, mapDispatchToProps } from '../AccountNumber.container.native';

describe('AccountNumberContainer container', () => {
  const props = {
    labels: {},
    commonLabels: {},
    myPlaceNumber: '',
  };

  it('should render AccountNumberContainer component', () => {
    const component = shallow(<AccountNumberContainer {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action getAddressListAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.fetchLabels();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
