import React from 'react';
import { shallow } from 'enzyme';
import { mapDispatchToProps, AddaddressContainer } from '../AddAddress/AddAddress.container';

// @flow

describe('<AddaddressContainer>', () => {
  it('should render correctly', () => {
    const component = shallow(<AddaddressContainer submitAddAddressFormAction={() => {}} />);
    expect(component).toMatchSnapshot();
  });
});
describe('#mapDispatchToProps', () => {
  it('should return an action submitAddAddressFormAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.submitAddAddressFormAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
