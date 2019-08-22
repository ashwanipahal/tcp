import React from 'react';
import { shallow } from 'enzyme';
import { ProductColorChipsVanilla } from '../views/ProductColorChips';

describe('ProductColorChipsVanilla component', () => {
  it('should renders correctly', () => {
    const props = {
      onChipClick: jest.fn(),
      selectedColorId: 123,
      maxVisibleItems: 1,
      isPLPredesign: false,
      showColorEvenOne: true,
      className: '',
      colorsMap: [
        {
          color: { name: '' },
          colorProductId: 123,
        },
        {
          color: { name: '' },
          colorProductId: 123,
        },
      ],
    };
    const component = shallow(<ProductColorChipsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders null', () => {
    const props = {
      onChipClick: jest.fn(),
      selectedColorId: 123,
      maxVisibleItems: 1,
      isPLPredesign: false,
      showColorEvenOne: true,
      className: '',
      colorsMap: [],
    };
    const component = shallow(<ProductColorChipsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
