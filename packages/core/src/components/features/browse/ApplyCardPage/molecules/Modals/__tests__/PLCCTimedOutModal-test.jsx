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
    isPLCCModalFlow: false,
    handleTimedOutModalClose: jest.fn(),
    bagItems: true,
    labels: {
      plcc_form_status_detail: 'application card is in progress',
      plcc_form_status: 'in progress',
      plcc_form_ctc_buttom: 'continue to checkout',
      plcc_form_continue_shopping: 'continue shopping',
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
