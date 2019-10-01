import React from 'react';
import { shallow } from 'enzyme';
import { GooglePlacesInput } from '../AutoCompleteComponent.native';
import { StyledErrorWrapper } from '../../styledWrapper/styledWrapper.native';

describe('AutoCompleteComponent Native', () => {
  let component;
  let onChangeSpy;
  let onValueChangeSpy;
  beforeEach(() => {
    onChangeSpy = jest.fn();
    onValueChangeSpy = jest.fn();

    const input = {
      onChange: onChangeSpy,
    };
    const meta = {
      error: '',
    };
    component = shallow(
      <GooglePlacesInput
        headerTitle="test"
        input={input}
        meta={meta}
        onValueChange={onValueChangeSpy}
      />
    );
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render correctly for error', () => {
    component.setState({
      touched: true,
      active: false,
    });
    component.setProps({
      meta: {
        error: 'Test message',
      },
    });
    expect(component.find(StyledErrorWrapper)).toHaveLength(1);
  });

  it('onFocus should set listViewDisplayed to true', () => {
    const instance = component.instance();
    instance.onFocus();
    expect(component.state('listViewDisplayed')).toBeTruthy();
  });

  it('onBlur should set listViewDisplayed to false', () => {
    const instance = component.instance();
    instance.onBlur();
    expect(component.state('listViewDisplayed')).toBeFalsy();
  });

  it('onPress should should call onValueChange prop', () => {
    const instance = component.instance();
    instance.onPress({
      description: 'text',
    });
    expect(onValueChangeSpy).toBeCalled();
  });
});
