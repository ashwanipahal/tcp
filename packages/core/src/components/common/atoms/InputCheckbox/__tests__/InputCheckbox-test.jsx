import React from 'react';
import { shallow } from 'enzyme';
import { InputCheckboxVanilla } from '../views/InputCheckbox';
import BodyCopy from '../../BodyCopy';

const sampleText = 'This is sample checkbox';
describe('InputCheckbox component', () => {
  it('should render correctly', () => {
    const props = {
      className: 'sample-class',
      name: 'inputCheckbox',
      input: {},
    };
    const component = shallow(<InputCheckboxVanilla {...props}>{sampleText}</InputCheckboxVanilla>);
    expect(component).toMatchSnapshot();
  });

  it('should render children inside BodyCopy component', () => {
    const props = {
      className: 'sample-class',
      name: 'inputCheckbox',
      input: {},
    };
    const component = shallow(<InputCheckboxVanilla {...props}>{sampleText}</InputCheckboxVanilla>);
    expect(
      component
        .find(BodyCopy)
        .first()
        .text()
    ).toEqual(sampleText);
  });
});
