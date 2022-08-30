import React from 'react';
import { shallow } from 'enzyme';
import { AddressDropdown } from '../AddressDropdown.view';
import CustomSelect from '../../../../../../../common/molecules/CustomSelect';

describe('CreditCardFields component', () => {
  it('should renders correctly when isExpirationRequired is true', () => {
    const props = {
      options: [{}],
      input: { value: '', onChange: () => {} },
      selectListTitle: 'Select Address',
    };
    const component = shallow(<AddressDropdown {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.is(CustomSelect)).toBeTruthy();
  });
});
