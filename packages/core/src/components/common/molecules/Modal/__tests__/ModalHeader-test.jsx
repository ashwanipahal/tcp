import React from 'react';
import { shallow } from 'enzyme';
import ModalHeader from '../view/ModalHeader';

describe('ModalHeader component', () => {
  it('renders correctly with props', () => {
    const props = {
      closeFunc: jest.fn(),
      title: 'Modal',
    };
    const component = shallow(<ModalHeader {...props}>Modal Header with props</ModalHeader>);
    expect(component).toMatchSnapshot();
  });
});
