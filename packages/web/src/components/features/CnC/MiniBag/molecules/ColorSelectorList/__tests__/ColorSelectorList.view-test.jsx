import React from 'react';
import { shallow } from 'enzyme';
import { ColorSelectorListVanilla } from '../views/ColorSelectorList.view';

describe('ColorSelectorListVanilla component', () => {
  it('ColorSelectorListVanilla component renders correctly', () => {
    const props = {
      className: 'checkout',
      optionsMap: [{ value: 'red', title: 'Color', content: 'red' }],
      clickHandler: jest.fn(),
      activeValue: '',
    };
    const component = shallow(<ColorSelectorListVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
