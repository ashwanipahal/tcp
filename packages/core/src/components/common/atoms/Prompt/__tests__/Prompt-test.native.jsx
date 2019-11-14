import React from 'react';
import { shallow } from 'enzyme';
import Prompt from '../views/Prompt.native';

describe('Prompt component', () => {
  it('should render correctly', () => {
    const props = {
      title: '',
      onCancel: jest.fn(),
      onSubmit: jest.fn(),
    };
    const component = shallow(<Prompt {...props} />);
    expect(component).toMatchSnapshot();
  });
});
