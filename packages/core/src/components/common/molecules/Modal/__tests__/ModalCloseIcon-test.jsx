import React from 'react';
import { shallow } from 'enzyme';
import ModalCloseIcon from '../view/ModalCloseIcon';

describe('Modal Close Icon', () => {
  it('renders correctly with props', () => {
    const props = {
      closeFunc: jest.fn(),
    };
    const component = shallow(
      <ModalCloseIcon {...props}>Modal Close Icon with props</ModalCloseIcon>
    );
    expect(component).toMatchSnapshot();
  });
});
