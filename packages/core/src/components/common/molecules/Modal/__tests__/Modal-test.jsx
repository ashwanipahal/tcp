import React from 'react';
import ReactModal from 'react-modal';
import { shallow } from 'enzyme';
import { ModalVanilla } from '../view/Modal';

describe('Modal Wrapper', () => {
  it('renders <ReactModal>', () => {
    const wrapper = shallow(
      <ModalVanilla isOpen>
        <div>Modal content</div>
      </ModalVanilla>
    );

    expect(wrapper.find(ReactModal).length).toEqual(1);
  });
});
