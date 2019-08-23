import React from 'react';
import { shallow } from 'enzyme';
import { AddressDropdown } from '../AddressDropdown.view.native';

describe('CreditCardFields component', () => {
  it('should renders correctly when isExpirationRequired is true', () => {
    const props = {
      options: [{}],
      input: { value: '', onChange: () => {} },
      selectListTitle: 'Select Address',
      labels: { common: { lbl_common_tapClose: 'Tap to close' } },
      data: [],
    };
    const component = shallow(<AddressDropdown {...props} />);
    expect(component).toMatchSnapshot();
  });
});
