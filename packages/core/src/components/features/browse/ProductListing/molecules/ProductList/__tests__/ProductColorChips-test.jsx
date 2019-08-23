import React from 'react';
import { shallow } from 'enzyme';
import { ProductColorChipsVanilla } from '../views/ProductColorChips';

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
describe('ProductColorChipsVanilla component', () => {
  it('should renders correctly', () => {
    const component = shallow(<ProductColorChipsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders null', () => {
    const component = shallow(<ProductColorChipsVanilla {...props} colorsMap={[]} />);
    expect(component).toMatchSnapshot();
  });

  it('ProductColorChips should call handlePreviousClick', () => {
    const component = shallow(<ProductColorChipsVanilla {...props} />);
    component.setState({ firstItemIndex: 1 });
    component.instance().handlePreviousClick();
    expect(component.state('firstItemIndex')).toEqual(0);
  });

  it('ProductColorChips should call handleNextClick', () => {
    const component = shallow(<ProductColorChipsVanilla {...props} />);
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
