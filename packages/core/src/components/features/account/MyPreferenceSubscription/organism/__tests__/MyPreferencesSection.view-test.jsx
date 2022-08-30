import React from 'react';
import { shallow } from 'enzyme';
import { MyPrefrenceSectionVanilla } from '../MyPreferencesSection.view';

describe('ProfileInformation component', () => {
  const props = {
    labels: {},
    isTcpSubscribe: true,
    isTcpAppSubscribe: true,
    isGymAppSubscribe: true,
    isGymSubscribe: true,
    onSubscribe: jest.fn(),
    onUnsubscribe: jest.fn(),
  };

  it('should render correctly', () => {
    const component = shallow(<MyPrefrenceSectionVanilla {...props} />);
    const componentInstance = component.instance();
    componentInstance.onChangeCallback({ preventDefault: () => {} }, 'tcpAppSubscribe');
    componentInstance.onBlurHandler({ preventDefault: () => {} });
    componentInstance.onUnsubscribeHandler();
    componentInstance.onSubscribeHandler();
    componentInstance.onGymSubscribe();
    expect(component).toMatchSnapshot();
  });

  it('should call  onChangeCallback and render onSubscribe correctly for isTcpSubscribe', () => {
    const onSubscribe = jest.fn();
    const component = shallow(<MyPrefrenceSectionVanilla onSubscribe={onSubscribe} />);
    const componentInstance = component.instance();
    componentInstance.onChangeCallback({ preventDefault: () => {} }, 'tcpWebSubscribe');
    expect(onSubscribe).toBeCalled();
  });

  it('should call  onChangeCallback and render onUnsubscribe correctly for isTcpSubscribe', () => {
    const onUnsubscribe = jest.fn();
    const isTcpSubscribe = true;
    const component = shallow(
      <MyPrefrenceSectionVanilla isTcpSubscribe={isTcpSubscribe} onUnsubscribe={onUnsubscribe} />
    );
    const componentInstance = component.instance();
    componentInstance.onChangeCallback({ preventDefault: () => {} }, 'tcpWebSubscribe');
    expect(onUnsubscribe).toBeCalled();
  });

  it('should call  onChangeCallback and render onUnsubscribe correctly for isTcpAppSubscribe', () => {
    const onUnsubscribe = jest.fn();
    const isTcpAppSubscribe = true;
    const component = shallow(
      <MyPrefrenceSectionVanilla
        isTcpAppSubscribe={isTcpAppSubscribe}
        onUnsubscribe={onUnsubscribe}
      />
    );
    const componentInstance = component.instance();
    componentInstance.onChangeCallback({ preventDefault: () => {} }, 'tcpAppSubscribe');
    expect(onUnsubscribe).toBeCalled();
  });

  it('should call  onChangeCallback and render onSubscribe correctly for isTcpAppSubscribe', () => {
    const onSubscribe = jest.fn();
    const component = shallow(<MyPrefrenceSectionVanilla onSubscribe={onSubscribe} />);
    const componentInstance = component.instance();
    componentInstance.onChangeCallback({ preventDefault: () => {} }, 'tcpAppSubscribe');
    expect(onSubscribe).toBeCalled();
  });

  it('should call  onChangeCallback and render onUnsubscribe correctly for isTcpAppSubscribe', () => {
    const onUnsubscribe = jest.fn();
    const isGymAppSubscribe = true;
    const component = shallow(
      <MyPrefrenceSectionVanilla
        isGymAppSubscribe={isGymAppSubscribe}
        onUnsubscribe={onUnsubscribe}
      />
    );
    const componentInstance = component.instance();
    componentInstance.onChangeCallback({ preventDefault: () => {} }, 'gymboreeAppSubscribe');
    expect(onUnsubscribe).toBeCalled();
  });

  it('should call  onChangeCallback and render onSubscribe correctly for isTcpAppSubscribe', () => {
    const onSubscribe = jest.fn();
    const component = shallow(<MyPrefrenceSectionVanilla onSubscribe={onSubscribe} />);
    const componentInstance = component.instance();
    componentInstance.onChangeCallback({ preventDefault: () => {} }, 'gymboreeAppSubscribe');
    expect(onSubscribe).toBeCalled();
  });
});
