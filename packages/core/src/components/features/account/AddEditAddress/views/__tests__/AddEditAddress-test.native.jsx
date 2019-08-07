import React from 'react';
import { shallow } from 'enzyme';
import labels from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.labels';
import { AddressBookVanilla } from '../AddEditAddress.view.native';

describe('AddEditAddress Native', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddressBookVanilla labels={labels} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return the length of view as 1', () => {
    expect(component).toHaveLength(1);
    expect(component.find('View')).toHaveLength(1);
  });
});
