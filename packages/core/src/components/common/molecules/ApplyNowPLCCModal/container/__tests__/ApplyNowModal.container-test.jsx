import React from 'react';
import { shallow } from 'enzyme';
import ApplyNowModalWrapper, { mapDispatchToProps } from '../ApplyNowModal.container';

describe('ApplyNowModalWrapper', () => {
  it('should render apply card layout view section', () => {
    const props = {
      labels: {
        label1: 'dummy',
      },
      isModalOpen: true,
    };
    const tree = shallow(<ApplyNowModalWrapper {...props} />);
    expect(tree).toBeDefined();
  });
  describe('#mapDispatchToProps', () => {
    it('should return an action of toggle modal', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.toggleModal();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
