import React from 'react';
import { shallow } from 'enzyme';
import { TextBoxVanilla } from '../views/TextBox';

describe('Textbox component', () => {
  it('renders correctly', () => {
    const props = {
      type: 'text',
      id: 'abcd',
      className: 'asdfasdf',
      meta: 'sdfdsf',
      input: { value: 'hello sonar' },
    };
    const component = shallow(<TextBoxVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
