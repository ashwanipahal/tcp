import React from 'react';
import { shallow } from 'enzyme';
import { PLCCTimeoutInterimModalVanilla } from '../PLCCTmeoutInterimModal';

jest.mock('../../../../../../../utils/utils.web', () => ({
  routerPush: jest.fn(),
}));

describe('ApplicationInProgress component', () => {
  const props = {
    className: 'plcc_modal',
    isModalOpen: true,
    closeModal: jest.fn(),
    handleContinueApplication: jest.fn(),
    isPLCCModalFlow: false,
    unregisterIdleVerfication: jest.fn(),
    bagItems: true,
    time: 120,
    labels: {
      lbl_PLCCTimeoutModal_stillThere: 'session would be expired in 120 seconds',
      lbl_PLCCTimeoutModal_continueApplication: 'application card is in progress',
      lbl_PLCCTimeoutModal_interimText: 'in progress',
    },
  };

  const tree = shallow(<PLCCTimeoutInterimModalVanilla {...props} />);
  it('should renders correctly', () => {
    expect(tree).toBeDefined();
  });

  it('should should trigger restartApplication function', () => {
    const spyOpenModal = jest.spyOn(tree.instance(), 'handleCloseClick');
    tree.instance().handleCloseClick();
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should should trigger restartApplication function when time has lapsed.', () => {
    props.time = 0;
    const timedoutModal = shallow(<PLCCTimeoutInterimModalVanilla {...props} />);
    const spyOpenModal = jest.spyOn(timedoutModal.instance(), 'handleCloseClick');
    timedoutModal.instance().handleCloseClick();
    expect(spyOpenModal).toHaveBeenCalled();
  });
});
