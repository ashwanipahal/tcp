import React from 'react';
import { shallow } from 'enzyme';
import labels from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.labels';
import AddEditAddress from '../AddEditAddress.view.native';

describe('AddEditAddress Native', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddEditAddress labels={labels} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
