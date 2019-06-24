import React from 'react';
import ReactModal from 'react-modal';
import { shallow } from 'enzyme';
import Modal from '../view';

describe('Modal Wrapper', () => {
  it('renders <ReactModal>', () => {
    const wrapper = shallow(
      <Modal>
        <div>Modal content</div>
      </Modal>
    );
    const component = shallow(wrapper.get(0));
    expect(component.find(ReactModal).length).toEqual(1);
  });
});
