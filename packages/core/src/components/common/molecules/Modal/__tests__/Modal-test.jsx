import React from 'react';
import ReactModal from 'react-modal';
import { shallow } from 'enzyme';
import { ModalVanilla } from '../view/Modal';

describe('Modal Wrapper', () => {
  it('renders <ReactModal>', () => {
    const wrapper = shallow(
      <ModalVanilla>
        <div>Modal content</div>
      </ModalVanilla>
    );
    const component = shallow(wrapper.get(0));
    expect(component.find(ReactModal).length).toEqual(1);
  });
});
