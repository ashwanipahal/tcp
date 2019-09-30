import React from 'react';
import { shallow } from 'enzyme';
import { StyledPLCCTimedoutModalVanilla } from '../PLCCTimedOutModal';

jest.mock('../../../../../../../utils/utils.web', () => ({
  routerPush: jest.fn(),
}));

describe('ApplicationInProgress component', () => {
  const props = {
    className: 'plcc_modal',
    isModalOpen: true,
    closeModal: jest.fn(),
    unregisterIdleVerfication: jest.fn(),
    isPLCCModalFlow: false,
    handleFormReset: jest.fn(),
    bagItems: true,
    labels: {
      lbl_PLCCTimeoutModal_restartAcceptance: 'restart acceptance',
      lbl_PLCCTimeoutModal_restartApplication: 'restart application',
      lbl_PLCCTimeoutModal_returnCheckout: 'continue to checkout',
      lbl_PLCCTimeoutModal_closureSubHeader: 'closing header',
      lbl_PLCCTimeoutModal_applicationClosure: 'applicaiton',
      lbl_PLCCTimeoutModal_preacceptance: 'we have closed your application',
    },
  };
  const tree = shallow(<StyledPLCCTimedoutModalVanilla {...props} />);
  it('should renders correctly', () => {
    expect(tree).toBeDefined();
  });

  it('should renders correctly when there are no bag items added.', () => {
    props.bagItems = false;
    const modalForBagItems = shallow(<StyledPLCCTimedoutModalVanilla {...props} />);
    expect(modalForBagItems).toBeDefined();
  });

  it('should should trigger restartApplication function', () => {
    const spyOpenModal = jest.spyOn(tree.instance(), 'restartApplication');
    tree.instance().restartApplication();
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should should trigger restartApplication function without isPLCCModalFlow', () => {
    const spyOpenModal = jest.spyOn(tree.instance(), 'restartApplication');
    props.isPLCCModalFlow = true;
    const plccModal = shallow(<StyledPLCCTimedoutModalVanilla {...props} />);
    plccModal.instance().restartApplication();
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should should trigger handleCheckoutClick', () => {
    const spyOpenModal = jest.spyOn(tree.instance(), 'handleCheckoutClick');
    tree.instance().handleCheckoutClick();
    expect(spyOpenModal).toHaveBeenCalled();
  });
});
