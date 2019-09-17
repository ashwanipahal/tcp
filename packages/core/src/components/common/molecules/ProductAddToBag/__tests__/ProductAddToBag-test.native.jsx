import React from 'react';
import { shallow } from 'enzyme';

import { ProductAddToBagVanilla } from '../views/ProductAddToBag.view.native';

describe('ProductAddToBagVanilla native should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductAddToBagVanilla />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render expected number of components', () => {
    expect(wrapper.find('View').length).toBe(1);
    expect(wrapper.find('Field').length).toBe(3);
  });

  it('should render color', () => {
    const selectColor = jest.fn();
    const item = { color: { imagePath: '//', name: 'WHITE' } };
    wrapper.setProps({ selectColor, selectedColor: item });
    const linkImage = shallow(
      wrapper
        .find('Field')
        .first()
        .props()
        .renderItem({ item })
    );
    linkImage.props().onPress();
    expect(selectColor).toHaveBeenCalled();
  });
});
