import React from 'react';
import { shallow } from 'enzyme';
import { LabeledRadioButtonVanilla } from '../views/LabeledRadioButton.view.native';

describe('CartItemRadioButtons native Component', () => {
  let component;
  const props = {
    title: '',
    className: '',
    children: '',
    name: '',
    checked: true,
  };

  it('LabeledRadioButton native should be defined', () => {
    component = shallow(<LabeledRadioButtonVanilla {...props} />);
    expect(component).toBeDefined();
  });

  it('LabeledRadioButton native should render correctly', () => {
    component = shallow(<LabeledRadioButtonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
