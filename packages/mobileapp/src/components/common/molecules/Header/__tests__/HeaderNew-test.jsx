import React from 'react';
import { shallow } from 'enzyme';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import { HeaderNewVanilla, mapDispatchToProps } from '../HeaderNew';

describe('HeaderNew Component', () => {
  let component;
  const props = {
    labels: {},
    title: '',
    screenProps: {
      network: {
        isConnected: true,
      },
    },
    navigation: {
      goBack: jest.fn(),
    },
  };

  beforeEach(() => {
    component = shallow(<HeaderNewVanilla {...props} />);
  });
  it('HeaderNew should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('HeaderNew should return ToastContainer component value one', () => {
    expect(component.find(ToastContainer)).toHaveLength(1);
  });

  it('Header noInterNetHandle to be called', () => {
    const mock = jest.fn();
    const prop = {
      screenProps: { network: { isConnected: false } },
      toastMessage: mock,
    };
    component.setState({ isIconIn: false });
    component.setProps(prop);
    expect(prop.toastMessage).toHaveBeenCalled();
  });

  it(' Checkout Header should render correctly', () => {
    const componentInstance = component.instance();
    componentInstance.onBack();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action updateCartCountAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.updateCartCountAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action updateCartManuallyAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.updateCartManuallyAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action toastMessage which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.toastMessage();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
