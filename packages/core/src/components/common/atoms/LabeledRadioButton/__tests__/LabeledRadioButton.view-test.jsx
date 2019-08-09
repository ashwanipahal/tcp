import React from 'react';
import { shallow } from 'enzyme';
import { LabeledRadioButtonVanilla } from '../views/LabeledRadioButton.view';

describe('CartItemRadioButtons Component', () => {
  let component;
  const props = {
    title: '',
    className: '',
    children: '',
    name: '',
    checked: true,
  };

  it('LabeledRadioButton should be defined', () => {
    component = shallow(<LabeledRadioButtonVanilla {...props} />);
    expect(component).toBeDefined();
  });

  it('LabeledRadioButton should render correctly', () => {
    component = shallow(<LabeledRadioButtonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
