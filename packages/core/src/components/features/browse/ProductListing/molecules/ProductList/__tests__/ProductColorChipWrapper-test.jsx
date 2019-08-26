import React from 'react';
import { shallow } from 'enzyme';
import { ProductColorChipWrapperVanilla } from '../views/ProductColorChipWrapper';

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
describe('ProductColorChipWrapperVanilla component', () => {
  it('should renders correctly', () => {
    const component = shallow(<ProductColorChipWrapperVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders null', () => {
    const component = shallow(<ProductColorChipWrapperVanilla {...props} colorsMap={[]} />);
    expect(component).toMatchSnapshot();
  });

  it('ProductColorChipWrapper should call handlePreviousClick', () => {
    const component = shallow(<ProductColorChipWrapperVanilla {...props} />);
    component.setState({ firstItemIndex: 1 });
    component.instance().handlePreviousClick();
    expect(component.state('firstItemIndex')).toEqual(0);
  });

  it('ProductColorChipWrapper should call handleNextClick', () => {
    const component = shallow(<ProductColorChipWrapperVanilla {...props} />);
    component.setState({ firstItemIndex: 2 });
    component.setProps({
      isPLPredesign: false,
      colorsMap: [
        { color: { name: '' }, colorProductId: '' },
        { color: { name: '' }, colorProductId: '' },
      ],
      maxVisibleItems: 2,
    });
    component.instance().handleNextClick();
    expect(component.state('firstItemIndex')).toEqual(0);
    expect(component.state('isArrEnd')).toEqual(true);
  });
});
