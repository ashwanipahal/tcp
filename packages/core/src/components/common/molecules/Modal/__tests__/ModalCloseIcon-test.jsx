import React from 'react';
import { shallow } from 'enzyme';
import { ModalCloseIconVanilla } from '../view/ModalCloseIcon';

describe('Modal Close Icon', () => {
  it('renders correctly with props', () => {
    const props = {
      className: 'modal-close-button',
      closeFunc: jest.fn(),
    };
    const component = shallow(
      <ModalCloseIconVanilla {...props}>Modal Close Icon with props</ModalCloseIconVanilla>
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with function call', () => {
    const props = {
      closeFunc: jest.fn(),
      className: 'modal-close-button',
    };
    const component = shallow(
      <ModalCloseIconVanilla {...props}>Modal Close Icon with function call</ModalCloseIconVanilla>
    );
    component.find('button').simulate('click', props.closeFunc);
    expect(component.find('.modal-close-button')).toHaveLength(1);
    expect(props.closeFunc).toBeCalled();
  });
});
