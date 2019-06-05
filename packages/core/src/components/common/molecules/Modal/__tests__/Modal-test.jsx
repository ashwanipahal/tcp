import React from 'react';
import ReactModal from 'react-modal';
import { shallow } from 'enzyme';
import Modal from '../Modal';

describe('Modal Wrapper', () => {
  it('renders <ReactModal>', () => {
    const wrapper = shallow(
      <Modal>
        <div>Modal content</div>
      </Modal>
    );
    expect(wrapper.find(ReactModal).length).toEqual(1);
  });
});
