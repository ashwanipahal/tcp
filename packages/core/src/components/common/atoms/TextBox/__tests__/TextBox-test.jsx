import React from 'react';
import { shallow } from 'enzyme';
import TextBox from '../views/TextBox';

describe('Textbox component', () => {
  it('renders correctly', () => {
    const props = {
      type: 'text',
      id: 'abcd',
      className: 'asdfasdf',
    };
    const component = shallow(<TextBox {...props} />);
    expect(component).toMatchSnapshot();
  });
});
