import React from 'react';
import { shallow } from 'enzyme';
import { ProductColorChipVanilla } from '../views/ProductColorChip';

describe('ProductColorChipVanilla component', () => {
  it('should renders correctly', () => {
    const props = {
      colorEntry: {
        colorProductId: 123,
        color: { name: '', imagePath: '' },
        miscInfo: [{}],
      },
      isActive: true,
      onChipClick: jest.fn(),
    };
    const component = shallow(<ProductColorChipVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
