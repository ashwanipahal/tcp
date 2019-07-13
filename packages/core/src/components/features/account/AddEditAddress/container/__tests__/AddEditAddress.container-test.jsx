import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { AddEditAddressContainer } from '../AddEditAddress.container';

// @flow

describe('<AddaddressContainer>', () => {
  it('should render correctly', () => {
    const component = shallow(
      <AddEditAddressContainer submitAddAddressFormAction={() => {}} addressList={List()} />
    );
    expect(component).toMatchSnapshot();
  });
});
