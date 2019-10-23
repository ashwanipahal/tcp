import React from 'react';
import { shallow } from 'enzyme';
import { CreateAccountContainer, mapDispatchToProps } from '../CreateAccount.container';
import CreateAccountView from '../../views/CreateAccountView';

describe('CreateAccount', () => {
  const props = {
    setLoginModalMountState: () => {},
    showLogin: () => {},
    formErrorMessage: {},
  };

  it('should render CreateAccountView component', () => {
    const tree = shallow(<CreateAccountContainer {...props} />);
    expect(tree.is(CreateAccountView)).toBeTruthy();
  });

  describe('#instance', () => {
    let wrapperInstance;
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CreateAccountContainer {...props} />);
      wrapperInstance = wrapper.instance();
    });

    it('openModal should call setLoginModalMountState action if prop is present', () => {
      const setLoginModalMountState = jest.fn();
      wrapper.setProps({
        setLoginModalMountState,
      });
      wrapperInstance.openModal({});
      expect(setLoginModalMountState).toBeCalled();
    });

    it('openModal should call openOverlay action if prop is present', () => {
      const openOverlay = jest.fn();
      wrapper.setProps({
        setLoginModalMountState: null,
        openOverlay,
      });
      wrapperInstance.openModal({});
      expect(openOverlay).toBeCalled();
    });

    it('onAlreadyHaveAnAccountClick should call setLoginModalMountState action if prop is present', () => {
      const setLoginModalMountState = jest.fn();
      wrapper.setProps({
        setLoginModalMountState,
      });
      wrapperInstance.onAlreadyHaveAnAccountClick({
        preventDefault: () => {},
      });
      expect(setLoginModalMountState).toBeCalled();
    });

    it('onAlreadyHaveAnAccountClick should call openOverlay action if prop is present', () => {
      const openOverlay = jest.fn();
      wrapper.setProps({
        setLoginModalMountState: null,
        openOverlay,
      });
      wrapperInstance.onAlreadyHaveAnAccountClick({
        preventDefault: () => {},
      });
      expect(openOverlay).toBeCalled();
    });
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action createAccountAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.createAccountAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action closeOverlay which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.closeOverlay();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action openOverlay which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.openOverlay();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action resetAccountError which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.resetAccountError();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('#toastMessage', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.toastMessage();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
