import React from 'react';
import { shallow } from 'enzyme';
import { AddressBookVanilla } from '../AddEditAddress.view.native';

describe('AddEditAddress Native', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddressBookVanilla addressFormLabels={{}} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    component.setProps({ currentForm: 'AddAddress' });
    expect(component).toMatchSnapshot();
  });

  it('should return the length of view as 1', () => {
    expect(component).toHaveLength(1);
    expect(component.find('View')).toHaveLength(1);
  });

  it('should test with verification modal', () => {
    component.setProps({ currentForm: 'VerificationModal' });
    expect(component).toMatchSnapshot();
  });
});
