import React from 'react';
import { shallow } from 'enzyme';
import { ThemeWrapper, mapDispatchToProps } from '../ThemeWrapper.container';

describe('HomePageView', () => {
  const props = {
    appType: '',
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
  it('the default value of currentAppType should be tcp ', () => {
    expect(component.instance().currentAppType).toEqual('tcp');
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action updateAppTypeHandler which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.updateAppTypeHandler();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
