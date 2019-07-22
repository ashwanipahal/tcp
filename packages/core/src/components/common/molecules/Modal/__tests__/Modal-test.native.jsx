import React from 'react';
import { shallow } from 'enzyme';
import ModalNative from '../view/Modal.native';

describe('Modal Native', () => {
  it('should render correctly', () => {
    const tree = shallow(<ModalNative isOpen onRequestClose={jest.fn()} heading="Modal Heading" />);
    expect(tree).toMatchSnapshot();
  });
});
