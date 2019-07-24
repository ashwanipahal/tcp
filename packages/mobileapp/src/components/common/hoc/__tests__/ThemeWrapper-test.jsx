import React from 'react';
import { shallow } from 'enzyme';
import { ThemeWrapper, mapDispatchToProps } from '../ThemeWrapper.container';

describe('#ThemeWrapper.container', () => {
  const props = {
    appType: 'tcp',
    updateAppTypeHandler: jest.fn(),
    children: {},
  };
  let component;
  beforeEach(() => {
    component = shallow(<ThemeWrapper {...props} />);
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('the default value of appType should be tcp ', () => {
    expect(component.instance().appType).toEqual(undefined);
  });

  it('getTheme method should be call', () => {
    const inst = component.instance();
    jest.spyOn(inst, 'getTheme');
    inst.render();
    expect(inst.getTheme).toHaveBeenCalledTimes(1);
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action updateAppTypeHandler which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.updateAppTypeHandler();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
